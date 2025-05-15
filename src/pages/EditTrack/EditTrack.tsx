import TrackForm from '../../forms/TrackForm/TrackForm.tsx'
import { FC, useEffect, useState } from "react";
import { TrackFormValues } from "../../interfaces/forms.ts";
import withConfirmComponent from "../../hocs/withConfirmComponent.tsx";
import { EditTrackProps } from "./EditTrack.props.ts";
import { useFetching } from "../../hooks/useFetching.ts";
import { TrackService } from "../../services/TrackService.ts";
import { useTrackContext } from "../../context/TrackContext.tsx";
import { useNavigate, useParams } from "react-router";
import { Track } from "../../interfaces/track.ts";
import Spinner from "../../components/UI/Spinner/Spinner.tsx";
import useToast from "../../hooks/useToast.tsx";

const EditTrack: FC<EditTrackProps> = ({ confirm }) => {
    const { slug} = useParams();
    const navigate = useNavigate();
    const { onChangeTracks } = useTrackContext();
    const notify = useToast();
    const [track, setTrack] = useState<Track | null>(null)
    const [initialValues, setInitialValues] = useState<TrackFormValues>({
        title:  '',
        artist: '',
        album: '',
        genres: [],
        coverImage: '',
    })


    const [getTrack, loading] = useFetching(async () => {
        if (slug){
            const data = await TrackService.getOneTrack(slug)
            setTrack(data);
            setInitialValues({
                title: data.title,
                artist: data.artist,
                album: data.album,
                genres: data.genres,
                coverImage: data.coverImage,
            })
        }
    })

    const [updateTrack] = useFetching(async(values: TrackFormValues) => {
       if (track){
           const data = await TrackService.updateTrack(track.id, values);
           // Так як сервер немає можливості зберігання аудіо в БД,
           // відповідь від нього не буде містити аудіо якщо його встановили локально,
           // тим самим ми перезаписуємо локальне аудіо на пусту стрічку під час редагування треку
           onChangeTracks(data);
           notify('The track is successfully changed', 'success')
           navigate(-1)
       }
    })

    useEffect(() => {
        if (slug){
            getTrack();
        }
    }, [slug]);

    const onHandleUpdate = (values: TrackFormValues ) => {
        if (confirm)
            confirm('Are you sure you want to edit the track?', async () => {
                updateTrack(values)
            })
    };

    return (
        loading
            ? <Spinner />
            : <TrackForm
                initialValues={initialValues}
                onSubmit={onHandleUpdate}
                isEdit={true}
            />
    );
};

const EditTrackWithConfirm = withConfirmComponent(EditTrack)
export default EditTrackWithConfirm;