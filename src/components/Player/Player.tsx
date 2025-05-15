import ReactPlayer from "react-player";
import PlayerControl from "./lib/components/PlayerControl/PlayerControl.tsx";
import PlayerDuration from "./lib/components/PlayerDuration/PlayerDuration.tsx";
import PlayerButtons from "./lib/components/PlayerButtons/PlayerButtons.tsx";
import PlayerVolume from "./lib/components/PlayerVolume/PlayerVolume.tsx";
import PlayerTrack from "./lib/components/PlayerTrack/PlayerTrack.tsx";
import { usePlayer } from "./lib/hooks/usePlayer.ts";
import styles from './Player.module.scss'
import { FC } from "react";
import { PlayerProps } from "./Player.props.ts";

const Player: FC<PlayerProps> = ({ audio, image}) => {
    const player = usePlayer();
    const isPlayerReady = Boolean(player.playerRef.current)

    return (
        <div className={styles.player} data-testid={`audio-player-${audio}`}>
            <ReactPlayer
                onError={player.onError}
                onEnded={player.onEnded}
                onReady={player.onReady}
                onProgress={player.onProgress}
                playing={player.playing}
                ref={player.playerRef}
                volume={player.volume}
                width={0}
                height={0}
                url={audio}
            />
            {isPlayerReady && (
                <>
                    <PlayerTrack
                        image={image}
                        error={player.error}
                        played={player.played}
                        onChangePlayer={player.onChangePlayer}
                        data-testid={`audio-progress-${audio}`}
                    />
                    <PlayerControl>
                        <PlayerDuration
                            data-testid={`audio-duration-${audio}`}
                            error={player.error}
                            start={player.videoStart}
                            end={player.videoEnd}
                        />
                        <PlayerButtons
                            error={player.error}
                            onRewind={player.onPlayerRewinding}
                            onPlayPause={player.startPlaying}
                            playing={player.playing}
                            data-testid={`audio-buttons-${audio}`}
                        />
                        <PlayerVolume
                            error={player.error}
                            volume={player.volume}
                            onChangeVolume={player.onChangeVolume}
                            isOpen={player.isOpenVolume}
                            toggleOpen={player.onToggleVolume}
                            data-testid={`audio-volume-${audio}`}
                        />
                    </PlayerControl>
                </>
            )}
        </div>
    )
};

export default Player;