import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteTeam {
  name: string;
  crest: string;
}

interface UserState {
  favoriteLeague: string;
  favoriteTeam: FavoriteTeam | null;
}

const initialState: UserState = {
  favoriteLeague: '',
  favoriteTeam: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFavoriteLeague(state, action: PayloadAction<string>) {
      state.favoriteLeague = action.payload;
    },
    setFavoriteTeam(state, action: PayloadAction<FavoriteTeam>) {
      state.favoriteTeam = action.payload;
    },
  },
});

export const { setFavoriteLeague, setFavoriteTeam } = userSlice.actions;

export default userSlice.reducer;
