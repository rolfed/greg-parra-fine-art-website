export const addQueryParamToForm = (function() {

    const _currentUrl = window.location.href;
    const _getQueryParam = (url, param) => {
        const urlObj = new URL(url); // Create a URL object
        return urlObj.searchParams.get(param); // Get the value of the specified query parameter
    }
    console.log('current url', _currentUrl);


    const _createInputField = (id, label, value) => {
        const inputWrapper = document.createElement('div');
        inputWrapper.className = `form-item field ${id}`;
        inputWrapper.innerHTML = `
         <label for="${id}-field" class="title"><span>${label}</span></label>
         <input type="text" id="${id}-field" class="input" value="${value}" disabled>
        `;

        return inputWrapper;
    };

    const _insertInputAfter = (newElement, targetElement) => {
        targetElement.parentNode.parentNode.insertAdjacentElement('afterend', newElement);
    }

    const _addTitleAndSizeInputs = () => {
        // Retrieve title and size values from query parameters
        const title = _getQueryParam(_currentUrl, 't');
        const size = _getQueryParam(_currentUrl, 's');

        // Find the email field to insert the new inputs below it
        const emailField = document.querySelector("#email-yui_3_17_2_1_1555014059115_8408");
        if (emailField) {
            // Create title and size input fields
            const titleInput = _createInputField("title", "Title", title);
            const sizeInput = _createInputField("size", "Size", size);

            // Insert the title and size inputs below the email field
            _insertInputAfter(titleInput, emailField);
            _insertInputAfter(sizeInput, titleInput);
        }
    }

    const init = () => {
        _addTitleAndSizeInputs();
    }

    return init();
});
