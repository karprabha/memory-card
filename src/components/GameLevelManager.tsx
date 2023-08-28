import { useEffect, useState } from "react";
import { Pokemon } from "../types/Pokemon";
import randomPokemonFetcher from "../utils/randomPokemonFetcher";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard";

interface GameLevelManagerProps {
    numberOfPokemonToFetch: number;
    highestAllowedPokemonId: number;
}

const GameLevelManager: React.FC<GameLevelManagerProps> = ({
    numberOfPokemonToFetch,
    highestAllowedPokemonId,
}) => {
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentScore, setCurrentScore] = useState(0);
    const [selectedPokemonIds, setSelectedPokemonIds] = useState<number[]>([]);

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

    const shufflePokemonData = () => {
        const shuffledData = [...pokemonData];
        for (let i = shuffledData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledData[i], shuffledData[j]] = [
                shuffledData[j],
                shuffledData[i],
            ];
        }
        setPokemonData(shuffledData);
    };

    const handleCardSelection = (pokemonId: number) => {
        console.log(pokemonId, selectedPokemonIds);

        if (selectedPokemonIds.indexOf(pokemonId) !== -1)
            console.log("game over");
        else {
            setSelectedPokemonIds([...selectedPokemonIds, pokemonId]);
            selectedPokemonIds.push(pokemonId);
            setCurrentScore((prevScore) => prevScore + 1);
        }

        if (selectedPokemonIds.length === numberOfPokemonToFetch)
            console.log("game won");

        shufflePokemonData();
    };

    return (
        <>
            <h1>{currentScore}</h1>
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
