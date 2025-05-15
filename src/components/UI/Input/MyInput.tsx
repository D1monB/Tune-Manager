import { FC } from "react";
import styles from './MyInput.module.scss'
import { MyInputProps } from "./MyInput.props.js";
import cn from "classnames";

const MyInput: FC<MyInputProps> = ({ className , ...props}) => {
    return (
        <input
            {...props}
            className={cn(styles.myInput, className)}
            type="text"
        />
    );
}

export default MyInput;