import { FC } from "react";
import { PlayerButtonsProps } from "./PlayerButtons.props.ts";
import replay from "../../../../../assets/rewinding-left.svg";
import previous from "../../../../../assets/music-previous.svg";
import pause from "../../../../../assets/music-pause.svg";
import play from "../../../../../assets/music-play.svg";
import next from "../../../../../assets/music-next.svg";
import forward from "../../../../../assets/rewinding-right.svg";
import styles from "./PlayerButtons.module.scss";
import MyButton from "../../../../UI/MyButton/MyButton.tsx";
import { usePlayerContext } from "../../../../../context/PlayerContext.tsx";

const PlayerButtons: FC<PlayerButtonsProps> = ({ onRewind, onPlayPause, playing, error, ...props }) => {
    const { nextTrack, prevTrack, isLastTrack, isFirstTrack } = usePlayerContext()

    return (
        <div className={styles.playerControlButtons} data-testid="audio-buttons" {...props}>
            <MyButton disabled={error} onClick={() => onRewind(-10)} data-testid="rewind-button">
                <img src={replay} alt="-10sec" />
            </MyButton>
            <MyButton disabled={isFirstTrack} onClick={prevTrack} data-testid="previous-button">
                <img src={previous} alt="Previous music" />
            </MyButton>
            <MyButton disabled={error} onClick={onPlayPause} data-testid="play-pause-button">
                <img src={playing ? pause : play} alt={playing ? "Pause" : "Play"} />
            </MyButton>
            <MyButton disabled={isLastTrack} onClick={nextTrack} data-testid="next-button">
                <img src={next} alt="Next music" />
            </MyButton>
            <MyButton disabled={error} onClick={() => onRewind(10)} data-testid="forward-button">
                <img src={forward} alt="+10sec" />
            </MyButton>
        </div>
    );
}

export default PlayerButtons