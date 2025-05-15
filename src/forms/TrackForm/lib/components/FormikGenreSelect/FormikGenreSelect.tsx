import { useField } from "formik";
import { FC, useState } from "react";
import { FormikGenreSelectProps } from "./FormikGenreSelect.props.ts";
import MyButton from "../../../../../components/UI/MyButton/MyButton.tsx";
import styles from './FormikGenreSelect.module.scss';

const FormikGenreSelect: FC<FormikGenreSelectProps> = ({ label, options, name }) => {
    const [selected, setSelected] = useState('');
    const [field, meta, helpers] = useField<string[]>({ name });
    const selectedGenres = field.value;

    const onAddGenre = () => {
        if (selected && !selectedGenres.includes(selected)) {
            helpers.setValue([...selectedGenres, selected]);
            setSelected('');
        }
    };

    const onDeleteGenre = (genre: string) => {
        helpers.setValue(selectedGenres.filter(item => item !== genre));
    };

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <div>
                <ul>
                    {selectedGenres.map(item => (
                        <li className={styles.selectedGenre} key={item}>
                            {item}
                            <MyButton
                                variant='ghost'
                                className={styles.deleteButton}
                                onClick={() => onDeleteGenre(item)}
                            >
                                x
                            </MyButton>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.selectBody}>
                <select
                    className={styles.select}
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    name={name}
                    id={name}
                >
                    <option disabled value="">Select genre...</option>
                    {options
                        .filter(item => !selectedGenres.includes(item))
                        .map(item => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                </select>
                <MyButton
                    className={styles.addButton}
                    type='button'
                    onClick={onAddGenre}
                >
                    +
                </MyButton>
            </div>
            {meta.touched && meta.error ? (
                <div className="error" data-testid={`error-${name}`}>
                    {meta.error}
                </div>
            ) : null}
        </>
    );
};

export default FormikGenreSelect;
