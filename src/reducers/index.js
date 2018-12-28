import { ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS } from '../constants';

const reminder = (action) => {
    const { text, dueDate } = action;
    return {
        text, dueDate,
        id: Math.random()
    };
}

const removeById = (state, id) => {
    const reminders = state.filter(reminder => reminder.id !== id);
    console.log('new reduced reminders', reminders);
    return reminders;
  }

const reducer = (state = [], action) => {
    let reminders = null;
    switch (action.type) {
        case ADD_REMINDER:
            reminders = [...state, reminder(action)];
            console.log('reminders as state', reminders);
            return reminders;
        case DELETE_REMINDER:
            reminders = removeById(state, action.id);
            console.log('reminders as state', reminders);
            return reminders;
        case CLEAR_REMINDERS:
            reminders = [];
            return reminders;
        default:
            return state;
    }
};

export default reducer;