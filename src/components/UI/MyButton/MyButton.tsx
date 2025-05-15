import { MyButtonProps } from "./MyButton.props.ts";
import { FC, PropsWithChildren } from "react";
import cn from "classnames";
import styles from './MyButton.module.scss';

const MyButton: FC<PropsWithChildren<MyButtonProps>> = ({ variant = 'primary', className, children, ...props }) => {
    return (
        <button
            className={cn(styles.button, styles[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default MyButton;