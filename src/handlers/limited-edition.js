import { addRequestForPrice } from '@utils'

export const limitedEditionHandler = () => {
    console.log('*** limited handler ***');

    addRequestForPrice().init();
};
