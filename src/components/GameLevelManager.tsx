import { useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon";
import { shuffleArray } from "../utils/arrayUtils";
import randomPokemonFetcher from "../utils/randomPokemonFetcher";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard";

type onGameOverFunction = () => void;
type onUpdateScoreFunction = () => void;
type onCompleteLevelFunction = () => void;

interface GameLevelManagerProps {
    numberOfPokemonToFetch: number;
    highestAllowedPokemonId: number;
    currentScore: number;
    onGameOver: onGameOverFunction;
    onUpdateScore: onUpdateScoreFunction;
    onCompleteLevel: onCompleteLevelFunction;
}

const GameLevelManager: React.FC<GameLevelManagerProps> = ({
    numberOfPokemonToFetch,
    highestAllowedPokemonId,
    currentScore,
    onGameOver,
    onUpdateScore,
    onCompleteLevel,
}) => {
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [isLoading, setIsLoading] = useState(true);
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

        shufflePokemonData();
    };

    return (
        <>
            <h1>Current Score: {currentScore}</h1>
            <h1>Highest Score: {highestScore}</h1>
            <div className="card-container">
                {isLoading
                    ? loadingSkeletons.map((_, index) => (
                          <SkeletonCard key={index} />
                      ))
                    : pokemonData.map((pokemon) => (
                          <Card
                              key={pokemon.id}
                              handleCardSelection={handleCardSelection}
                              data={pokemon}
                          />
                      ))}
            </div>
        </>
    );
};

export default GameLevelManager;
