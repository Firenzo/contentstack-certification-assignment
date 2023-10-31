export type PokemonType =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "steel"
  | "dragon"
  | "dark"
  | "fairy";

export type Evolution = {
  type: "stage1" | "stage2" | "stage3" | "mega evolution" | "dynamax";
  pokemonId: number;
};
