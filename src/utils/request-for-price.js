import { fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/operators';


export const addRequestForPrice = (function() {
    const REQUEST_FOR_PRICE_ID = 'request-price';

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

    const _getSize = () => {
        // Select the main product variants container
        const productVariantsElement = document.querySelector(".product-variants");

        // Check if the product variants element exists
        if (!productVariantsElement) {
            console.warn("Product variants element not found.");
            return null;
        }

        // Retrieve the JSON data from the data-selected-variant attribute
        const selectedVariantData = productVariantsElement.getAttribute("data-selected-variant");
        if (!selectedVariantData) {
            console.warn("No selected variant data found.");
            return null;
        }

        // Parse the JSON data
        const selectedVariant = JSON.parse(selectedVariantData);

        // Extract relevant details (e.g., size and SKU)
        const size = selectedVariant.attributes.Size;
        const sku = selectedVariant.sku;

        // Format for query parameter
        const sizeParam = encodeURIComponent(size);
        const skuParam = encodeURIComponent(sku);

        return `size=${sizeParam}&sku=${skuParam}`;
    }

    const addRequestPriceButton = () => {
        _removeAddToCartButton();
        const newButton = _createAddToCartButton();
        _appendAddToCartButtonToWrapper(newButton);
    }

    const addRequestPriceAction = (title, size) => {
        const button = document.getElementById(REQUEST_FOR_PRICE_ID);

        if (!button) {
            console.warn(`Button with ID ${REQUEST_FOR_PRICE_ID} not found.`);
            return;
        }

        const click$ = fromEvent(button, 'click').pipe(
            filter(() => !!button),
            tap(() => {
                // Navigate to /inquire URL on button click
                window.location.href = `/inquire?t=${title}&s=${size}`;
            })
        );

        click$.subscribe();
    }

    const init = () => {
        addRequestPriceButton();
        const title = _getTitle();
        const size = _getSize();
        addRequestPriceAction(title, size);
    }

    return init();
});
