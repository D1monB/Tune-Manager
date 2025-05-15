import { useTrackContext } from "../../context/TrackContext.tsx";
import TrackList from "../../components/TrackList/TrackList.tsx";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import { useState } from "react";
import TrackListPanel from "../../components/TrackListPanel/TrackListPanel.tsx";
import { useTracks } from "./lib/hooks/useTracks.ts";
import { TrackFilter } from "../../interfaces/track.ts";
import Pagination from "../../components/UI/Pagination/Pagination.tsx";
import DeleteAllTracksButton from "../../components/DeleteAllTracksButton/DeleteAllTracksButton.tsx";
import TrackListFooter from "../../components/TrackListFooter/TrackListFooter.tsx";
import cn from "classnames";
import styles from './Tracks.module.scss'


const Tracks = () => {
    const { tracks, meta, genres, isLoadingGenres } = useTrackContext();
    const [filter, setFilter] = useState<TrackFilter>({
        searchQuery: '',
        filterGenre: '',
        filterArtist: '',
        page: 1,
        limit: 10,
    });

    const { loading } = useTracks(filter);

    if (isLoadingGenres){
        return (
            <Spinner
                color='black'
                size={100}
                data-testid="loading-indicator"
            />
        )
    }

    return (
        <section className={styles.tracks}>
            <div className={cn(styles.container, 'container')}>
                <TrackListPanel
                    genres={genres}
                    setFilter={setFilter}
                    filter={filter}
                    data-loading={isLoadingGenres ? 'true' : 'false'}
                />

                {loading
                    ? <Spinner color={'black'} size={50} data-testid="loading-tracks" />
                    : <TrackList tracks={tracks} data-loading="false" />
                }

                <TrackListFooter >
                    <Pagination
                        page={meta.page}
                        totalPages={meta.totalPages}
                        onChange={(page: number) =>
                            setFilter((prevState) => ({ ...prevState, page }))
                        }
                        loading={isLoadingGenres}
                    />
                    <DeleteAllTracksButton loading={isLoadingGenres}/>
                </TrackListFooter>
            </div>
        </section>
    );
};

export default Tracks;
