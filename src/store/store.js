import { createStore } from "redux";
import Defaultreducer from "../reducer/defaultReducer";
const store = createStore(Defaultreducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;