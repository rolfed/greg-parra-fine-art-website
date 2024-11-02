import { 
    limitedEditionHandler ,
    defaultHandler,
    inquirePriceHandler,
    openEditionHandler
} from "@handlers";

import { fromEvent } from 'rxjs';
import { map, startWith, distinctUntilChanged, concatMap } from 'rxjs/operators'

const PrintVersion = () => {
    console.log(`*** Greg Parra Fine Art *** \r *** Library version: ${LIBRARY_VERSION} ***`);
}

(function() {
    PrintVersion();

    /** Handlers Map **/
    const urlHandlers = {
        '/limited-edition': limitedEditionHandler,
        '/open-edition': openEditionHandler,
        '/inquire': inquirePriceHandler,
        'default': defaultHandler,
    };

    const executeBasedOnUrl = (url, handlers) => {
        const matchedHandler = Object.keys(handlers).find(key => url.includes(key));
        const handler = matchedHandler ? handlers[matchedHandler] : handlers['default'];
        handler();
    };

    const pageLoad$ = fromEvent(window, 'load');

    const _getCurrentUrl = () => {
        return window.location.href;
    };

    const _urlChange$ = fromEvent(window, 'popstate').pipe(
        startWith(_getCurrentUrl()),
        map(() => _getCurrentUrl()),
        distinctUntilChanged()
    );

    pageLoad$.pipe(
        concatMap(() => _urlChange$)
    ).subscribe(url => {
        executeBasedOnUrl(url);
    });

    // INIT
    executeBasedOnUrl(_getCurrentUrl(), urlHandlers);
})();
