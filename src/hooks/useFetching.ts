import { useState } from "react";
import { AxiosError } from "axios";
import useToast from "./useToast.tsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFetching = <T extends any[]>(cb: (...args: T) => Promise<void>) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const notify = useToast();

    const callback = async (...args: T) => {
        try{
            setLoading(true);
            setError(null);
            await cb(...args);
        }
        catch(err){
            if(err instanceof AxiosError){
                setError(err.message);
                notify(err.message, 'error');
            }
        }
        finally {
            setLoading(false)
        }
    }

    return [callback, loading, error] as const;
}