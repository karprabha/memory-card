import { useState } from "react";
import GameLevelManager from "./components/GameLevelManager";
import { levels } from "./config/levelsConfig";

const App = () => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [rerenderKey, setRerenderKey] = useState(0);

    const handleGameOver = () => {
        console.log("game over");

        setCurrentScore(0);
        setCurrentLevel(0);
        setRerenderKey((prevKey) => prevKey + 1);
    };

    const handleLevelCompletion = () => {
        if (currentLevel === levels.length) console.log("game won");
        else setCurrentLevel((prevLevel) => prevLevel + 1);
        setRerenderKey((prevKey) => prevKey + 1);
    };

    const handleScoreUpdate = () => {
        setCurrentScore((prevScore) => prevScore + 1);
    };

    return (
        <>
            <GameLevelManager
                key={rerenderKey}
                numberOfPokemonToFetch={
                    levels[currentLevel].numberOfPokemonToFetch
                }
                highestAllowedPokemonId={
                    levels[currentLevel].highestAllowedPokemonId
                }
                currentScore={currentScore}
                onGameOver={handleGameOver}
                onUpdateScore={handleScoreUpdate}
                onCompleteLevel={handleLevelCompletion}
            />
        </>
    );
};

export default App;
