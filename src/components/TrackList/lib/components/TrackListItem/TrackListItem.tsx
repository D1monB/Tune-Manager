import {  FC  } from "react";
import { TrackListItemProps } from "./TrackListItem.props.ts";
import styles from "./TrackListItem.module.scss";
import play from '../../../../../assets/music-play.svg'
import MyButton from "../../../../UI/MyButton/MyButton.tsx";
import { audioConstant, MAX_FILE_SIZE } from '../../../../../constants/audioConstant.ts';
import { useLocation, useNavigate } from "react-router";
import TrackUploadFileBtn from "../TrackUploadFileBtn/TrackUploadFileBtn.tsx";

const TrackListItem: FC<TrackListItemProps> = ({ track, onOpenPlayer, onRemoveTrack, onRemoveAudio, onUploadAudio }) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <li className={styles.trackItem} data-testid={`track-item-${track.id}`}>
                <MyButton
                    disabled={!(track.audioFile)}
                    onClick={() => {
                        onOpenPlayer(track.id)
                    }}
                    className={styles.trackItemPlay}>
                    <img src={play} alt="Play music button"/>
                </MyButton>
                <div className={styles.trackInfo}>
                    <h3 className={styles.title} data-testid={`track-item-${track.id}-title`}>
                        {track.title}
                    </h3>
                    <p className={styles.artist} data-testid={`track-item-${track.id}-artist`}>
                        {track.artist}
                    </p>
                </div>
                <div className={styles.actions}>
                    <MyButton
                        className={styles.editBtn}
                        data-testid={`edit-track-${track.id}`}
                        onClick={() => navigate(`/edit/${track.slug}`, { state: { backgroundLocation: location } })}
                    >
                        Edit
                    </MyButton>
                    <MyButton
                        onClick={() => onRemoveTrack(track.id)}
                        className={styles.deleteBtn}
                        data-testid={`delete-track-${track.id}`}
                    >
                        Delete
                    </MyButton>
                    <TrackUploadFileBtn
                        track={track}
                        onUploadAudio={onUploadAudio}
                        onRemoveAudio={onRemoveAudio}
                        audioConstant={audioConstant}
                        MAX_FILE_SIZE={MAX_FILE_SIZE}
                    />
                </div>
            </li>
        </>
    );
};

export default TrackListItem;
