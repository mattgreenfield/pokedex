import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PokemonState {
  all: Array<{ id: number; name: string; url: string }>;
}

const initialState: PokemonState = {
  all: []
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Array<{ name: string; url: string }>>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      //   // doesn't actually mutate the state because it uses the Immer library,
      //   // which detects changes to a "draft state" and produces a brand new
      //   // immutable state based off those changes
      const transformed = action.payload.map(({ url, name }) => ({
        name,
        url,
        id: Number(url.replace('https://pokeapi.co/api/v2/pokemon/', '').replace('/', ''))
      }));

      state.all = transformed;
    },
  }
});

// Action creators are generated for each case reducer function
export const { set } = pokemonSlice.actions;

export default pokemonSlice.reducer;
