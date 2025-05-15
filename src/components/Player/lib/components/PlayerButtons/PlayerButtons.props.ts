export interface PlayerButtonsProps {
    onRewind: (seconds: number) => void;
    onPlayPause: () => void;
    playing: boolean;
    error: boolean;
}