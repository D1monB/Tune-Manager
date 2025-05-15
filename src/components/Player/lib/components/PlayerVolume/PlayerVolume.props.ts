import { ChangeEvent, Dispatch, SetStateAction } from "react";

export interface VolumeControlProps  {
    volume: number;
    onChangeVolume: (e: ChangeEvent<HTMLInputElement>) => void;
    isOpen: boolean;
    toggleOpen: Dispatch<SetStateAction<boolean>>;
    error: boolean
};