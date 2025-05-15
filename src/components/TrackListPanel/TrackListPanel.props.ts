import { TrackFilter } from "../../interfaces/track.ts";
import { Dispatch, SetStateAction } from "react";

export interface TrackListPanelProps {
    filter: TrackFilter;
    setFilter: Dispatch<SetStateAction<TrackFilter>>;
    genres: string[]
}