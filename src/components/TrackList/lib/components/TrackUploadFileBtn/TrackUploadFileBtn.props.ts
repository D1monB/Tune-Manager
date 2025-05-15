import { Track } from "../../../../../interfaces/track.ts";

export interface TrackUploadFileBtnProps {
    track: Track;
    onRemoveAudio: (track: Track) => void;
    audioConstant: string[];
    onUploadAudio: ( track: Track, file: string ) => void;
    MAX_FILE_SIZE: number;
}