import styles from "./Item.module.css";

export const Item = ({ title, children }) => {
    return <div className={styles.wrapper}>
        <div className={styles.container}>
            <h2 className={`${styles.heading}`}>{ title }</h2>
            { children }
        </div>
    </div>
}

Item.Button = ({ title, description, onClick }) => {
    return <div className={`${styles.button} underline-animation`} onClick={onClick}>
        <div>
            <h2 className={`${styles.heading}`} style={{ marginBottom: description && '-5px' }}>{ title }</h2>
            { description && <span className={styles.description}>{ description }</span> }
        </div>
        <span>→</span>
    </div>
}