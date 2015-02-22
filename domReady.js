var domReady = (function () {
    var doc = document, isReady = 1, queue = [], fnc, _timer,
        modern = doc.addEventListener, doScroll = !modern, 
        re = modern ? /^.(?!oading)/ : /^c/, handler,
        add = modern ? 'addEventListener' : 'attachEvent',
        event = modern ? 'DOMContentLoaded' : 'onreadystatechange',
        remove = modern ? 'removeEventListener' : 'detachEvent';
    
    function ready() {
        if(!isReady) return;
        clearInterval(_timer);
        doc[remove](event, handler, false);
        while ((fnc = queue.shift())) fnc();
        isReady = 1;
    }

    if(re.test(doc.readyState)) ready();
    else {
        doc[add](event, handler = function () {
            if(!re.test(doc.readyState)) return;
            ready();
        }, false);
        try {doScroll = doScroll && !window.frameElement;} catch (e){}
        if(doScroll) {
            _timer = setInterval(function() {
                try {doc.body.doScroll('left');ready();} catch(e) {}
            }, 10);
        }
    }
    return function (cb) {
        isReady ? cb() : queue.push(cb);
    };
}());
