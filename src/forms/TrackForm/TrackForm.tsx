import { FC } from "react";
import { Formik, Form } from 'formik';
import { formSchema } from "../../utils/formSchema.ts";
import MyTextInput from "./lib/components/FormikTextInput/FormikTextInput.tsx";
import FormikGenreSelect from "./lib/components/FormikGenreSelect/FormikGenreSelect.tsx";
import MyButton from "../../components/UI/MyButton/MyButton.tsx";
import styles from './TrackForm.module.scss';
import { TrackFormProps } from "./TrackForm.props.ts";
import { useTrackContext } from "../../context/TrackContext.tsx";

const TrackForm: FC<TrackFormProps> = ({ onSubmit, initialValues, isEdit }) => {
    const { genres} = useTrackContext()

    return (
        <Formik
            validationSchema={formSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}
        >
            <Form
                data-testid="track-form"
                className={styles.formWrapper}>
                <div className={styles.formGroup}>
                    <MyTextInput
                        label="Track Title"
                        name="title"
                        placeholder="Enter track title"
                        data-testid="form-title"
                    />
                </div>
                <div className={styles.formGroup}>
                    <MyTextInput
                        label="Artist"
                        name="artist"
                        placeholder="Enter artist name"
                        data-testid="form-artist"
                    />
                </div>
                <div className={styles.formGroup}>
                    <MyTextInput
                        label="Album"
                        name="album"
                        placeholder="Enter album name"
                        data-testid="form-album"
                    />
                </div>
                <div className={styles.formGroup}>
                    <MyTextInput
                        label="Cover (URL)"
                        name="coverImage"
                        placeholder="Enter cover URL"
                        data-testid="form-coverImage"
                    />
                </div>
                <div className={styles.formGroup}>
                    <FormikGenreSelect
                        name="genres"
                        label="Genres"
                        options={genres}
                        data-testid="form-genres"
                    />
                </div>
                <MyButton
                    variant='light-green'
                    className={styles.submitButton}
                    type="submit"
                    data-testid="track-submit-btn"
                >
                    {isEdit ? 'Edit Track' : 'Create Track'}
                </MyButton>
            </Form>
        </Formik>
    );
};

export default TrackForm;
