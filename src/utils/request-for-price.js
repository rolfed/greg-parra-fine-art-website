// import { getElement, removeElement } from '@utils';

import { fromEvent } from 'rxjs';


const _updateAddToCartButtonText = (el) => {
 if (el && el.textContent.trim() === "Add To Cart") {
      buttonText.textContent = "Request Price";
  }
}

export const addRequestPriceButton = () => {
    console.log('Add request price button');

    const buttonText = document.querySelector('.sqs-add-to-cart-button-inner');
    _updateAddToCartButtonText(buttonText);

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

