export const BLANK_OPTION_CORRECT = 'BLANK_OPTION_CORRECT';
export const BLANL_OPTION_INCORRECT = 'BLANL_OPTION_INCORRECT';
export const BLANK_OPTION_NONE = 'BLANK_OPTION_NONE';


export const blankOptionCorrect = (id, category) => ({
    type: BLANK_OPTION_CORRECT,
    id,
    category
});

export const blankOptionIncorrect = (id, category) => ({
    type: BLANL_OPTION_INCORRECT,
    id,
    category
});
export const blankOptionNone = (id) => ({
    type: BLANK_OPTION_NONE,
    id
});
