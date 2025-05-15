import { ChangeEvent, FC, memo } from "react";
import { TrackListPanelProps } from "./TrackListPanel.props.ts";
import styles from './TrackListPanel.module.scss'
import MyInput from "../UI/Input/MyInput.tsx";
import MySelect from "../UI/MySelect/MySelect.tsx";
import MyButton from "../UI/MyButton/MyButton.tsx";
import { useLocation, useNavigate } from "react-router";

const TrackListPanel: FC<TrackListPanelProps> = ({ filter, setFilter, genres }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const onFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilter(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    };

    return (
        <div className={styles.trackPanel}>
            <h2 data-testid="tracks-header">Track List</h2>
            <div className={styles.trackPanelActions}>
                <MyInput
                    name="searchQuery"
                    data-testid="search-input"
                    type="text"
                    placeholder="Search by name"
                    value={filter.searchQuery}
                    onChange={onFilterChange}
                    className={styles.trackPanelInput}
                />
                <MyInput
                    type="text"
                    placeholder="Search by artist"
                    className={styles.trackPanelInput}
                    name="filterArtist"
                    data-testid="filter-artist"
                    value={filter.filterArtist}
                    onChange={onFilterChange}
                />
                <MySelect
                    name="filterGenre"
                    data-testid="filter-genre"
                    value={filter.filterGenre}
                    onChange={onFilterChange}
                    className={styles.trackPanelSelect}
                    options={genres}
                    defaultValue="All genres"
                />
                <MyButton
                    onClick={() => navigate('/create', { state: { backgroundLocation: location } })}
                    className={styles.panelCreateButton}
                    data-testid="create-track-button"
                >
                    Create Track
                </MyButton>
            </div>
        </div>
    );
};

export default memo(TrackListPanel);
