import { createStore, combineReducers } from 'redux';
import submittedValueReducer from './reducers/submittedValueReducer';
import checkResponseReducer from './reducers/checkResponseReducer';
import textOptionsReducer from './reducers/textOptionsReducer';
import blankSpaceReducer from './reducers/blankSpacesReduce';
import authorReducer from './reducers/authorReducer';

// combineReducers takes in multiple reducers, and returns a single reducer to be used in the createStore(...) function.
// combineReducers takes in multiple 'key : value' pairs to combine the reducers.
// The key is the name of variable within state (in the redux store), and the value is the reducer used to change that variable.
const allReducers = combineReducers({
    submittedValue: submittedValueReducer,
    checkResponse: checkResponseReducer,
    textOptions: textOptionsReducer,
    blankOptions: blankSpaceReducer,
    authorOptions: authorReducer
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
            {id: 1, name:"option_1", category:"box", answer: 'none', text: 'Stay the same'},
            {id: 2, name:"option_2", category:"box", answer: 'none', text: 'Decrease'},
            {id: 3, name:"option_3", category:"box", answer: 'none', text: 'Increase'},
        ],
        blankOptions: [
            {id: 1, name:"option_1", category:"text", answer: 'none', text: 'blank 1'},
            {id: 2, name:"option_2", category:"text", answer: 'none', text: 'blank 2'},
            {id: 3, name:"option_3", category:"text", answer: 'none', text: 'blank 3'},
            {id: 4, name:"option_4", category:"text", answer: 'none', text: 'blank 4'}
        ],
        authorOptions: {
            textBoxes: [
                {
                    name: 'text',
                    text: '',
                    answer: ""
                }
            ],
            answers: []
        }
    },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
