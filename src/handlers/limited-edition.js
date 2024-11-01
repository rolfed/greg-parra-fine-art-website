import { requestForPrice } from '@utils'

export const limitedEditionHandler = () => {
    console.log('*** limited handler ***');
    requestForPrice();
};
