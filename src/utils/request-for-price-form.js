import { fromEvent, of } from 'rxjs';
import { filter, take, switchMap } from 'rxjs/operators';

export const addQueryParamToForm = (function() {

    const _getQueryParam = (url, param) => {
        const urlObj = new URL(url); // Create a URL object
        return urlObj.searchParams.get(param); // Get the value of the specified query parameter
    }
    const _currentUrl = window.location.href;
    const _title = _getQueryParam(_currentUrl, 't');
    const _size = _getQueryParam(_currentUrl, 's');

    const listenForButtonClick$ = () => {
        // Attempt to select the button element
        const button = document.querySelector(".form-submit-button");

        // Create an observable for the button click, or a null observable if the button doesn’t exist
        const click$ = button
            ? fromEvent(button, 'click')
            : of(null); // Emits null if button is not found

        return click$.pipe(
            // Use filter to ignore null emissions (when button is not found)
            filter(event => event !== null),
            take(1),
            tap(() => console.log('Form button submitted'))
        );
    };

    const updateTextArea$ = (_title, _size) => {
        // Attempt to select the textarea element
        const textarea = document.querySelector("#textarea-yui_3_17_2_1_1555014059115_8410-field");

        // If the textarea exists, create an observable, otherwise emit null
        const textArea$ = textarea
            ? of(textarea)
            : of(null);

        return textArea$.pipe(
            // Filter out null emissions if the textarea doesn't exist
            filter(textarea => textarea !== null),
            // Append text to the textarea
            tap(textarea => {
                const initialText = `Product details \rTitle: ${_title}\rSize: ${_size}`;
                textarea.value += `\r\r${initialText}`;
            }),
            take(1)
        );
    };

    const init = () => {
        listenForButtonClick$(_title, _size).pipe(
            switchMap(() => updateTextArea$)
        ).subscribe();
    }

    return init();
});
