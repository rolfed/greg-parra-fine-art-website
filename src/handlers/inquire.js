import { addQueryParamToForm } from '@utils'
import { fromEvent } from 'rxjs';
import { delay, take } from 'rxjs/operators';

export const inquirePriceHandler = () => {
    console.log('*** inquire handler ***');

    // Maybe this should be a shared func
    fromEvent(document, 'DOMContentLoaded')
        .pipe(
            delay(1000),
            take(1)
        ) // Ensure it only fires once
        .subscribe(() => {
                addQueryParamToForm();
        });
};
