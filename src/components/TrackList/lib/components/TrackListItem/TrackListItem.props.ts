import { Track } from "../../../../../interfaces/track.ts";

export interface TrackListItemProps {
    onRemoveTrack: (id: string) => void;
    track: Track;
    onOpenPlayer: ( trackId: string ) => void;
    onRemoveAudio: (track: Track) => void
    onUploadAudio: ( track: Track, file: string ) => void;
}