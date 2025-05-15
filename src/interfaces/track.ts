export interface Track {
    id: string;
    title: string;
    artist: string;
    album: string;
    genres: string[];
    slug: string;
    coverImage: string;
    audioFile: string;
    createdAt: string;
    updatedAt: string;
}

export interface TrackFilter {
    searchQuery: string;
    filterGenre: string;
    filterArtist: string;
    page: number;
    limit: number;
}

export interface IMeta {
    "total": number,
    "page": number,
    "limit": number,
    "totalPages": number
}

export interface TrackResponse{
    data: Track[];
    meta: IMeta;
}