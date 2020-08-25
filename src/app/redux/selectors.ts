import { createSelector } from '@ngrx/store';
import { AppState } from './reducers';

interface IApp {
    app: AppState;
}

const selectApp = (state: IApp) => state.app;

export const selectCurrentUser = createSelector(selectApp, (state: AppState) => state.currentUser);