import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import leaguesReducer from './slices/leaguesSlice';
import matchesReducer from './slices/matchesSlice';
import standingsReducer from './slices/standingsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    leagues: leaguesReducer,
    matches: matchesReducer,
    standings: standingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
