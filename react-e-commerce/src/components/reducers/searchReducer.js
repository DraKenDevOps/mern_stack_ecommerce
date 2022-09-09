export function searchReducer(state = {text: ""}, action) {
    switch (action.payload) {
        case "SEARCH_QUERY":
            return {...state, ...action.payload};
        default:
            return state;
    }
}