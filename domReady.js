var domReady = (function () {
    var doc = document, isReady = 0, queue = [], fnc, fn,
        _timer, modern = doc.addEventListener, doScroll = 0,
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
        try {doScroll = !window.frameElement && doc.documentElement.doScroll;} catch (e){}
        if(doScroll) {
            _timer = setInterval(function() {
                try {doc.body.doScroll('up');ready();} catch(e) {}
            }, 10);
        }
        doc[add](event, fn = function () {
            if(re.test(doc.readyState)) {
                doc[remove](event, fn, false);
                ready();    
            }
        }, false);
    }
    return function (cb) {
        isReady ? cb() : queue.push(cb);
    };
}());
