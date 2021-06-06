export default function UpdateSearch (state = [], action) {
    switch(action.type) {
        case 'UPDATE_SEARCH':
            return {
                ...state, ...action.payload
            }
        default:
            return state;
    }
}