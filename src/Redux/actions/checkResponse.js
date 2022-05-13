export const CHECK_CORRECT = 'CHECK_CORRECT';
export const CHECK_INCORRECT = 'CHECK_INCORRECT';
export const CHECK_NONE = 'CHECK_NONE';
export const LOAD = 'LOAD';


export const checkCorrect = (id, category) => ({
    type: CHECK_CORRECT,
    id,
    category
});

export const checkInCorrect = (id, category) => ({
    type: CHECK_INCORRECT,
    id,
    category
});
export const checkNone = (id, category) => ({
    type: CHECK_NONE,
    id
});

export const loadQuestions = id => ({
    type: LOAD
});

