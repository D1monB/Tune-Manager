import { PropsWithChildren, FC } from 'react';
import styles from './TrackListFooter.module.scss'

const TrackListFooter: FC<PropsWithChildren> = ({ children}) => {
    return (
        <div className={styles.trackListFooter}>
            {children}
        </div>
    );
};

export default TrackListFooter;