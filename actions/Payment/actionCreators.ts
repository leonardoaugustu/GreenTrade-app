import {PURCHASE_TOTAL} from './actionTypes';

const purchaseTotal = (price: number) => ({
    type: PURCHASE_TOTAL,
    payload: price,
});

export {purchaseTotal} 