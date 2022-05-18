export const AUTHOR_OPTION_CORRECT = 'AUTHOR_OPTION_CORRECT';
export const AUTHOR_OPTION_INCORRECT = 'AUTHOR_OPTION_INCORRECT';
export const AUTHOR_OPTION_NONE = 'AUTHOR_OPTION_NONE';
export const AUTHOR_ADD_OPTION = 'AUTHOR_ADD_OPTION';
export const AUTHOR_ADD_QUESTION = 'AUTHOR_ADD_QUESTION';

export const authorAddQuestion= (obj) => ({
    type: AUTHOR_ADD_QUESTION,
    text: obj.text
});
export const authorAddOption= (option) => ({
    type: AUTHOR_ADD_OPTION,
    option
});
export const authorOptionCorrect = (id, category) => ({
    type: AUTHOR_OPTION_CORRECT,
    id,
    category
});

export const authorOptionIncorrect = (id, category) => ({
    type: AUTHOR_OPTION_INCORRECT,
    id,
    category
});
export const authorOptionNone = (id) => ({
    type: AUTHOR_OPTION_NONE,
    id
});
