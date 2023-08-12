import React, {useState} from 'react';
import Modal from 'react-modal';
import { useTotalPrice, useCart } from './../../store/product/hook'


const ModalQR = ({ show, handleClose }) => {
    const totalPrice = useTotalPrice();
    const cart = useCart();
    const customStyles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          marginRight: '-50%',
          background: '#fff',
          width: 'auto',
        },
      };

  return (
    <div className="w-full flex justify-center">
        <Modal 
            ariaHideApp={false}
            className=""
            isOpen={show}
            onRequestClose={handleClose}
            style={customStyles}
            contentLabel="Payment with QR Code"
        >
            <button className="float-right" onClick={handleClose}>Close</button>
            <div className="w-full flex justify-center items-center">
                <img className="w-[420px]" src={`https://img.vietqr.io/image/vietcombank-1016178285-compact2.jpg?amount=${totalPrice}&addInfo=Total Product%20${cart?.length || 0}%20Price%20${totalPrice}&accountName=Nguyen%20Tan%20Hue`} alt="" />
            </div>
        </Modal>
    </div>
  );
}

export default ModalQR;