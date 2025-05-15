import { Dispatch, SetStateAction } from "react";

export interface ConfirmComponentProps {
    message: string ;
    onConfirm: () => void;
    setIsOpen: Dispatch<SetStateAction<boolean>>,
}