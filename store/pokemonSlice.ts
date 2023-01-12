import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { PokemonSummary, PokemonDetails } from '../types';
import { ucFirst } from '../helpers/string';

export interface PokemonState {
  all: Array<PokemonSummary>;
  seen: {
    [id: string]: PokemonDetails;
  };
}

const initialState: PokemonState = {
  all: [],
  seen: {},
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Array<{ name: string; url: string }>>) => {
      const transformed = action.payload.map(({ url, name }) => ({
        name: ucFirst(name),
        url,
        id: Number(url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', '')),
      }));

      state.all = transformed;
    },
    setSeen: (state, action: PayloadAction<PokemonDetails>) => {
      const details = action.payload;

      const transformed = {
        ...details,
        name: ucFirst(details.name),
      };

      state.seen[details.id] = transformed;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set, setSeen } = pokemonSlice.actions;

export default pokemonSlice.reducer;
