import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface League {
  name: string;
  code: string;
  emblem: string;
}

interface LeaguesState {
  leagues: League[];
  loading: boolean;
  error: string | null;
}

const initialState: LeaguesState = {
  leagues: [],
  loading: false,
  error: null,
};

const leaguesSlice = createSlice({
  name: 'leagues',
  initialState,
  reducers: {
    setLeagues(state, action: PayloadAction<League[]>) {
      state.leagues = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setLeagues, setLoading, setError } = leaguesSlice.actions;
export default leaguesSlice.reducer;
