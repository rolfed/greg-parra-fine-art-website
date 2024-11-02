export const addQueryParamToForm = (function() {

    const _getQueryParam = (url, param) => {
        const urlObj = new URL(url); // Create a URL object
        return urlObj.searchParams.get(param); // Get the value of the specified query parameter
    }
    const _currentUrl = window.location.href;
    const _title = _getQueryParam(_currentUrl, 't');
    const _size = _getQueryParam(_currentUrl, 's');

    const updateTextArea = () => {
        // Find the textarea element
        const textarea = document.querySelector("#textarea-yui_3_17_2_1_1555014059115_8410-field");

        if (textarea) {
            console.log('found textarea', textarea);

            // Set the initial value in the textarea

            // Add an event listener to remove focus when the textarea gains focus
            textarea.addEventListener("focus", () => {
                console.log('leave focus');
                // textarea.blur(); // Immediately removes focus from the textarea
                const initialText = `Product details \rTitle: ${_title}\rSize: ${_size}`;
                textarea.value += `\r\r${initialText}`;
            });
        }
    }

    const init = () => {
        updateTextArea(_title, _size)
    }

    return init();
});
