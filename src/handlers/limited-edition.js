import { addRequestPriceButton, addRequestPriceAction } from '@utils'

export const limitedEditionHandler = () => {
    console.log('*** limited handler ***');
    addRequestPriceButton();
    addRequestPriceAction();
};
