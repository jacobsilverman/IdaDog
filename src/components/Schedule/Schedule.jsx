import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import 'react-calendar/dist/Calendar.css';
import './Schedule.scss'; // Add custom styles here if needed

Modal.setAppElement('#root'); // Required for accessibility

function Schedule() {
  const [selectedDate, setSelectedDate] = useState(null);
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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
    handleDateClick(date);
  };

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
    setIsModalOpen(false);
    setFormData({ name: '', email: '', startTime: '', endTime: '', start: '', end: '' }); // Reset form
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

  const getPrice = (date1, date2) => {
    if (!date1 || !date2){
      return null;
    }
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffInMs = Math.abs(d2 - d1);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays < 7) {
      return diffInDays * 50;
    } else if (diffInDays > 28) {
      return diffInDays * 40;
    }
    return diffInDays * 45;
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

  return (
    <div className="schedule">
      <h2>Schedule a Service</h2>
      <Calendar 
        onClickDay={handleDateChange} 
        tileDisabled={disablePreviousDates}
        tileClassName={tileClassName} />
      <div className='dates-continer'>
        <div>
          <div className='date-selection'>
            <label htmlFor="start-date">Choose a start date:</label>
            <input 
              onChange={handleInputChange} 
              value={formData.start} 
              type="date" 
              id="start-date" 
              name="start"
              min={today} />
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
              min={addOneDay(formData.start)} />
          </div>
        </div>
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
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='basic-input'>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            pattern="\d{3}[-.\s]?\d{3}[-.\s]?\d{4}"
            onChange={handleInputChange}
            required
          />
        </div>
        <button>
          Submit
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Schedule Service"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Schedule for {selectedDate && selectedDate.toLocaleDateString()}</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="time">Preferred Time:</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Confirm</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default Schedule;
