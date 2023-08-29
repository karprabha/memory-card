import { useRef, useState } from "react";
import Game from "./components/Game";
import Menu from "./components/Menu";
import pikachuURL from "./assets/images/pikachu.png";
import audioURL from "./assets/audio/music-1.mp3";

const App: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isAudioPlaying, setIsAudioPlaying] = useState(true);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isHelpVisible, setIsHelpVisible] = useState(false);

    const handleStartGame = () => {
        setIsGameStarted(true);
    };

    const handleReturnToMenu = () => {
        setIsGameStarted(false);
    };

    const toggleHelpVisibility = () => {
        setIsHelpVisible(!isHelpVisible);
    };

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (!isAudioPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

        setIsAudioPlaying(!isAudioPlaying);
    };

    return (
        <>
            <div className="background-image"></div>
            <div className="app">
                {isGameStarted ? (
                    <Game onReturnToMenu={handleReturnToMenu} />
                ) : (
                    <Menu onStartGame={handleStartGame} />
                )}
            </div>
            <div className="game-options-container">
                <div className="music">
                    <button type="button" onClick={toggleAudio}>
                        {isAudioPlaying ? "🔊" : "🔈"}
                    </button>
                    <audio ref={audioRef} src={audioURL} loop />
                </div>
                <div className="help">
                    <div
                        className={`how-to-play ${
                            isHelpVisible ? "visible" : "hidden"
                        }`}
                    >
                        <ul className="info">
                            <li>Don't click on the same card twice!</li>
                            <li>Click on Pokémon logo to go back.</li>
                        </ul>
                        <img src={pikachuURL} alt="pikachu" />
                    </div>
                    <button type="button" onClick={toggleHelpVisibility}>
                        ❔
                    </button>
                </div>
            </div>
        </>
    );
};

export default App;
