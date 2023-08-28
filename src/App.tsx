import GameLevelManager from "./components/GameLevelManager";

const App = () => {
    const numberOfPokemonToFetch = 10;
    const highestAllowedPokemonId = 649;

    return (
        <>
            <GameLevelManager
                numberOfPokemonToFetch={numberOfPokemonToFetch}
                highestAllowedPokemonId={highestAllowedPokemonId}
            />
        </>
    );
};

export default App;
