import { useEffect } from 'react';
import styles from './Modal.module.css';

export const Modal = ({ children, disableScroll = true, onOutsideClick }) => {
    
    useEffect(() => {
        if (disableScroll) document.body.classList.add('disable-scroll');
        return () => document.body.classList.remove('disable-scroll');
    }, [disableScroll]);

    return <div onClick={onOutsideClick} className={styles.wrapper}>
        <div onClick={e => e.stopPropagation()} className={styles.modal}>{children}</div>
    </div>;
}