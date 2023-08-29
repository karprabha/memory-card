import { useState } from "react";
import GameLevelManager from "./GameLevelManager";
import { levels } from "../config/levelsConfig";
import GameModal from "./GameModal";
import sadPikachuURL from "../assets/gif/pikachu-1.gif";
import happyPikachuURL from "../assets/gif/pikachu-2.gif";

interface GameProps {
    onReturnToMenu: () => void;
}

const Game: React.FC<GameProps> = ({ onReturnToMenu }) => {
    const [currentLevel, setCurrentLevel] = useState(0);
    const [currentScore, setCurrentScore] = useState(0);
    const [rerenderKey, setRerenderKey] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalGIFURL, setModalGIFURL] = useState("");
    const [modalMessage, setModalMessage] = useState("");

    const handleGameOver = () => {
        setGameOver(true);

        setModalTitle("Game Over");
        setModalGIFURL(sadPikachuURL);
        setModalMessage("You lost the game. Try again!");
        setIsModalOpen(true);
    };

    const handleLevelCompletion = () => {
        if (currentLevel === levels.length - 1) {
            setGameOver(true);
            setModalTitle("Game Completed");
            setModalGIFURL(happyPikachuURL);
            setModalMessage("Congratulations! You completed all levels.");
        } else {
            setModalTitle("Level Completed");
            setModalGIFURL(happyPikachuURL);
            setModalMessage("Congratulations! You completed the level.");
        }

        setIsModalOpen(true);
    };

    const handleScoreUpdate = () => {
        setCurrentScore((prevScore) => prevScore + 1);
    };

    const handleReturnToMenu = () => {
        console.log("Return to menu logic");
        handleModalClose();
        onReturnToMenu();
    };

    const handlePlayAgain = () => {
        console.log("Play again logic");
        setCurrentScore(0);
        setCurrentLevel(0);
        setGameOver(false);
        handleModalClose();
    };

    const handleContinuePlaying = () => {
        console.log("Continue playing logic");
        setCurrentLevel((prevLevel) => prevLevel + 1);
        handleModalClose();
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setRerenderKey((prevKey) => prevKey + 1);
    };

    const modalActions = {
        returnToMenu: handleReturnToMenu,
        playAgain: handlePlayAgain,
        continuePlaying: handleContinuePlaying,
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

            <GameModal
                isOpen={isModalOpen}
                imgURL={modalGIFURL}
                title={modalTitle}
                message={modalMessage}
                primaryButtonLabel="Return to Menu"
                secondaryButtonLabel={
                    gameOver ? "Play Again" : "Continue Playing"
                }
                onPrimaryButtonClick={modalActions.returnToMenu}
                onSecondaryButtonClick={
                    gameOver
                        ? modalActions.playAgain
                        : modalActions.continuePlaying
                }
            />
        </>
    );
};

export default Game;
