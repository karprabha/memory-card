import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Pokemon } from "./types/Pokemon";
import randomPokemonFetcher from "./utils/randomPokemonFetcher";
import Card from "./components/Card";
import SkeletonCard from "./components/SkeletonCard";

const App = () => {
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const numberOfPokemonToFetch = 10;
    const highestAllowedPokemonId = 649;
    const skeletonArray = Array.from({ length: numberOfPokemonToFetch });

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
    }, []);

    return (
        <>
            <div className="card-container">
                {isLoading
                    ? skeletonArray.map((_, index) => (
                          <SkeletonCard key={index} />
                      ))
                    : pokemonData.map((pokemon) => (
                          <Card key={uuidv4()} data={pokemon} />
                      ))}
            </div>
        </>
    );
};

export default App;
