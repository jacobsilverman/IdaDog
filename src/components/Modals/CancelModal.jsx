import { useState } from 'react';
import Modal from 'react-modal';
import { deleteReservation } from '../../services/ReservationService';
import { toast } from "react-toastify";

Modal.setAppElement('#root');
const CancelModal = ({cancelReservation, isCancelModalOpen, setisCancelModalOpen}) => {
    const [cancelEmail, setCancelEmail] = useState('');

    const submitCancelation = () => {
        deleteReservation(cancelReservation.id).then(() => {
            toast.success(`Your reservation has been successfully removed`, { autoClose: 30000 });
        }).catch(() => {
            toast.error(`There was an issue deleting your reservation`, { autoClose: 30000 });
        });
        setisCancelModalOpen(false);
        setCancelEmail('');
    }

    return (
        <Modal
            isOpen={isCancelModalOpen}
            onRequestClose={() => setisCancelModalOpen(false)}
            contentLabel="Schedule Service"
            className="modal"
            overlayClassName="modal-overlay"
            >
            <h1>Reservation: {cancelReservation.name}</h1>
            <h3>{cancelReservation?.start} to {cancelReservation?.end}</h3>
            <h3>Please confirm email address to cancel reservation</h3>
            <input type="email" 
                placeholder="example@domain.com" 
                value={cancelEmail} 
                onChange={(e) => setCancelEmail(e.target.value)}></input>
            <div>
                <button 
                    type="submit" 
                    disabled={cancelEmail?.toLowerCase()!==cancelReservation.email?.toLowerCase()}
                    onClick={submitCancelation}>Confirm</button>
                <button type="button" onClick={() => setisCancelModalOpen(false)}>Cancel</button>
            </div>
        </Modal>
    );
}

export default CancelModal;