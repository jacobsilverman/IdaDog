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
    service: '',
    time: '',
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Scheduled service:', { date: selectedDate, ...formData });
    setIsModalOpen(false);
    setFormData({ name: '', service: '', time: '' }); // Reset form
  };

  return (
    <div className="schedule">
      <h2>Schedule a Service</h2>
      <Calendar onClickDay={handleDateChange} />
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
          <div>
            <label htmlFor="service">Service:</label>
            <input
              type="text"
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              required
            />
          </div>
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
