import { FC } from "react";
import { VolumeControlProps } from "./PlayerVolume.props.ts";
import Volume from '../../../../../assets/volume.png';
import styles from "./PlayerVolume.module.scss";
import cn from "classnames";
import MyButton from "../../../../UI/MyButton/MyButton.tsx";

export const PlayerVolume: FC<VolumeControlProps> = ({ error, volume, onChangeVolume, isOpen, toggleOpen, ...props }) => (
    <div className={styles.volume} data-testid="audio-volume" {...props}>
        <div className={cn(styles.volumeWrapper, {
            [styles.disabled] : error
        })}>
            <input
                className={cn(styles.volumeInput, {
                    [styles.active] : isOpen
                })}
                min={0}
                max={1}
                step={0.05}
                type="range"
                value={volume}
                onChange={onChangeVolume}
                data-testid="volume-input"
            />
            <MyButton disabled={error} onClick={() => toggleOpen(prevState => !prevState)}>
                <img src={Volume} alt="Volume" />
            </MyButton>
        </div>
    </div>
);

export default PlayerVolume;