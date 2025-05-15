import { ChangeEvent, useCallback, useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { formatTime } from "../../../../utils/formatTime.ts";

export const usePlayer = () => {
    const playerRef = useRef<ReactPlayer>(null);
    const [playing, setPlaying] = useState<boolean>(false);
    const [played, setPlayed] = useState<number>(0);
    const [videoStart , setVideoStart] = useState<string>('0.00');
    const [duration, setDuration] = useState<number>(0);
    const [isEnded, setIsEnded] = useState<boolean>(false);
    const videoEnd = useMemo<string>(() => {
        return formatTime(duration)
    }, [duration]);
    const [volume, setVolume] = useState<number>(1);
    const [isOpenVolume, setIsOpenVolume] = useState<boolean>(false);
    const [error, setError] = useState(false)

    const onPlayerRewinding = useCallback((num: number) => {
        if (playerRef.current) {
            const currentTime = playerRef.current.getCurrentTime();
            let rewindingTime = currentTime + num

            if (rewindingTime > duration){
                rewindingTime = duration;
                setPlaying(false)
            }

            if (isEnded){
                setIsEnded(false)
            }

            if (rewindingTime < 0)
                rewindingTime = 0;

            setVideoStart(formatTime(rewindingTime));
            playerRef.current.seekTo(rewindingTime);
            setPlayed(rewindingTime / duration)
        }
    }, [isEnded, duration])

    const onProgress = ({ playedSeconds, played }: { playedSeconds: number, played: number}) => {
        if (isEnded) return

        setPlayed(played);
        setVideoStart(formatTime(playedSeconds));
    }

    const startPlaying = () => {
        if (isEnded){
            setIsEnded(false);
            if (playerRef.current) playerRef.current.seekTo(0);
        }

        setPlaying(!playing)
    }

    const onChangePlayer = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const seekTo = parseFloat(event.target.value);
        setPlayed(seekTo);
        setVideoStart(formatTime(seekTo * duration));
        if (playerRef.current) {
            playerRef.current.seekTo(seekTo)
        }
    }, [playerRef.current])

    const onReady = () => {
        if (playerRef.current) {
            const duration = playerRef.current.getDuration();
            setDuration(duration);
            setError(false)
        }
    };

    const onEnded = () => {
        setIsEnded(true)
        if (playing){
            setPlaying(false)
        }
    }

    const onError = () => {
        setError(true)
    }

    const onChangeVolume = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value))
    }, [])

    const onToggleVolume = () => {
        setIsOpenVolume(prevState => !prevState)
    }

    return {
        playerRef,
        playing,
        played,
        videoStart,
        duration,
        isEnded,
        videoEnd,
        volume,
        isOpenVolume,
        onPlayerRewinding,
        onProgress,
        startPlaying,
        onChangePlayer,
        onReady,
        onChangeVolume,
        onToggleVolume,
        onEnded,
        onError,
        error
    }
}