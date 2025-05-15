import { useFetching } from "../../../../hooks/useFetching.ts";
import { TrackService } from "../../../../services/TrackService.ts";
import { useTrackContext } from "../../../../context/TrackContext.tsx";
import { TrackFilter } from "../../../../interfaces/track.ts";
import { useEffect } from "react";

export const useTracks = (filter: TrackFilter) => {
    const { onChangeTracks, onChangeMeta } = useTrackContext();

    const fetchTracks = async () => {
        const data = await TrackService.getTracks(
            filter.searchQuery,
            filter.filterGenre,
            filter.filterArtist,
            filter.limit,
            filter.page,
        );
        onChangeTracks(data.data);
        onChangeMeta(data.meta);
    };

    const [getTracks, loading, error] = useFetching(fetchTracks);

    useEffect(() => {
        const handler = setTimeout(() => {
            getTracks();
        }, 300);

        return () => clearTimeout(handler);
    }, [filter.searchQuery, filter.filterGenre, filter.filterArtist, filter.page, filter.limit]);

    return { getTracks, loading, error };
};
