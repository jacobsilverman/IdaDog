import Modal from 'react-modal';

Modal.setAppElement('#root');
const CancelModal = ({cancelReservation, isCancelModalOpen, setisCancelModalOpen}) => {
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
            <input placeholder='example@domain.com'></input>
            <div>
                <button type="submit">Confirm</button>
                <button type="button" onClick={() => setisCancelModalOpen(false)}>Cancel</button>
            </div>

        </Modal>
    );
}

export default CancelModal;