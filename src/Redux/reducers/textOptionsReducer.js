import { OPTION_CORRECT, OPTION_INCORRECT, OPTION_NONE } from '../actions/textOptionActions';

// null is set as the default value here for state, because Redux will complain if state is undefined. 
// You can set initial state here, but it is recommended on the Redux documentation to preload the state within the redux store. 
// https://redux.js.org/recipes/structuring-reducers/initializing-state
export default function textOptionsReducer(state =  null, action) {
    switch (action.type) {
        case OPTION_CORRECT:
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
        case OPTION_INCORRECT:
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
        case OPTION_NONE: 
            return state.map(question => {
                const answeredQuestion = {
                    ...question,
                    answer: 'none',
                    category: 'box'
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