import { FC } from "react";
import { PlayerDurationProps } from "./PlayerDuration.props.ts";
import styles from "./PlayerDuration.module.scss";
import cn from "classnames";

const PlayerDuration: FC<PlayerDurationProps> = ({ error, start, end, ...props }) => (
    <div
        className={cn(styles.playerDuration, {
            [styles.disabled] : error
        })}
        {...props}
    >
        <span>{start}</span> / <span>{end}</span>
    </div>
);

export default PlayerDuration;