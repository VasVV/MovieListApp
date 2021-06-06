

export default function AddRemoveFavs (state = [], action) {
    switch(action.type) {
        case 'ADD_TO_FAVS':
           
            return [...state, action.payload ]
            
        case 'REMOVE_FROM_FAVS':
            return state.filter(element => element.id != action.payload)
        default:
            return state;
    }
}