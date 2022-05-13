export const OPTION_CORRECT = 'OPTION_CORRECT';
export const OPTION_INCORRECT = 'OPTION_INCORRECT';
export const OPTION_NONE = 'OPTION_NONE';


export const optionCorrect = (id, category) => ({
    type: OPTION_CORRECT,
    id,
    category
});

export const optionIncorrect = (id, category) => ({
    type: OPTION_INCORRECT,
    id,
    category
});
export const optionNone = (id, category) => ({
    type: OPTION_NONE,
    id
});
