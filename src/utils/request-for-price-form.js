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

    const listenForButtonClick$ = (_title, _size) => {
        // Attempt to select the button element
        const button = document.querySelector(".form-submit-button");
        const form = button?.closest('form'); // Find the closest form element to the button
        const textarea = document.querySelector("#textarea-yui_3_17_2_1_1555014059115_8410-field");

        const click$ = fromEvent(button, 'click').pipe(
            filter(() => button !== null),
            tap(event => {
                event.preventDefault();
                // Update the textarea
                const initialText = `Product details \rTitle: ${_title}\rSize: ${_size}`;
                textarea.value += `\r\r${initialText}`;

                console.log("Form submission prevented, and textarea updated.");

                // Submit the form programmatically after updates
                form.submit();
            })

        );

        return click$;
    };

    const init = () => {
        listenForButtonClick$(_title, _size).subscribe();
    }

    return init();
});
