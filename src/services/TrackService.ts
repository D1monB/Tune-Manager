import { Track, TrackResponse } from "../interfaces/track.ts";
import axios from "axios";
import { TrackFormValues } from "../interfaces/forms.ts";

const apiPath = import.meta.env.VITE_API_PATH;
const TRACKS_API = `${apiPath}/api/tracks`;

export class TrackService {
    static async getTracks(
        searchQuery: string = '',
        filterGenre: string = '',
        filterArtist: string = '',
        limit: number = 10,
        page: number = 0
    ): Promise<TrackResponse> {
        const { data } = await axios.get<TrackResponse>(TRACKS_API, {
            params: {
                search: searchQuery,
                genre: filterGenre,
                artist: filterArtist,
                limit,
                page
            }
        });

        return data;
    }

    static async getOneTrack(slug: string): Promise<Track> {
        const { data } = await axios.get<Track>(`${TRACKS_API}/${slug}`);
        return data;
    }

    static async createTrack(dataBody: TrackFormValues): Promise<Track> {
        const { data } = await axios.post<Track>(TRACKS_API, dataBody);
        return data;
    }

    static async updateTrack(id: string, dataBody: TrackFormValues): Promise<Track> {
        const { data } = await axios.put<Track>(`${TRACKS_API}/${id}`, dataBody);
        return data;
    }

    static async removeTrack(id: string) {
        await axios.delete(`${TRACKS_API}/${id}`);
    }

    static async removeAllTracks(): Promise<Track> {
        const { data } = await axios.post<Track>(`${TRACKS_API}/delete`);
        return data;
    }

    static async getAllGenres(): Promise<string[]> {
        const { data } = await axios.get<string[]>(`${apiPath}/api/genres`);
        return data;
    }

    static async uploadTrackFile(id: string): Promise<Track> {
        const { data } = await axios.post<Track>(`${TRACKS_API}/${id}/upload`);
        return data;
    }

    static async removeAudioFile(id: string): Promise<Track> {
        const { data } = await axios.delete<Track>(`${TRACKS_API}/${id}/file`);
        return data;
    }
}