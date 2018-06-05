import {
    SETFIELDMESSAGE, SHOWFIELDMESSAGE, STARTFIELDMESSAGE,
    setFieldMessage, showFieldMessage } from '_redux/actions/fieldMessage'

const fieldMessageState = {
    message: {},
    start: false,
    show: false
}
const fieldReducer = function(state = fieldMessageState, action) {
    switch (action.type) {
    case SETFIELDMESSAGE:
        return {
            ...state,
            message: action.message
        }
    case STARTFIELDMESSAGE:
        return {
            ...state,
            start: action.start
        }
    case SHOWFIELDMESSAGE:
        console.log(state, action)
        return {
            ...state,
            show: action.show
        }
    default:
        return state
    }
}
export default fieldReducer