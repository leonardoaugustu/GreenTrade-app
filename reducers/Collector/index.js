const initialState = {
    selected: {},
    points: 0
};

const collectorReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SELECTED":
            return {
                ...state,
                selected: action.payload,
            };
        default:
            return state;

    }
};

export default collectorReducer;