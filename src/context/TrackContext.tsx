import { createContext, FC, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { IMeta, Track } from "../interfaces/track.ts";
import isEqual from "react-fast-compare";
import { useFetching } from "../hooks/useFetching.ts";
import { TrackService } from "../services/TrackService.ts";

interface TrackContextType {
    tracks: Track[];
    onChangeTracks: (track: Track | Track[]) => void;
    meta: IMeta;
    onChangeMeta: (meta: IMeta) => void;
    onHandleRemove: (id: string) => void;
    isLoadingGenres: boolean
    genres: string[]
}

const initialMetaData: IMeta = { limit: 10, page: 1, total: 0, totalPages: 1 };

const TrackContext = createContext<TrackContextType>({
    tracks: [] as Track[],
    onChangeTracks: () => {},
    meta: initialMetaData,
    onChangeMeta: () => {},
    onHandleRemove: () => {},
    genres: [],
    isLoadingGenres: false
});

const TrackContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [tracks, setTracks] = useState<Track[]>([]);
    const [genres, setGenres] = useState<string[]>([])
    const [getGenres, isLoadingGenres] = useFetching(async () => {
        const data = await TrackService.getAllGenres();
        setGenres(data);
    },)

    useEffect(() => {
        getGenres();
    }, []);

    const [meta, setMeta] = useState<IMeta>(initialMetaData)

    const onChangeMeta = useCallback((meta: IMeta) => {
        setMeta(meta);
    },[])

   const onChangeTracks = useCallback((track: Track | Track[]) => {
       if (Array.isArray(track)){
           setTracks(prevState => {
               if (isEqual(track, prevState)){
                   return prevState
               }
               else {
                   return track
               }
           });
           return
       }

       setTracks(prevState => {
           const exists = prevState.some(t => t.id === track.id);
           return exists ? prevState.map(t => t.id === track.id ? track : t) : [track, ...prevState];
       });
   }, [])

    const onHandleRemove = useCallback((id: string) => {
        setTracks(prevState => prevState.filter(item => item.id !== id));
    }, [])

    return (
        <TrackContext.Provider
            value={ {
                onHandleRemove,
                tracks,
                onChangeTracks,
                meta,
                onChangeMeta,
                genres,
                isLoadingGenres,
        }}>
            {children}
        </TrackContext.Provider>
    );
};

export const useTrackContext = () => {
    return useContext(TrackContext)
}

export default TrackContextProvider;