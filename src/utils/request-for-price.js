import { fromEvent } from 'rxjs';


export const addRequestForPrice = (function() {
    const REQUEST_FOR_PRICE_ID = 'request-price';

    const _addToCartAttributes = [
        { key: "role", value: "button" },
        { key: "tabindex", value: "0" },
        { key: "data-dynamic-strings", value: "Request For Price" },
        { key: "data-collection-id", value: "NEW_COLLECTION_ID" }, // Update with the new collection ID
        { key: "data-item-id", value: "NEW_ITEM_ID" }, // Update with the new item ID
        { key: "data-product-type", value: "1" },
        { key: "data-use-custom-label", value: "false" },
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

        return newButton;
    };

    const _createAddToCartButtonInnerDiv = (newButton) => {
        const newButtonInner = document.createElement("div");
        newButtonInner.className = "sqs-add-to-cart-button-inner";
        newButtonInner.textContent = "Request Price";

        return newButtonInner;
    }

    const _appendAddToCartButtonToWrapper = (button) => {
        const buttonWrapper = document.querySelector(".sqs-add-to-cart-button-wrapper");
        if (buttonWrapper) {
            buttonWrapper.append(button);
        }
    }

    const addRequestPriceButton = () => {
        _removeAddToCartButton();
        const newButton = _createAddToCartButton();
        const addToCartButton = _createAddToCartButtonInnerDiv(newButton);
        _appendAddToCartButtonToWrapper(addToCartButton);
    }

    const addRequestPriceAction = () => {
        const button = document.getElementById(REQUEST_FOR_PRICE_ID);
        console.log('Button ', button);
        const click$ = fromEvent(button, 'click').pipe(
            filter(() => !!button),
            tap(() => console.log('Request Price clicked')),
        );

        click$.subscribe();
    }

    const init = () => {
        addRequestPriceButton();
        addRequestPriceAction();
    }

    return init();
});
