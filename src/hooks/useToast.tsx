import { toast } from 'react-toastify';

type ToastType = 'success' | 'error';

const useToast = () => {
    const notify = (message: string, type: ToastType) => {
        return toast['success'](<span data-testid={`toast-${[type]}`}>{message}</span>);
    }

    return notify
};

export default useToast;
