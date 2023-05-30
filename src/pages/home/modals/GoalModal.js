import { useState } from 'react';
import styles from './Modal.module.css';

export const GoalModal = ({ onSubmit }) => {
    const [title, setTitle] = useState();
    const [amount, setAmount] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title) return setError('Missing name...');
        if (!amount) return setError('Missing amount...');
        if (amount < 0) return setError('Amount cannot be negative');

        onSubmit({ title, amount });
        setLoading(true);
    }

    const resetError = (event, callback) => {
        if (error) setError();
        callback(event);
    }

    return <div className={styles.container}>
        <h2 className={`underline`}>Ustaw swój Cel</h2>
        { !error && <p>Użyj formularza żeby wprowadzić cel</p> }
        { error && <p className={styles.error}>{ error }</p> }

        <form className={styles.form} onSubmit={handleSubmit}>
            <input type="text" name='title' placeholder='Nazwa Celu' onChange={(e) => resetError(e, (e) => setTitle(e.target.value))} />
            <input type="number" name='amount' placeholder='Kwota' onChange={(e) => resetError(e, (e) => setAmount(e.target.valueAsNumber))} />

            { !loading && <button className={`${styles.submit} underline-animation`} onClick={handleSubmit}>Dodaj</button> }
            { loading && <button className={`${styles.submit}`} disabled>Ładowanie ...</button> }
        </form>
    </div>;
}