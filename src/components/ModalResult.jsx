import React, { useEffect } from 'react';
import '../styles/modal.css';
import { Link } from 'react-router-dom';

import arrow from "../images/orange_arrow.png";

const Modal = ({ isOpen, onClose, children }) => {

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <div className="modalBack">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <div className="backToBlocks">
                            <img src={arrow} className='orangeArrow' alt="" />
                            <p className='blockText'>Назад к блокам</p>
                        </div>
                    </Link>
                </div>

                <div className="modalBody">
                    {children}
                </div>

                <button className='check-answers' onClick={onClose}>
                    Посмотреть ответы
                </button>
            </div>
        </div>
    );
};

export default Modal;