import { useField } from "formik";
import { FC } from "react";
import { FormikTextInputProps } from "./FormikTextInput.props.ts";

const FormikTextInput: FC<FormikTextInputProps> = ({ label, name, ...props }) => {
    const [field, meta] = useField({ name });

    return (
        <>
            <label htmlFor={name}>{label}</label>
            <input id={name} className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error" data-testid={`error-${name}`}>
                    {meta.error}
                </div>
            ) : null}
        </>
    );
};

export default FormikTextInput;
