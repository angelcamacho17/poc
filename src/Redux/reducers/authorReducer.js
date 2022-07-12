import { AUTHOR_OPTION_CORRECT, AUTHOR_SET_CORRECT_ANSWER, AUTHOR_OPTION_INCORRECT, AUTHOR_OPTION_NONE, AUTHOR_ADD_OPTION, AUTHOR_ADD_QUESTION } from '../actions/authorOptionsActions';

// null is set as the default value here for state, because Redux will complain if state is undefined. 
// You can set initial state here, but it is recommended on the Redux documentation to preload the state within the redux store. 
// https://redux.js.org/recipes/structuring-reducers/initializing-state
export default function authorReducer(state =  null, action) {
    console.log('here')
    switch (action.type) { 
        case AUTHOR_SET_CORRECT_ANSWER:{
            return {
                ...state,
                textBoxes: state.textBoxes.map(textBox => {
                    const newText = {
                        ...textBox,
                        answer: action.option,
                    }
                        if (textBox.name === action.name) {
                            return newText;
                        } else {
                            return textBox
                        }
                    }
                )
            }
        }

        case AUTHOR_ADD_QUESTION: 
            return {
                answers: state.answers,
                textBoxes: [
                    ...state.textBoxes,
                    {
                        name: 'text' + state.textBoxes.length,
                        text: action.text,
                        answer: ''
                    }
                ]
            }
        case AUTHOR_ADD_OPTION: 
            return {
                ...state,
                answers: [
                    ...state.answers,
                {
                    id: state.answers.length + 1,
                    name: 'option_' + (state.answers.length + 1),
                    ...action.option
                }]
            }
            
        case AUTHOR_OPTION_CORRECT:
            return {
                ...state,
                answers: state.answers.map(question => {
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
            )}
        case AUTHOR_OPTION_INCORRECT:
            return {
                ...state,
                answers: state.answers.map(question => {
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
            )}
        case AUTHOR_OPTION_NONE: 
            return {
                ...state,
                answers: state.answers.map(question => {
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
            )}
        default:
            return state;
    }
}