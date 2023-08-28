import { useState } from "react";
import { Pokemon } from "../types/Pokemon";
import SkeletonCard from "./SkeletonCard";

type handleCardSelectionFunction = (pokemonId: number) => void;

interface CardProps {
    handleCardSelection: handleCardSelectionFunction;
    data: Pokemon;
}

const Card: React.FC<CardProps> = ({ data, handleCardSelection }) => {
    const { name, id, sprites } = data;
    const spriteUrl = sprites.other.dream_world.front_default;

    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div className="card">
            <img
                src={spriteUrl}
                alt={`${name} sprite`}
                onLoad={handleImageLoad}
                onClick={() => handleCardSelection(id)}
                style={{ display: imageLoaded ? "block" : "none" }}
            />
            {!imageLoaded && <SkeletonCard />}
            {imageLoaded && <h2>{name}</h2>}
        </div>
    );
};

export default Card;
