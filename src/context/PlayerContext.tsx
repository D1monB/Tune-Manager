import { createContext, useState, useCallback, useContext, FC, PropsWithChildren, useMemo } from 'react';
import { useTrackContext } from "./TrackContext.tsx";
import { Track } from "../interfaces/track.ts";

interface PlayerContextType {
    currentTrack: string | null;
    queue: Track[];
    isOpen: boolean;
    openPlayer: (trackId: string) => void;
    closePlayer: () => void;
    nextTrack: () => void;
    prevTrack: () => void;
    isLastTrack: boolean,
    isFirstTrack: boolean
}

const PlayerContext = createContext<PlayerContextType>({
    currentTrack: null,
    queue: [],
    isOpen: false,
    openPlayer: () => {},
    closePlayer: () => {},
    nextTrack: () => {},
    prevTrack: () => {},
    isLastTrack: false,
    isFirstTrack: false,
});

export const PlayerContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const { tracks } = useTrackContext()
    const [currentTrack, setCurrentTrack] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const queue = useMemo(() => tracks.filter(track => track.audioFile), [tracks]);
    const isLastTrack = queue[queue.length - 1]?.id === currentTrack;
    const isFirstTrack = queue[0]?.id === currentTrack;

    const openPlayer = useCallback(( trackId: string ) => {
        setCurrentTrack(trackId);
        setIsOpen(true);
    }, []);

    const closePlayer = useCallback(() => {
        setIsOpen(false);
        setCurrentTrack(null);
    }, []);


    const nextTrack = () => {
        const index = queue.findIndex(item => item.id === currentTrack);
        if (queue[index + 1]){
            setCurrentTrack(queue[index + 1].id)
        }
    }

    const prevTrack = () => {
        const index = queue.findIndex(item => item.id === currentTrack);
        if (queue[index - 1]){
            setCurrentTrack(queue[index - 1].id)
        }
    }

    return (
        <PlayerContext.Provider value={{
            currentTrack,
            queue,
            isOpen,
            openPlayer,
            closePlayer,
            nextTrack,
            prevTrack,
            isLastTrack,
            isFirstTrack
        }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayerContext = () => useContext(PlayerContext);