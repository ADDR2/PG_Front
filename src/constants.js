export const HEADER_OPTIONS = [
    { name: 'Show Favorites', route: '/activities/favorites' },
    { name: 'Add Activity', route: '/activities/add' }
];

export const USER_FEEDBACK = {
    UNEXPECTED_ERROR: 'Something went wrong. Please try again after a few minutes or contact support.',
    COULD_NOT_LOAD_INFO: 'The Application was not able to load your information.',
    NO_DATA: "No activities were found, but don't worry you can add some ;).",
    COULD_NOT_SAVE_INFO: 'The Application was not able to save the new activity.',
    SAVED_INFO: 'Your activity was created :).',
    ADD_FAVORITE_ERROR: 'Error adding favorite activity. Please try again later or contact support.',
    REMOVE_FAVORITE_ERROR: 'Error removing favorite activity. Please try again later or contact support.',
    DUPLICATE_FOUND: "Oh! Seems like you have found some duplicated id's.",
    REJECTED_FILE: "Sorry, but I cannot load your file :/. Can you try with another one?"
};