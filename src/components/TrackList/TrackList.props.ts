import { Track } from "../../interfaces/track.ts";
import { WithConfirmProps } from "../../hocs/withConfirmComponent.tsx";

export interface TrackListProps extends WithConfirmProps {
    tracks: Track[],
}