import { fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/operators';


export const addRequestForPrice = (function() {
    const REQUEST_FOR_PRICE_ID = 'request-price';
    let _canNavigate = false;
    let currentTitle = '';
    let currentSize = '';

    const _addToCartAttributes = [
        { key: "role", value: "button" },
        { key: "tabindex", value: "0" },
        { key: "data-dynamic-strings", value: "Request For Price" },
        { key: "data-original-label", value: "Request Price" },
        { key: "id", value: REQUEST_FOR_PRICE_ID }
    ];

    const _removeAddToCartButton = () => {
        const existingButton = document.querySelector('.sqs-add-to-cart-button');

        if (existingButton) {
            existingButton.remove();
        }
    };

    const _createAddToCartButton = () => {
        const newButton = document.createElement('div');
        newButton.className = "sqs-add-to-cart-button sqs-suppress-edit-mode sqs-button-element--primary";

        _addToCartAttributes.forEach(attr => newButton.setAttribute(attr.key, attr.value));

        const newButtonInner = document.createElement("div");
        newButtonInner.className = "sqs-add-to-cart-button-inner";
        newButtonInner.textContent = "Request Price";

        newButton.append(newButtonInner);

        return newButton;
    };

    const _appendAddToCartButtonToWrapper = (button) => {
        const buttonWrapper = document.querySelector(".sqs-add-to-cart-button-wrapper");
        if (buttonWrapper) {
            buttonWrapper.append(button);
        }
    }

    const _getTitle = () => {
        const el = document.querySelector('.ProductItem-details-title')
        const text = el.textContent.trim() || '';
        return encodeURIComponent(text);
    };

    const _setCanNavigate = (isValid) => {
        _canNavigate = isValid;
    }

    const _getSize = () => {
        // Select the main product variants container
        const productVariantsElement = document.querySelector(".product-variants");

        // Check if the product variants element exists
        if (!productVariantsElement) {
            console.warn("Product variants element not found.");
            _setCanNavigate(false);
            return null;
        }

        // Retrieve the JSON data from the data-selected-variant attribute
        const selectedVariantData = productVariantsElement.getAttribute("data-selected-variant");
        if (!selectedVariantData) {
            console.warn("No selected variant data found.");
            _setCanNavigate(false);
            return null;
        }

        // Parse the JSON data
        const selectedVariant = JSON.parse(selectedVariantData);

        // Extract relevant details (e.g., size and SKU)
        const size = selectedVariant.attributes.Size;

        // Format for query parameter
        const sizeParam = encodeURIComponent(size);
        _setCanNavigate(true);

        return `size=${sizeParam}`;
    }

    const addRequestPriceButton = () => {
        _removeAddToCartButton();
        const newButton = _createAddToCartButton();
        _appendAddToCartButtonToWrapper(newButton);
    }

    const addRequestPriceAction = (title, size) => {
        // Update the title and size variables each time the function is called
        currentTitle = title;
        currentSize = size;
    };

    // Function to initialize the button click listener
    const _initializeRequestPriceButton = () => {
        const button = document.getElementById(REQUEST_FOR_PRICE_ID);

        if (!button) {
            console.warn(`Button with ID ${REQUEST_FOR_PRICE_ID} not found.`);
            return;
        }

        const click$ = fromEvent(button, 'click').pipe(
            tap(() => console.log('click before')),
            filter(() => !!button && _canNavigate),
            tap(() => {
                console.log('click: ')
                const title = _getTitle();
                const size = _getSize();
                addRequestPriceAction(title, size);
                // Navigate to /inquire URL on button click
                window.location.href = `/inquire?t=${encodeURIComponent(currentTitle)}&s=${encodeURIComponent(currentSize)}`;
            })
        );


        click$.subscribe();
    };

    // Call initializeRequestPriceButton once to set up the event listener
    _initializeRequestPriceButton();

    const init = () => {
        addRequestPriceButton();
    };

    return init();
});
