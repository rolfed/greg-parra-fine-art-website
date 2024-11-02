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

    const listenForButtonHover$ = (_title, _size) => {
        const button = document.querySelector(".form-submit-button");
        const textarea = document.querySelector("#textarea-yui_3_17_2_1_1555014059115_8410-field");

        // Flag to prevent multiple appends
        let isTextAppended = false;

        if (!button || !textarea) {
            console.warn("Button or textarea not found.");
            return of(null); // Emit null if button or textarea is not found
        }

        const initialText = `Product details \rTitle: ${_title}\rSize: ${_size}`;

        const hover$ = fromEvent(button, 'mouseenter').pipe(
            filter(() => button !== null && (!isTextAppended || textarea.value !== initialText)),
            tap(() => {
                // Append text to the textarea only once
                textarea.value += `\r\r${initialText}`;

                // Set the flag to true to prevent further appends
                isTextAppended = true && textarea.value != initialText;
            })
        );

        return hover$;
    };

    const init = () => {
        listenForButtonHover$(_title, _size).subscribe();
    }

    return init();
});
