var domReady = (function () {
    var doc = document, win = window,
        isReady = 0, id, queue = [], fnc,
        add = 'addEventListener', load = 'load',
        event = 'DOMContentLoaded', re = /^.(?!oading)/,
        remove = 'removeEventListener', doScroll = 0,
        handler = function () {
            if(re.test(doc.readyState)) loaded();
        };
    function loaded() {
        clearInterval(id);
        doc[remove](event, handler, false);
        win[remove](load, handler, false);
        ready();
    }
    
    function ready() {
        if(isReady) return;
        if (!!(doc.body)) {
            while ((fnc = queue.shift())) fnc();
            isReady = 1;
        } else setTimeout(ready, 10);
    }
    
    function domReady(callback) {
        if (isReady) callback();
        else queue.push(callback);
        return domReady;
    }
    
    if(!doc[add]) {
        add = 'attachEvent';
        remove = 'detachEvent';
        event = 'onreadystatechange';
        load = 'onload';
        re = /^c/;
        try {
            doScroll = !win.frameElement && doc.documentElement.doScroll;
        } catch (e) {}
    }
    if (re.test(doc.readyState)) ready();
    else {
        doc[add](event, handler, false);
        win[add](load, handler, false);
        if (doScroll)
            id = setInterval(function() {
                try {doScroll('left');loaded();} catch (e){}
            }, 10);
    }
    return domReady;
}());
