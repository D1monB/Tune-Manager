import styles from './NotFound.module.scss';
import notFoundImg from './notFoundImg.png'

const NotFound = () => {
    return (
        <div className={styles.wrapper}>
            <img
                src={notFoundImg}
                alt="Not found"
                className={styles.image}
            />
            <p className={styles.text}>Oops! Page not found.</p>
        </div>
    );
};

export default NotFound;