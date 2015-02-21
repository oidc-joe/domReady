var domReady = (function (win, doc) {
    var isReady = 0, queue = [], fnc, fn, _timer,
        modern = doc.addEventListener, doScroll = !modern, 
        re = modern ? /^.(?!oading)/ : /^c/,
        add = modern ? 'addEventListener' : 'attachEvent',
        event = modern ? 'DOMContentLoaded' : 'onreadystatechange',
        remove = modern ? 'removeEventListener' : 'detachEvent';
    
    function ready() {
        if(isReady) return;
        clearInterval(_timer);
        while ((fnc = queue.shift())) fnc();
        isReady = 1;
    }

    if(re.test(doc.readyState)) ready();
    else {
        doc[add](event, fn = function () {
            if(!re.test(doc.readyState)) return;
            doc[remove](event, fn, false);
            ready();
        }, false);
        try {doScroll = doScroll && !win.frameElement && doc.documentElement.doScroll;} catch (e){}
        if(doScroll) {
            _timer = setInterval(function() {
                try {doc.body.doScroll('up');ready();} catch(e) {}
            }, 10);
        }
    }
    return function (cb) {
        isReady ? cb() : queue.push(cb);
    };
}(window, document));
