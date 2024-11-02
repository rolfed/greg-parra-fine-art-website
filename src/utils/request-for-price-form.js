import { fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

export const addQueryParamToForm = (function() {

    const _getQueryParam = (url, param) => {
        const urlObj = new URL(url); // Create a URL object
        return urlObj.searchParams.get(param); // Get the value of the specified query parameter
    }
    const _currentUrl = window.location.href;
    const _title = _getQueryParam(_currentUrl, 't');
    const _size = _getQueryParam(_currentUrl, 's');

    const listenForButtonFocus$ = (_title, _size) => {
        // Attempt to select the button element
        const button = document.querySelector(".form-submit-button");
        const textarea = document.querySelector("#textarea-yui_3_17_2_1_1555014059115_8410-field");

        const click$ = fromEvent(button, 'mouseover').pipe(
            filter(() => button !== null),
            tap(event => {
                console.log('Event: ', event);
                // Update the textarea
                const initialText = `Product details \rTitle: ${_title}\rSize: ${_size}`;
                textarea.value += `\r\r${initialText}`;
                console.log("Form submission prevented, and textarea updated.");
            })

        );

        return click$;
    };

    const init = () => {
        listenForButtonFocus$(_title, _size).subscribe();
    }

    return init();
});
