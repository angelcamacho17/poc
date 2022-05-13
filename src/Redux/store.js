import { createStore, combineReducers } from 'redux';
import submittedValueReducer from './reducers/submittedValueReducer';
import checkResponseReducer from './reducers/checkResponseReducer';
import textOptionsReducer from './reducers/textOptionsReducer';

// combineReducers takes in multiple reducers, and returns a single reducer to be used in the createStore(...) function.
// combineReducers takes in multiple 'key : value' pairs to combine the reducers.
// The key is the name of variable within state (in the redux store), and the value is the reducer used to change that variable.
const allReducers = combineReducers({
    submittedValue: submittedValueReducer,
    checkResponse: checkResponseReducer,
    textOptions: textOptionsReducer
});

// createStore takes in 3 parameters: 1. Reducer 2. preloadedState 3. Enhancer.
// In this case: 
// 1. Is the allReducer defined above
// 2. Are the intial values of the state within the redux store
// 3. Allows the store to be viewed within the Redux Tools Extension, a recommended tool when working with Redux.
// https://redux.js.org/api/createstore
export const store = createStore(
    allReducers,
    {
        submittedValue: 'word',
        checkResponse: [
            {id: 1, name:"square",category:"wip", bgcolor: "yellow", answer: 'none'},
            {id: 2, name:"circle", category:"wip", bgcolor:"pink", answer: 'none'},
            {id: 3, name:"rectangle", category:"wip", bgcolor:"skyblue", answer: 'none'}
        ],
        textOptions: [
            {id: 1, name:"option_1", category:"box", answer: 'none', text: 'text 1'},
            {id: 2, name:"option_2", category:"box", answer: 'none', text: 'text 2'},
            {id: 3, name:"option_3", category:"box", answer: 'none', text: 'text 3'},
            {id: 4, name:"option_4", category:"box", answer: 'none', text: 'text 4'},
            {id: 5, name:"option_5", category:"box", answer: 'none', text: 'text 5'},
            {id: 6, name:"option_6", category:"box", answer: 'none', text: 'text 6'},
            {id: 7, name:"option_7", category:"box", answer: 'none', text: 'text 7'},
            {id: 8, name:"option_8", category:"box", answer: 'none', text: 'text 8'},
            {id: 9, name:"option_9", category:"box", answer: 'none', text: 'text 9'}
        ]
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
