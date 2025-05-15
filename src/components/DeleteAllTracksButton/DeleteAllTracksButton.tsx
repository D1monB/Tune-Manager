import MyButton from "../UI/MyButton/MyButton.tsx";
import styles from './DeleteAllTracksButton.module.scss'
import { FC, memo } from "react";
import { useFetching } from "../../hooks/useFetching.ts";
import { useTrackContext } from "../../context/TrackContext.tsx";
import { TrackService } from "../../services/TrackService.ts";
import withConfirmComponent from "../../hocs/withConfirmComponent.tsx";
import useToast from "../../hooks/useToast.tsx";
import { DeleteAllTracksButtonProps } from "./DeleteAllTracksButton.props.ts";

const DeleteAllTracksButton: FC<DeleteAllTracksButtonProps> = ({ confirm, loading }) => {
    const { onChangeTracks } = useTrackContext();
    const notify = useToast();
    const [removeAllTracks] = useFetching(async () => {
        await TrackService.removeAllTracks();
        onChangeTracks([]);
        notify('All tracks successfully deleted', 'success');
    });

    return (
        <MyButton
            className={styles.deleteAllTracksBtn}
            onClick={() => {
                if (confirm) {
                    confirm('Are you sure you want to delete all tracks?', removeAllTracks);
                }
            }}
            disabled={loading}
            aria-disabled={loading ? 'true' : 'false'}
            data-loading={loading ? 'true' : 'false'}
        >
            Delete all tracks
        </MyButton>
    );
};

const DeleteAllTracksButtonWithConfirm = withConfirmComponent(DeleteAllTracksButton);
export default memo(DeleteAllTracksButtonWithConfirm);
