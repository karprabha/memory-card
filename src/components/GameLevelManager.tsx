import { useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon";
import { shuffleArray } from "../utils/arrayUtils";
import randomPokemonFetcher from "../utils/randomPokemonFetcher";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard";
import logoURL from "../assets/images/logo.png";

type onGameOverFunction = () => void;
type onUpdateScoreFunction = () => void;
type onReturnToMenuFunction = () => void;
type onCompleteLevelFunction = () => void;

interface GameLevelManagerProps {
    numberOfPokemonToFetch: number;
    highestAllowedPokemonId: number;
    currentScore: number;
    onGameOver: onGameOverFunction;
    onUpdateScore: onUpdateScoreFunction;
    onReturnToMenu: onReturnToMenuFunction;
    onCompleteLevel: onCompleteLevelFunction;
}

const GameLevelManager: React.FC<GameLevelManagerProps> = ({
    numberOfPokemonToFetch,
    highestAllowedPokemonId,
    currentScore,
    onGameOver,
    onUpdateScore,
    onReturnToMenu,
    onCompleteLevel,
}) => {
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFlipped, setIsFlipped] = useState(false);
    const [selectedPokemonIds, setSelectedPokemonIds] = useState<number[]>([]);
    const [highestScore, setHighestScore] = useState<number>(() => {
        const storedHighestScore = localStorage.getItem("highestScore");
        return storedHighestScore ? parseInt(storedHighestScore) : 0;
    });

    const loadingSkeletons = Array.from({ length: numberOfPokemonToFetch });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await randomPokemonFetcher(
                    numberOfPokemonToFetch,
                    highestAllowedPokemonId
                );
                setPokemonData(data);
                setIsLoading(false);
                setIsFlipped(true);
            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [highestAllowedPokemonId, numberOfPokemonToFetch]);

    useEffect(() => {
        if (currentScore > highestScore) {
            setHighestScore(currentScore);
            saveHighestScoreToLocalStorage(currentScore);
        }
    }, [currentScore, highestScore]);

    useEffect(() => {
        if (isFlipped) {
            setTimeout(() => {
                shufflePokemonData();
                setTimeout(() => {
                    setIsFlipped(false);
                }, 500);
            }, 500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFlipped]);

    const saveHighestScoreToLocalStorage = (score: number) => {
        localStorage.setItem("highestScore", score.toString());
    };

    const shufflePokemonData = () => {
        const shuffledData = shuffleArray(pokemonData);
        setPokemonData(shuffledData);
    };

    const handleCardSelection = (pokemonId: number) => {
        console.log(pokemonId, selectedPokemonIds);

        if (selectedPokemonIds.includes(pokemonId)) {
            setSelectedPokemonIds([]);
            onGameOver();
        } else {
            setSelectedPokemonIds([...selectedPokemonIds, pokemonId]);
            selectedPokemonIds.push(pokemonId);
            onUpdateScore();
        }

        if (selectedPokemonIds.length === numberOfPokemonToFetch)
            onCompleteLevel();

        setIsFlipped(true);
    };

    return (
        <>
            <div className="navigation-and-score-panel">
                <div className="navigation-container">
                    <img
                        src={logoURL}
                        alt="pokemon-logo"
                        onClick={onReturnToMenu}
                    />
                </div>
                <div className="score-card">
                    <h2>Score: {currentScore}</h2>
                    <h2>Best Score: {highestScore}</h2>
                </div>
            </div>
            <div className="card-container">
                {isLoading
                    ? loadingSkeletons.map((_, index) => (
                          <SkeletonCard key={index} />
                      ))
                    : pokemonData.map((pokemon) => (
                          <Card
                              key={pokemon.id}
                              isFlipped={isFlipped}
                              handleCardSelection={handleCardSelection}
                              data={pokemon}
                          />
                      ))}
            </div>
        </>
    );
};

export default GameLevelManager;
