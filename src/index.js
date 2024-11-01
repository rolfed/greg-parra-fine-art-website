import { limitedEditionHandler } from "@handlers";

(function() {
    console.log(`Library version: ${LIBRARY_VERSION}`);

    const { fromEvent } = rxjs;
    const { map, startWith, filter } = rxjs.operators;

    /** Shared Utilities **/

    const getElement = (selector) => {
        const element = document.querySelector(selector);
        console.log('got ', element);
        return element;
    };

    const removeElement = (element) => {
        if (element) {
            element.remove();
        }
    };


    /** Handlers **/
    /** Limited Handler **/
    const addRequestPriceButton = () => {
        const addToCartButton = getElement('.sqs-add-to-cart-button');
        removeElement(addToCartButton)
        console.warn('Remove add to cart');

        const buttonWrapper = getElement('.sqs-add-to-cart-button-wrapper');

        // Create a new button element with the same class and role attributes
        const newButton = document.createElement('div');
        newButton.className = addToCartButton.className;
        newButton.setAttribute('role', 'button');
        newButton.setAttribute('id', 'request-price');

        // Create inner div to hold the text and set the new button's text
        const innerDiv = document.createElement('div');
        innerDiv.className = 'sqs-add-to-cart-button-inner';
        innerDiv.textContent = "Request for Price";

        // Append the inner div to the new button
        newButton.appendChild(innerDiv);
        buttonWrapper.appendChild(newButton);
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

    const openEditionHandler = () => {
        console.log('*** open handler ***');
        addRequestPriceButton();
        addRequestPriceAction();

    };

    const defaultHandler = () => {
        console.log('*** defaul handler ***');

    };

    /** Handlers Map **/
    const urlHandlers = {
        '/limited-edition': limitedEditionHandler,
        '/open-edition': openEditionHandler,
        'default': defaultHandler,
    };

    const executeBasedOnUrl = (url, handlers) => {
        const matchedHandler = Object.keys(handlers).find(key => url.includes(key));

        if (matchedHandler) {
            const handler = handlers[matchedHandler];
            handler();
        } else {
            urlHandlers['default']();
        }
    };

    const _getCurrentUrl = () => {
        return window.location.href;
    };

    const urlChange$$ = fromEvent(window, 'popstate').pipe(
        startWith(_getCurrentUrl()),
        map(() => _getCurrentUrl())

    );

    urlChange$$.subscribe(url => {
        executeBasedOnUrl(url);
    });

    // INIT
    executeBasedOnUrl(_getCurrentUrl(), urlHandlers);
})();
