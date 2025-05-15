import { FC } from "react";
import { MySelectProps } from "./MySelect.props.ts";

const MySelect: FC<MySelectProps> = ({ options, defaultValue, value, onChange, ...props}) => {
    return (
        <select
            {...props}
            value={value}
            onChange={e => onChange(e)}
        >
            <option value=''>{defaultValue}</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default MySelect;