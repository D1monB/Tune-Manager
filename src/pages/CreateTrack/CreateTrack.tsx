import TrackForm from '../../forms/TrackForm/TrackForm.tsx'
import { useState } from "react";
import { TrackFormValues } from "../../interfaces/forms.ts";
import { useFetching } from "../../hooks/useFetching.ts";
import { useTrackContext } from "../../context/TrackContext.tsx";
import { TrackService } from "../../services/TrackService.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CreateTrack = () => {
    const { onChangeTracks } = useTrackContext();
    const navigate = useNavigate();

    const [initialValues] = useState<TrackFormValues>({
        title: "",
        artist: "",
        album: "",
        genres: [],
        coverImage: "",
    })

    const [createTrack] = useFetching(async (values: TrackFormValues ) => {
        const data = await TrackService.createTrack(values)
        onChangeTracks(data);
    })


    const handleCreate = (values: TrackFormValues, { resetForm }: { resetForm : () => void }) => {
        createTrack(values);
        resetForm();
        toast.success('The track was successfully created')
        navigate(-1);
    };

    return (
        <TrackForm
            initialValues={initialValues}
            onSubmit={handleCreate}
            isEdit={false}
        />
    );
};

export default CreateTrack;