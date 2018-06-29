import { SHOWLIST, UPDATELISTS } from '_redux/actions/picture'

const pictureState = {
    lists: [],
    show: false
}

function pictureReducer (state= pictureState, action) {
    console.log(state, action)
    switch (action.type) {
    case SHOWLIST:
        return {
            ...state,
            show: action.show
        }
        break
    case UPDATELISTS:
        return {
            ...state,
            lists: action.lists
        }
        break
    default:
        return state
    }
}

export default pictureReducer 

