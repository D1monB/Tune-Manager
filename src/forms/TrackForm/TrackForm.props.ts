import { TrackFormValues } from "../../interfaces/forms.ts";

export interface TrackFormProps {
    onSubmit: (values: TrackFormValues, { resetForm } : { resetForm : () => void }) => void;
    initialValues: TrackFormValues;
    isEdit: boolean;
}