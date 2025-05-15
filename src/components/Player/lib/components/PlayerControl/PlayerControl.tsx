import { FC, PropsWithChildren } from "react";
import styles from "./PlayerControl.module.scss";

const PlayerControl: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className={styles.playerControl}>
            {children}
        </div>
    );
};

export default PlayerControl;