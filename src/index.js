import { 
    limitedEditionHandler ,
    defaultHandler,
    openEditionHandler
} from "@handlers";

import {
    fromEvent,
} from 'rxjs';

import {
map,
startWith,
} from 'rxjs/operators'

const PrintVersion = () => {
    console.log(`*** Greg Parra Fine Art *** \r *** Library version: ${LIBRARY_VERSION} ***`);
}

(function() {
    PrintVersion();

    /** Handlers Map **/
    const urlHandlers = {
        '/limited-edition': limitedEditionHandler,
        // '/open-edition': openEditionHandler,
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
