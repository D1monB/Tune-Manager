import { ChangeEvent } from "react";

export interface PlayerTrackProps {
    played: number
    onChangePlayer: (event: ChangeEvent<HTMLInputElement>) => void
    error: boolean;
    image: string;
}