export interface Pokemon {
    abilities: Ability[];
    base_experience: number;
    forms: Form[];
    height: number;
    id: number;
    is_default: boolean;
    name: string;
    order: number;
    species: Species;
    sprites: Sprites;
    types: Type[];
    weight: number;
}

export interface Ability {
    ability: Ability2;
    is_hidden: boolean;
}

export interface Ability2 {
    name: string;
    url: string;
}

export interface Form {
    name: string;
}

export interface Species {
    name: string;
}

export interface Sprites {
    other: Other;
}

export interface Other {
    dream_world: DreamWorld;
}

export interface DreamWorld {
    front_default: string;
}

export interface Type {
    slot: number;
    type: Type2;
}

export interface Type2 {
    name: string;
}
