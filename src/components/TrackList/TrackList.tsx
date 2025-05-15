import Modal from "../UI/Modal/Modal.tsx";
import { FC, memo, useMemo } from "react";
import TrackListItem from "./lib/components/TrackListItem/TrackListItem.tsx";
import { usePlayerContext } from "../../context/PlayerContext.tsx";
import Player from "../Player/Player.tsx";
import styles from './TrackList.module.scss'
import withConfirmComponent from "../../hocs/withConfirmComponent.tsx";
import { TrackListProps } from "./TrackList.props.ts";
import { useTrackList } from "./lib/hooks/useTrackList.ts";

const TrackList: FC<TrackListProps> = ({ tracks, confirm }) => {
    const { queue, currentTrack, isOpen, openPlayer, closePlayer } = usePlayerContext();
    const { handleUploadAudio, handleRemoveAudio, handleRemoveTrack } = useTrackList(confirm)

    const isActivePlayerTrack = useMemo(() => {
        if (!currentTrack) return;
        return queue.find(track => track.id === currentTrack);
    }, [queue, currentTrack]);


    if (tracks.length === 0)
        return (
            <div className={styles.emptyListMsg}>
                Oops, here are not any tracks...
            </div>
        );

    return (
        <div className={styles.trackList}>
            <ul>{tracks.map((track) => (
                <TrackListItem
                    onUploadAudio={handleUploadAudio}
                    onRemoveAudio={handleRemoveAudio}
                    onRemoveTrack={handleRemoveTrack}
                    track={track}
                    key={track.id}
                    onOpenPlayer={openPlayer}
                />
            ))}
            </ul>
            {isActivePlayerTrack && (
                <Modal onCloseModal={closePlayer} closeWrapper={false} isOpen={isOpen}>
                    <Player
                        image={isActivePlayerTrack.coverImage}
                        audio={isActivePlayerTrack.audioFile}
                    />
                </Modal>
            )}
        </div>
    );
};


const TrackListWithConfirm = withConfirmComponent(TrackList);
export default memo(TrackListWithConfirm)