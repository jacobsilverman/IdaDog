import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import { ToastContainer , toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'react-calendar/dist/Calendar.css';
import './Schedule.scss';
import { sendEmail } from '../../services/EmailService';
import { fetchReservations } from '../../services/ReservationService';

Modal.setAppElement('#root');
function Schedule() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          console.log("reservations: ", data)
          setReservations(data);
      } catch (err) {
          console.error(err);
          setError('Failed to load reservations');
      } finally {
          setLoading(false);
      }
    };

    getReservations();
  }, [])

  const handleDateClick = (date) => {
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
    setIsModalOpen(true);
  };

  const handleFinalSubmit= (e) => {
    e.preventDefault();
    setIsModalOpen(false);
    sendEmail(formData);
    toast.success(`Please finalize the reservation by confirming through your email: ${formData.email}`, { autoClose: 30000 });
    setFormData({ name: '', email: '', phone: '', startTime: '', endTime: '', start: '', end: '' });
  };

  const disablePreviousDates = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today; 
  };

  const addOneDay = (dateString) => {
    if (!dateString){
      return today;
    }
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
  };

  const getDateDiff = () => {
    if (!formData.start || !formData.end){
      return null;
    }
    const d1 = new Date(formData.start);
    const d2 = new Date(formData.end);
    const diffInMs = Math.abs(d2 - d1);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays;
  }

  const getDiscount = () => {
    const diff = getDateDiff();

    let discount;
    if (diff < 7) {
      discount = '';
    } else if (diff > 28) {
      discount = 'Monthly Discount Applied';
    }else {
      discount = 'Weekly Discount Applied';
    }
    return discount;
  }

  const getPrice = () => {
    const diff = getDateDiff();
    let price;
    if (diff < 7) {
      price = diff * 50;
    } else if (diff > 28) {
      price = diff * 40;
    }else {
      price = diff * 45;
    }
    return price;
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
    if (view === 'month') {
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
              min={addOneDay(formData.start)}
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Schedule Service"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h1>{formData.name}</h1>
        <h2>Please confirm your scheduled service </h2>
        <h3>Scheduled from {formData?.start} to {formData?.end} </h3>

        <span className='modal-container'>
          {formData?.startTime && (<div>
            Drop Off: {formData?.startTime}
          </div>)}
          {formData?.endTime && (<div>
            Pick Up: {formData?.endTime}
          </div>)}
        </span>

        <span className='modal-container'>
          {formData?.email && (<div>
            Email: {formData?.email}
          </div>)}
          {formData?.phone && (<div>
            Phone: {formData?.phone}
          </div>)}
        </span>
        <br />
        {getDiscount() && (<div className='modal-discount'>
          <b>{getDiscount()}</b>
        </div>)}
        <div className='modal-price'>
          Total: ${getPrice()}
        </div>
        
        <div>
          <button type="submit" onClick={handleFinalSubmit}>Confirm</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Schedule;
