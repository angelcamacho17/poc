import { BLANK_OPTION_CORRECT, BLANL_OPTION_INCORRECT, BLANK_OPTION_NONE } from '../actions/blankOptionsActions';

// null is set as the default value here for state, because Redux will complain if state is undefined. 
// You can set initial state here, but it is recommended on the Redux documentation to preload the state within the redux store. 
// https://redux.js.org/recipes/structuring-reducers/initializing-state
export default function blankSpaceReducer(state =  null, action) {
    switch (action.type) {
        case BLANK_OPTION_CORRECT:
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
        case BLANL_OPTION_INCORRECT:
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
        case BLANK_OPTION_NONE: 
            return state.map(question => {
                const answeredQuestion = {
                    ...question,
                    answer: 'none',
                    category: 'text'
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