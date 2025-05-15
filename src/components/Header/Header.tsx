import styles from "./Header.module.scss";
import { Link } from "react-router";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className="container">
                <h1 className={styles.headerTitle}>
                    <Link to='/'>Tune Manager</Link>
                </h1>
            </div>
        </header>
    );
};

export default Header;