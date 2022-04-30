import { createStore } from "redux";
import reducer from "./rootReducers";

export const store = createStore(reducer);



// returns a store object
// configureStore(
//     {
//         reducer
//     }
// )