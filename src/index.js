import { 
    limitedEditionHandler ,
    defaultHandler,
    openEditionHandler
} from "@handlers";

const PrintVersion = () => {
    console.log(`*** Greg Parra Fine Art *** \n *** Library version: ${LIBRARY_VERSION} ***`);
}

(function() {
    PrintVersion();

    const { fromEvent } = rxjs;
    const { map, startWith, filter } = rxjs.operators;

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
