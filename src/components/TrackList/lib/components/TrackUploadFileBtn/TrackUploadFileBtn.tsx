import React, { useRef, ChangeEvent } from 'react';
import styles from './TrackUploadFileBtn.module.scss'
import { TrackUploadFileBtnProps } from "./TrackUploadFileBtn.props.ts"
import MyButton from "../../../../UI/MyButton/MyButton.tsx";
import removeImg from '../../../../../assets/delete.svg'
import { toast } from "react-toastify";

const TrackUploadFileBtn: React.FC<TrackUploadFileBtnProps> = ({ track, onRemoveAudio, audioConstant, MAX_FILE_SIZE, onUploadAudio }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const isAudioFile = audioConstant.includes(file.type);
            const isLessThan10Mb = file.size < MAX_FILE_SIZE;

            if (isAudioFile && isLessThan10Mb) {
                const url = URL.createObjectURL(file);
                onUploadAudio(track, url);
            } else {
                toast.error('Invalid file type or file size exceeds the limit');
            }
        }
    };

    return (
        <div>
            <MyButton
                onClick={handleUploadClick}
                className={styles.uploadBtn}
                data-testid={`upload-track-${track.id}`}
            >
                {track.audioFile ? 'Replace' : 'Upload'}
            </MyButton>
            <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            {track.audioFile && (
                <MyButton
                    onClick={() => onRemoveAudio(track)}
                    className={styles.removeAudioBtn}
                    data-testid={`remove-track-${track.id}`}
                >
                    <span>Audio</span>
                    <img src={removeImg} alt="Delete audio"/>
                </MyButton>
            )}
        </div>
    );
};

export default TrackUploadFileBtn;