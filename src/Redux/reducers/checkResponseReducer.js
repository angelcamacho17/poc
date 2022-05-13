import { CHECK_CORRECT, CHECK_INCORRECT, LOAD, CHECK_NONE } from '../actions/checkResponse';

// null is set as the default value here for state, because Redux will complain if state is undefined. 
// You can set initial state here, but it is recommended on the Redux documentation to preload the state within the redux store. 
// https://redux.js.org/recipes/structuring-reducers/initializing-state
export default function checkResponseReducer(state =  null, action) {
    switch (action.type) {
        case LOAD: 
            return state;
        case CHECK_CORRECT:
            return state.map(question => {
                const answeredQuestion = {
                    ...question,
                    answer: 'correct',
                    category: action.category
                }
                    if (question.name === action.id) {
                        return answeredQuestion;
                    } else {
                        return question
                    }
                }
            );
        case CHECK_INCORRECT:
            return state.map(question => {
                const answeredQuestion = {
                    ...question,
                    answer: 'incorrect',
                    category: action.category
                }
                    if (question.name === action.id){
                        return answeredQuestion;
                    } else {
                        return question
                    }
                }
            );
        case CHECK_NONE: 
            return state.map(question => {
                const answeredQuestion = {
                    ...question,
                    answer: 'none',
                    category: 'wip'
                }
                    if (question.name === action.id){
                        return answeredQuestion;
                    } else {
                        return question
                    }
                }
            ); 
        default:
            return state;
    }
}