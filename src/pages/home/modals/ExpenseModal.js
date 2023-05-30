import { useState } from 'react';
import styles from './Modal.module.css';

export const ExpenseModal = ({ balance, onSubmit }) => {
    const [title, setTitle] = useState();
    const [amount, setAmount] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title) return setError('Missing title...');
        if (!amount) return setError('Missing amount...');
        if (amount > balance) return setError('Expense is higher than current balance!');
        if (amount < 0) return setError('Amount cannot be negative');

        onSubmit({ title, amount });
        setLoading(true);
    }

    const resetError = (event, callback) => {
        if (error) setError();
        callback(event);
    }

    return <div className={styles.container}>
        <h2 className={`underline`}>Nowy wydatek</h2>
        { !error && <p>Użyj formularza żeby wprowadzić wydatek</p> }
        { error && <p className={styles.error}>{ error }</p> }

        <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text" name='title' placeholder='Tytuł wydatku' onChange={(e) => resetError(e, (e) => setTitle(e.target.value))} />
            <input type="number" name='amount' placeholder='Kwota' onChange={(e) => resetError(e, (e) => setAmount(e.target.valueAsNumber))} />

            { !loading && <button className={`${styles.submit} underline-animation`} onClick={handleSubmit}>Dodaj</button> }
            { loading && <button className={`${styles.submit}`} disabled>Ładowanie ...</button> }
        </form>
    </div>;
}