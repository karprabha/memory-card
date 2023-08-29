import { useState } from "react";
import Game from "./components/Game";
import Menu from "./components/Menu";
import pikachuURL from "./assets/images/pikachu.png";

const App: React.FC = () => {
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
                <div className="music-btn">
                    <button type="button">🔊</button>
                    {/* <button type="button">🔈</button> */}
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
