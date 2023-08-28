import { Pokemon } from "../types/Pokemon";
import kebabToPascalWithSpaces from "../utils/kebabToPascalCaseWithSpaces";

type handleCardSelectionFunction = (pokemonId: number) => void;

interface CardProps {
    handleCardSelection: handleCardSelectionFunction;
    data: Pokemon;
    isFlipped: boolean;
}

const Card: React.FC<CardProps> = ({
    isFlipped,
    data,
    handleCardSelection,
}) => {
    const { name, id, sprites } = data;
    const spriteUrl = sprites.other.dream_world.front_default;

    return (
        <div className={`card ${isFlipped ? "flip" : ""}`}>
            <div className="card-inner">
                <div className="card-face card-front">
                    <img
                        src={spriteUrl}
                        alt={`${name} sprite`}
                        onClick={() => handleCardSelection(id)}
                    />

                    <h2>{kebabToPascalWithSpaces(name)}</h2>
                </div>
                <div className="card-face card-back"></div>
            </div>
        </div>
    );
};

export default Card;
