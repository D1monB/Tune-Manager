import './App.scss'
import { Route, Routes, useLocation, useNavigate } from "react-router";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Modal from "../UI/Modal/Modal.tsx";
import CreateTrack from "../../pages/CreateTrack/CreateTrack.tsx";
import EditTrack from "../../pages/EditTrack/EditTrack.tsx";
import Tracks from "../../pages/Tracks/Tracks.tsx";
import NotFound from "../../pages/NotFound/NotFound.tsx";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as { backgroundLocation?: Location };
    const backgroundLocation = state?.backgroundLocation;

    const closeModal = () => navigate('/')

    return (
        <>
            <Header/>
            <main>
                <Routes location={backgroundLocation || location}>
                    <Route path="/" element={<Tracks/>}/>
                    <Route path="/create" element={<CreateTrack/>}/>
                    <Route path="/edit/:slug" element={<EditTrack/>}/>
                    <Route path="*" element={<NotFound />} />
                </Routes>

                {backgroundLocation && (
                    <Routes>
                        <Route
                            path="/create"
                            element={
                                <Modal isOpen={true} onCloseModal={closeModal}>
                                    <CreateTrack/>
                                </Modal>
                            }
                        />
                        <Route
                            path="/edit/:slug"
                            element={
                                <Modal isOpen={true} onCloseModal={closeModal}>
                                    <EditTrack/>
                                </Modal>
                            }
                        />
                    </Routes>
                )}
            </main>
            <Footer/>
            <ToastContainer data-testid="toast-container" position="top-right" autoClose={3000} theme="dark"/>
        </>
    );

}

export default App
