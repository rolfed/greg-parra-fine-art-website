import { getElement, removeElement } from '@utils';

export const addRequestPriceButton = () => {
    const addToCartButton = getElement('.sqs-add-to-cart-button');
    removeElement(addToCartButton)
    console.warn('Remove add to cart');

    const buttonWrapper = getElement('.sqs-add-to-cart-button-wrapper');
    console.log('Button', buttonWrapper);

    // Create a new button element with the same class and role attributes
    // const newButton = document.createElement('div');
    // newButton.className = addToCartButton.className;
    // newButton.setAttribute('role', 'button');
    // newButton.setAttribute('id', 'request-price');

    // Create inner div to hold the text and set the new button's text
    // const innerDiv = document.createElement('div');
    // innerDiv.className = 'sqs-add-to-cart-button-inner';
    // innerDiv.textContent = "Request for Price";

    // Append the inner div to the new button
    // newButton.appendChild(innerDiv);
    // buttonWrapper.appendChild(newButton);
}

export const addRequestPriceAction = () => {
    const button = document.getElementById('request-price');
    console.log('Button ', button);
    const click$ = fromEvent(button, 'click').pipe(
        filter(() => !!button),
        tap(() => console.log('Request Price clicked')),
    );

    click$.subscribe();
}

