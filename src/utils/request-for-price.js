import { fromEvent } from 'rxjs';


export const addRequestForPrice = (function() {
    const _addToCartAttributes = [
        { key: "role", value: "button" },
        { key: "tabindex", value: "0" },
        { key: "data-dynamic-strings", value: "" },
        { key: "data-collection-id", value: "NEW_COLLECTION_ID" }, // Update with the new collection ID
        { key: "data-item-id", value: "NEW_ITEM_ID" }, // Update with the new item ID
        { key: "data-product-type", value: "1" },
        { key: "data-use-custom-label", value: "false" },
        { key: "data-original-label", value: "Request Price" },
        { key: "id", value: "new-button-id" }
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

        _addToCartAttributes.forEach(attr => newButton.setAttributes(attr.key, attr.value));


        return newButton;
    };

    const _createAddToCartButtonInnerDiv = (newButton) => {
        // Create inner text div
        const newButtonInner = document.createElement("div");
        newButtonInner.className = "sqs-add-to-cart-button-inner";
        newButtonInner.textContent = "Request Price";

        // Append the inner div to the new button
        newButton.appendChild(newButtonInner);

        // Insert the new button into the DOM (update the parent element as needed)
        document.body.appendChild(newButton); // Change to tar
    }

    const addRequestPriceButton = () => {
         _removeAddToCartButton();
        const newButton = _createAddToCartButton();
        _createAddToCartButtonInnerDiv(newButton);
    }

    const addRequestPriceAction = () => {
        const button = document.getElementById('request-price');
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
