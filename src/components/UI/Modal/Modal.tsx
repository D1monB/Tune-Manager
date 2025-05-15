import { FC, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ModalProps } from "./Modal.props.ts";
import styles from "./Modal.module.scss";
import { useDisableScroll } from "../../../hooks/useDisableScroll.ts";
import cn from "classnames";
import MyButton from "../MyButton/MyButton.tsx";

const Modal: FC<PropsWithChildren<ModalProps>> = ({ onCloseModal, children, isOpen, closeWrapper = true}) => {
    const modalRoot = document.getElementById('modal-root')!

    useDisableScroll(isOpen)

    return (
        createPortal(
            <AnimatePresence>{isOpen && (
                <motion.div
                    className={cn(styles.modal, {
                        [styles.unCloseWrapper] : !closeWrapper
                    })}
                    onClick={closeWrapper ? onCloseModal : undefined}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <MyButton
                        variant='ghost'
                        onClick={onCloseModal}
                        className={styles.closeModalBtn}
                    >
                        x
                    </MyButton>
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        className={styles.modalContent}
                        initial={{ scale: 0.4 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>, modalRoot)

    );
};

export default Modal;