export const addQueryParamToForm = (function () {
    const _currentUrl = window.location.href;

    // Helper function to retrieve query parameters
    const _getQueryParam = (url, param) => {
        const urlObj = new URL(url);
        return urlObj.searchParams.get(param);
    };

    // Function to create an input field with a label
    const _createInputField = (id, label, value) => {
        const inputWrapper = document.createElement("div");
        inputWrapper.className = `form-item field ${id}-field`;
        inputWrapper.innerHTML = `
            <label for="${id}-field" class="title"><span>${label}</span></label>
            <input type="text" id="${id}-field" class="input" value="${value}" disabled>
        `;
        return inputWrapper;
    };

    // Function to insert a new element after a target element within the form structure
    const _insertInputAfter = (newElement, targetElement) => {
        targetElement.parentNode.insertAdjacentElement("afterend", newElement);
    };

    // Main function to add title and size inputs below the email field
    const _addTitleAndSizeInputs = () => {
        // Retrieve title and size values from query parameters
        const title = _getQueryParam(_currentUrl, "t") || "No title available";
        const size = _getQueryParam(_currentUrl, "s") || "No size available";

        // Find the email field to insert the new inputs below it
        const emailField = document.querySelector("#email-yui_3_17_2_1_1555014059115_8408-field");
        if (emailField) {
            // Create title and size input fields
            const titleInput = _createInputField("title", "Title", title);
            const sizeInput = _createInputField("size", "Size", size);

            // Insert the title and size inputs directly after the email field
            _insertInputAfter(titleInput, emailField.parentNode);
            _insertInputAfter(sizeInput, titleInput);
        }
    };

    // Public init function to trigger adding inputs
    const init = () => {
        _addTitleAndSizeInputs();
    };

    return  init(); // Return init as a callable function
});
