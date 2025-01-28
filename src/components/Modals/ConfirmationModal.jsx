import Modal from 'react-modal';

Modal.setAppElement('#root');
const ConfirmationModal = ({formData, isConfirmationModalOpen, setisConfirmationModalOpen, handleFinalSubmit}) => {

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

    const getPrice = () => {
        const diff = getDateDiff() || 1;
        let price;
        
        if (diff < 7) {
            price = diff * 50;
        } else if (diff > 28) {
            price = diff * 40;
        } else {
            price = diff * 45;
        }
        return price;
    }

    const getDiscount = () => {
        const diff = getDateDiff();
        let discount;

        if (diff < 7) {
            discount = '';
        } else if (diff > 28) {
            discount = 'Monthly Discount Applied';
        } else {
            discount = 'Weekly Discount Applied';
        }
        return discount;
    }

    return (
        <Modal
            isOpen={isConfirmationModalOpen}
            onRequestClose={() => setisConfirmationModalOpen(false)}
            contentLabel="Schedule Service"
            className="modal"
            overlayClassName="modal-overlay"
            >
            <h1>{formData.name}</h1>
            <h2>Please confirm your scheduled service</h2>
            <h3>Scheduled from {formData?.start} to {formData?.end}</h3>
    
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
                <button type="button" onClick={() => setisConfirmationModalOpen(false)}>
                Cancel
                </button>
            </div>
        </Modal>
    );
}

export default ConfirmationModal;