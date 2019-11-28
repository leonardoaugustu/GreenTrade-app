import {PURCHASE_TOTAL} from '../../actions/Payment/actionTypes';
const initialState = {
    price: 0.00,
};

const purchaseTotalReducer = (state = initialState, action) => {
    switch (action.type) {
        case PURCHASE_TOTAL:
            return {
                ...state,
                price: action.payload
            };
        default:
            return state;

    }
};

export default purchaseTotalReducer;