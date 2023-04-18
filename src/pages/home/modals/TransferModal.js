import { useState } from 'react';
import styles from './Modal.module.css';

export const TransferModal = ({ balance, goal, onSubmit }) => {
    const [amount, setAmount] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!amount) return setError('Missing amount...');
        if (amount > balance) return setError('Insufficient money to transfer');
        if (amount < 0) return setError('Amount cannot be negative');

        onSubmit({ amount });
        setLoading(true);
    }

    const resetError = (event, callback) => {
        if (error) setError();
        callback(event);
    }

    return <div className={styles.container}>
        <h2 className={`underline`}>Transfer Money</h2>
        { !error && <p>Use form to transfer money to goal</p> }
        { error && <p className={styles.error}>{ error }</p> }

        <form className={styles.form} onSubmit={handleSubmit}>
            <input type="number" name='amount' placeholder='Amount' onChange={(e) => resetError(e, (e) => setAmount(e.target.valueAsNumber))} />

            { !loading && <button className={`${styles.submit} underline-animation`} onClick={handleSubmit}>Add</button> }
            { loading && <button className={`${styles.submit}`} disabled>Loading ...</button> }
        </form>
    </div>;
}