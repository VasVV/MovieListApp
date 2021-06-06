export default function CurrMovie (state = '', action) {
    switch(action.type) {
        case 'CURR_MOVIE':
            return action.payload
        default:
            return state;
    }
}