import generateUniqueRandomNumbers from "./generateUniqueRandomNumbers";
import fetchData from "./fetchData";

const randomPokemonFetcher = async (count: number, maxId: number) => {
    const randomPokemonIds = generateUniqueRandomNumbers(count, maxId);
    const pokemonDataPromises = randomPokemonIds.map(async (pokemonId) => {
        const url =
            "https://corsproxy.io/?" +
            encodeURIComponent(
                `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
            );
        try {
            const data = await fetchData(url);
            return data;
        } catch (error) {
            console.error(`Error fetching data for Pokemon ID ${pokemonId}`);
            return null;
        }
    });

    const pokemonData = await Promise.all(pokemonDataPromises);
    return pokemonData.filter((data) => data !== null);
};

export default randomPokemonFetcher;
