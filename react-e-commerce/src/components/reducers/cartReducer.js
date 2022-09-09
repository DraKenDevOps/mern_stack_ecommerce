let initialState = []

if(typeof window !== 'undefined') {
    if(localStorage.getItem('cart')){
        initialState = JSON.stringify(localStorage.getItem('cart'))
    } else {
        initialState = []
    }
}

export function cartReducer(state=null, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return action.payload;
        default:
            return state;
    }
}