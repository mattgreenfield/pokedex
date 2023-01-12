interface Ability {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}
interface Form {
  name: string;
  url: string;
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}
interface Type {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface Move {
  move: {
    name: string;
    url: string;
  };
  version_group_details: unknown[];
}

export interface PokemonDetails {
  abilities: Ability[];
  base_experience: number;
  forms: Form[];
  game_indices: unknown[]; // TODO
  height: number;
  held_items: unknown[]; // TODO
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_types: unknown[]; // TODO
  species: { name: string; url: string };
  sprites: {
    other: {
      front_default: string;
      dream_world: { front_default: string };
      home: { front_default: string };
      'official-artwork': { front_default: string };
    };
  };
  stats: Stat[];
  types: Type[];
  weight: number;
}
