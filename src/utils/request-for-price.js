import { fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/operators';


export const addRequestForPrice = (function() {
    const REQUEST_FOR_PRICE_ID = 'request-price';

    const _addToCartAttributes = [
        { key: "role", value: "button" },
        { key: "tabindex", value: "0" },
        { key: "data-dynamic-strings", value: "Request For Price" },
        // { key: "data-collection-id", value: "NEW_COLLECTION_ID" }, // Update with the new collection ID
        // { key: "data-item-id", value: "NEW_ITEM_ID" }, // Update with the new item ID
        // { key: "data-product-type", value: "1" },
        // { key: "data-use-custom-label", value: "false" },
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
        addRequestPriceAction('test', 'test');
    }

    return init();
});
