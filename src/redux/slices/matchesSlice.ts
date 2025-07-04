import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Match {
  utcDate: string;
  homeTeam: { name: string; crest?: string };
  awayTeam: { name: string; crest?: string };
}

interface MatchesState {
  matches: Record<string, Match[]>;
  loading: boolean;
  error: string | null;
}

const initialState: MatchesState = {
  matches: {},
  loading: false,
  error: null,
};

const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    setMatches(
      state,
      action: PayloadAction<{ leagueCode: string; data: Match[] }>
    ) {
      state.matches[action.payload.leagueCode] = action.payload.data;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setMatches, setLoading, setError } = matchesSlice.actions;
export default matchesSlice.reducer;
