import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StandingTeam {
  position: number;
  team: {
    name: string;
    crest: string;
  };
  points: number;
  playedGames: number;
}

interface StandingsState {
  standings: Record<string, StandingTeam[]>;
  loading: boolean;
  error: string | null;
}

const initialState: StandingsState = {
  standings: {},
  loading: false,
  error: null,
};

const standingsSlice = createSlice({
  name: 'standings',
  initialState,
  reducers: {
    setStandings(
      state,
      action: PayloadAction<{ leagueCode: string; data: StandingTeam[] }>
    ) {
      state.standings[action.payload.leagueCode] = action.payload.data;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setStandings, setLoading, setError } = standingsSlice.actions;
export default standingsSlice.reducer;
