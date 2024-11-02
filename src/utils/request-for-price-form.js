export const addQueryParamToForm = (function() {

    const _getQueryParam = (url, param) => {
        const urlObj = new URL(url); // Create a URL object
        return urlObj.searchParams.get(param); // Get the value of the specified query parameter
    }
    const _currentUrl = window.location.href;
    const _title = _getQueryParam(_currentUrl, 't');
    const _size = _getQueryParam(_currentUrl, 's');

    const updateTextArea = (title, size) => {
        const textarea = document.querySelector("#textarea-yui_3_17_2_1_1555014059115_8410-field");

        // Check if the textarea exists
        if (textarea) {
            // Format the message to display in the textarea
            const message = `Title: ${_title}\nSize: ${_size}`;

            // Set the message and disable the textarea
            textarea.value = message;
            // textarea.disabled = true;
        }
    }

    const init = () => {
        updateTextArea(_title, _size)
    }

    return init();
});
