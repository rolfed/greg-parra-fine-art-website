import { fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

export const addRequestForPrice = (function () {
    const REQUEST_FOR_PRICE_ID = 'request-price';
    let _canNavigate = false;
    let currentTitle = '';
    let currentSize = '';
    let subscription; // To store RxJS subscription for clean-up

    const _addToCartAttributes = [
        { key: "role", value: "button" },
        { key: "tabindex", value: "0" },
        { key: "data-dynamic-strings", value: "Request For Price" },
        { key: "data-original-label", value: "Request Price" },
        { key: "id", value: REQUEST_FOR_PRICE_ID }
    ];

    const _removeAddToCartButton = () => {
        const existingButton = document.querySelector(`#${REQUEST_FOR_PRICE_ID}`);
        if (existingButton) existingButton.remove();
    };

    const _createAddToCartButton = () => {
        const newButton = document.createElement('div');
        newButton.className = "sqs-add-to-cart-button sqs-suppress-edit-mode sqs-button-element--primary";
        _addToCartAttributes.forEach(attr => newButton.setAttribute(attr.key, attr.value));
        
        const newButtonInner = document.createElement("div");
        newButtonInner.className = "sqs-add-to-cart-button-inner";
        newButtonInner.textContent = "Request Price";
        newButton.appendChild(newButtonInner);
        
        return newButton;
    };

    const _appendAddToCartButtonToWrapper = (button) => {
        const buttonWrapper = document.querySelector(".sqs-add-to-cart-button-wrapper");
        if (buttonWrapper) buttonWrapper.appendChild(button);
    };

    const _getTitle = () => {
        const el = document.querySelector('.ProductItem-details-title');
        return el ? encodeURIComponent(el.textContent.trim()) : '';
    };

    const _setCanNavigate = (isValid) => { _canNavigate = isValid; };

    const _getSize = () => {
        const productVariantsElement = document.querySelector(".product-variants");
        if (!productVariantsElement) {
            _setCanNavigate(false);
            return null;
        }

        const selectedVariantData = productVariantsElement.getAttribute("data-selected-variant");
        if (!selectedVariantData) {
            _setCanNavigate(false);
            return null;
        }

        const selectedVariant = JSON.parse(selectedVariantData);
        const size = selectedVariant?.attributes?.Size || '';
        _setCanNavigate(true);
        return encodeURIComponent(size);
    };

    const addRequestPriceButton = () => {
        _removeAddToCartButton();
        const newButton = _createAddToCartButton();
        _appendAddToCartButtonToWrapper(newButton);
        _initializeRequestPriceButton();
    };

    const _navigateToInquire = () => {
        window.location.href = `/inquire?t=${currentTitle}&s=${currentSize}`;
    };

    const _initializeRequestPriceButton = () => {
        const button = document.getElementById(REQUEST_FOR_PRICE_ID);
        if (!button) {
            console.warn(`Button with ID ${REQUEST_FOR_PRICE_ID} not found.`);
            return;
        }

        if (subscription) {
            subscription.unsubscribe(); // Unsubscribe previous subscription to avoid memory leaks
        }

        subscription = fromEvent(button, 'click').pipe(
            tap(() => {
                currentTitle = _getTitle();
                currentSize = _getSize();
            }),
            filter(() => _canNavigate),
            tap(() => _navigateToInquire())
        ).subscribe();
    };

    const init = () => {
        addRequestPriceButton();
    };

    return init();
});

