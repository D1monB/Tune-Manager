import { FC } from "react";
import { PlayerTrackProps } from "./PlayerTrack.props.ts";
import styles from './PlayerTrack.module.scss';
import fallbackImg from './fallback-img.jpg'
import FallbackImage from "../../../../UI/FallbackImage/FallbackImage.tsx";

const PlayerTrack: FC<PlayerTrackProps> = ({ image, played, onChangePlayer, error, ...props }) => {
    return (
        <div className={styles.playerTrack}  data-testid={`audio-track-${image}`} {...props}>
            <FallbackImage
                className={styles.playerBackgroundImg}
                src={image}
                fallback={fallbackImg}
                alt="Background img"
            />
            {error
                ? <span>This track cannot be played, try another one.</span>
                : <input
                    className={styles.playerTrackInput}
                    type="range"
                    min={0}
                    max={1}
                    step={0.001}
                    value={played}
                    onChange={onChangePlayer}
                    data-testid={`audio-progress-${image}`}
                />
            }
        </div>
    );
};

export default PlayerTrack;