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
            const initialText = `Title: ${_title}\nSize: ${_size}`;
            textarea.value = initialText;

            // Set up a MutationObserver to monitor changes to the textarea
            const observer = new MutationObserver((mutations) => {
                console.log(mutations);
                mutations.forEach((mutation) => {
                    if (mutation.type === "attributes" && mutation.attributeName === "value") {
                        // If the value gets cleared, reset it
                        if (!textarea.value) {
                            textarea.value = initialText;
                        }
                    }
                });
            });

            // Start observing the textarea for attribute changes
            observer.observe(textarea, { attributes: true, childList: true, subtree: true });
        }
    }

    const init = () => {
        updateTextArea(_title, _size)
    }

    return init();
});
