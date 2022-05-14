import countReducer from "./counter/counter-slice";
import routerReducer from "./router/router-slice";
import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";

// export interface ApplicationState {
//   counter: CounterState | undefined;
//   router: RouterState | undefined;
// }

export const reducer = {
  counter: countReducer,
  router: routerReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

export default store;
