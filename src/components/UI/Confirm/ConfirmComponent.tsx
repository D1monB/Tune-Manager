import MyButton from "../MyButton/MyButton.tsx";
import { FC } from "react";
import { ConfirmComponentProps } from "./ConfirmComponent.props.ts";
import styles from './ConfirmComponent.module.scss';

const ConfirmComponent: FC<ConfirmComponentProps> = ({ message, onConfirm, setIsOpen }) => {
    return (
        <div className={styles.confirm} data-testid="confirm-dialog">
            <p>{message}</p>
            <div>
                <MyButton
                    onClick={() => {
                        onConfirm();
                        setIsOpen(false);
                    }}
                    data-testid="confirm-delete"
                >
                    Yes
                </MyButton>
                <MyButton onClick={() => setIsOpen(false)} data-testid="cancel-delete">
                    No
                </MyButton>
            </div>
        </div>
    );
};

export default ConfirmComponent;