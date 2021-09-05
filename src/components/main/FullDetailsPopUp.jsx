import React from 'react';
import ReactDom from 'react-dom';

function FullDetailsPopUp({isPopupOpen,selectedCenter,closePopup}) {
   
    if(!isPopupOpen)return null

    return ReactDom.createPortal(
        <>
            <div className="overlay"></div>
            <div className="pop-up">
                <button onClick={closePopup}>x</button>
                <h5 className="card-title">{selectedCenter.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{selectedCenter.block_name}</h6>
                <p className="card-text">{selectedCenter.pincode}</p>
            </div>
        </>,
        document.getElementById('modal-root')
    )
    
}

export default FullDetailsPopUp
