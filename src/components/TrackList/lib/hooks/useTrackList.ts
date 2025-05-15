import { useTrackContext } from "../../../../context/TrackContext.tsx";
import { Track } from "../../../../interfaces/track.ts";
import { TrackService } from "../../../../services/TrackService.ts";
import { useFetching } from "../../../../hooks/useFetching.ts";
import useToast from "../../../../hooks/useToast.tsx";

export const useTrackList = (confirm?  : (msg: string, action: () => void) => void)=> {
    const { onChangeTracks, onHandleRemove } = useTrackContext();
    const notify = useToast();

    const [removeTrack] = useFetching(async (id: string) => {
        await TrackService.removeTrack(id);
        onHandleRemove(id);
        notify('Track deleted successfully', 'success');
    });

    const [ removeAudio ] = useFetching(async (track: Track) => {
        onChangeTracks({...track, audioFile: ''});
        notify('Audio deleted successfully', 'success');
        //Розкоментуйте якщо є готовий сервер з логікою для видалення файлу в БД

        // const data = await TrackService.removeAudioFile(track.id);
        // onChangeTracks(data);
        // notify('Audio deleted successfully', 'success');

        //Сервер немає можливості видалити файл, через це він видасть помилку і аудіо локально не видалиться,
    });

    const [uploadAudio] = useFetching(async (track: Track, file: string) => {
        onChangeTracks({...track, audioFile: file})
        notify('Audio uploaded successfully', 'success');

        //Розкоментуйте якщо є готовий сервер з логікою для оновлення файлу в БД

        // const data = await TrackService.uploadTrackFile(track.id);
        // onChangeTracks(data)
        // notify('Audio uploaded successfully', 'success');

        // Сервер немає логіки для оновленя/встановлення файлу в базі данних, через це він видасть помилку і аудіо локально не оновиться,
    })

    const handleUploadAudio = (track: Track, file: string) => {
        if (confirm)
            confirm('Are you sure you want upload the audio?', () => {
                uploadAudio(track, file);
            });
    }

    const handleRemoveTrack = (id: string) => {
        if (confirm)
            confirm('Are you sure you want to delete the track?', async () => {
                removeTrack(id);
            });
    };

    const handleRemoveAudio = (track: Track) => {
        if (confirm)
            confirm('Are you sure you want to delete the audio?', () => {
                removeAudio(track);
            });
    };

    return {
        handleRemoveTrack,
        handleRemoveAudio,
        handleUploadAudio,
    };
};