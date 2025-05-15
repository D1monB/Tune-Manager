import { FunctionComponent, useCallback, useState } from "react";
import Modal from "../components/UI/Modal/Modal.tsx";
import ConfirmComponent from "../components/UI/Confirm/ConfirmComponent.tsx";

export interface WithConfirmProps {
    confirm?: (msg: string, action: () => void) => void;
}

const withConfirmComponent  = <T extends object>(Component: FunctionComponent<T & WithConfirmProps>) => {
    return function WithConfirmComponent( props: T )  {
        const [isOpen, setIsOpen] = useState(false);
        const [message, setMessage] = useState("");
        const [onConfirm, setOnConfirm] = useState<() => void>(() => {});

        const confirm = useCallback((msg: string, action: () => void) => {
            setMessage(msg);
            setOnConfirm(() => action);
            setIsOpen(true);
        },[]);

        const ConfirmModal = isOpen ? (
            <Modal onCloseModal={() => setIsOpen(false)} isOpen={isOpen}>
                <ConfirmComponent
                    message={message}
                    setIsOpen={setIsOpen}
                    onConfirm={onConfirm} />
            </Modal>
            ) :
            null;

        return (
            <>
                <Component {...props} confirm={confirm}/>
                {ConfirmModal}
            </>
        )
    }
}

export default withConfirmComponent;