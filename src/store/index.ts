// third-party
import { AnyAction, configureStore, ThunkDispatch } from '@reduxjs/toolkit';

// project import
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
    reducer: reducers,
});

const { dispatch } = store;
export type RootActionsType = AnyAction;
export type RootStateType = ReturnType<typeof store.getState>;
export type RootDispatchType = ThunkDispatch<
    RootStateType,
    unknown,
    RootActionsType
>;
export { store, dispatch };
