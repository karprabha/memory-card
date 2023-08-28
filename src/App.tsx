import { useState } from "react";
import Game from "./components/Game";
import Menu from "./components/Menu";

const App: React.FC = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);

    const handleStartGame = () => {
        setIsGameStarted(true);
    };

    const handleReturnToMenu = () => {
        setIsGameStarted(false);
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
        </>
    );
};

export default App;
