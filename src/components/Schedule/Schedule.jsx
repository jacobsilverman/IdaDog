import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { ToastContainer , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-calendar/dist/Calendar.css';
import './Schedule.scss';
import { sendEmail } from '../../services/EmailService';
import { fetchReservations } from '../../services/ReservationService';
import ConfirmationModal from '../Modals/ConfirmationModal.jsx';
import CancelModal from '../Modals/CancelModal.jsx';

function Schedule() {
  const [refreshCalcendar, setRefreshCalendar] = useState(0);
  const [reservations, setReservations] = useState([]);
  const [cancelReservation, setCancelReservation] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfirmationModalOpen, setisConfirmationModalOpen] = useState(false);
  const [isCancelModalOpen, setisCancelModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startTime: '',
    endTime: '',
    start: '',
    end: ''
  });
  const [today] = useState(() => new Date().toISOString().split("T")[0]);

  useEffect(() => {
    const getReservations = async () => {
      try {
          const data = await fetchReservations();
          setReservations(data);
      } catch (err) {
          console.error(err);
          setError('Failed to load reservations');
      } finally {
          setLoading(false);
      }
    };

    getReservations();
  }, [refreshCalcendar])

  const handleDateClick = (date) => {
    const reservationIndex = findReservationDate(date);
    if (reservationIndex>=0){
      setCancelReservation(reservations[reservationIndex]);
      setisCancelModalOpen(true);
      return;
    }
    const formatedDate = date.toISOString().split('T')[0];
    if (!formData.start || (formData.start && formData.end) || (formatedDate < formData.start)) {
      setFormData(prev => {return { ...prev, 'start': formatedDate }});
      setFormData(prev => {return { ...prev, 'end': '' }});
    } else {
      setFormData(prev => {return { ...prev, 'end': formatedDate }});
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {return { ...prev, [name]: value }});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setisConfirmationModalOpen(true);
  };

  const handleFinalSubmit= (e) => {
    e.preventDefault();
    setisConfirmationModalOpen(false);
    sendEmail(formData).then((response) => {
      if (response.status < 200 || response.status >= 300) {
          throw new Error(`Failed to send email, status code: ${response.status}`);
      }
      setFormData({ name: '', email: '', phone: '', startTime: '', endTime: '', start: '', end: '' });
      toast.success(`Please finalize the reservation by confirming through your email: ${formData.email}, then refresh this page to see your reservation`, { autoClose: 30000 });
    }).catch((err) => {
      console.error(err);
      toast.error(`failure while emailing: ${formData.email}`, { autoClose: 30000 });
    });
  };

  const disablePreviousDates = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  
  const findReservationDate = (date) => {
    return reservations.findIndex(reservation => {
      const start = new Date(reservation.start);
      let end = new Date(reservation.end);
      end.setDate(end.getDate() + 1);
      return start <= date && date <= end;
    })
  }

  const handlePhoneNumberChange = (event) => {
    let input = event.target.value;
    let digits = input.replace(/\D/g, '');
  
    if (digits.length===0){
      digits = '';
    }else if (digits.length <= 3) {
      digits = `(${digits}`;
    } else if (digits.length <= 6) {
      digits = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      digits = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }
  
    event.target.value = digits;

    handleInputChange(event);
  }

  const tileClassName = ({ date, view }) => {
    if (findReservationDate(date)>=0) {
      return 'reserved-date';
    }

    if (view === 'month') {
      if (formData?.start && formData?.end && date.toISOString().split('T')[0] === formData?.start && date.toISOString().split('T')[0] === formData?.end) {
        return 'same-date';
      }
      if (formData.start && date.toISOString().split('T')[0] === formData?.start) { 
        return 'start-date';
      }
      if (formData.end && date.toISOString().split('T')[0] === formData?.end) {
        return 'end-date';
      }
    }
    return null;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="schedule">
      <ToastContainer />
      <ConfirmationModal 
        formData={formData} 
        isConfirmationModalOpen={isConfirmationModalOpen} 
        setisConfirmationModalOpen={setisConfirmationModalOpen}
        handleFinalSubmit={handleFinalSubmit} />
      <CancelModal
        cancelReservation={cancelReservation}
        isCancelModalOpen={isCancelModalOpen}
        setRefreshCalendar={setRefreshCalendar}
        setisCancelModalOpen={setisCancelModalOpen} />
      <h2>Schedule a Service</h2>
      <Calendar 
        onClickDay={handleDateClick} 
        tileDisabled={disablePreviousDates}
        tileClassName={tileClassName} />
      <form className='dates-continer' onSubmit={handleSubmit}>
        <div>
          <div className='date-selection'>
            <label htmlFor="start-date">Choose a start date:</label>
            <input 
              onChange={handleInputChange} 
              value={formData.start} 
              type="date" 
              id="start-date" 
              name="start"
              min={today}
              required />
          </div>

          <div className='date-selection'>
            <label htmlFor="end-date">Choose a end date:</label>
            <input 
              onChange={handleInputChange} 
              value={formData.end} 
              disabled={!formData.start}
              type="date" 
              id="end-date" 
              name="end"
              min={formData.start}
              required />
          </div>
        </div>
        <div>

          <div className='basic-input'>
            <label htmlFor="startTime">Drop Off Time: <span>(optional)</span></label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleInputChange}
            />
          </div>

          <div className='basic-input'>
            <label htmlFor="endTime">Pick Up Time: <span>(optional)</span></label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <div className='basic-input'>
            <label htmlFor="name">Your Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='basic-input'>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              title="Please enter a email address"
              placeholder="example@gmail.com"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div>
          <div className='basic-input'>
            <label htmlFor="phone">Phone: <span>(optional)</span></label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              title="Please enter a phone number"
              placeholder="Ex. (777)-777-7777"
              onChange={handlePhoneNumberChange}
              maxLength={14}
            />
          </div>
        </div>

        <button>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Schedule;
