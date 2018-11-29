(function($) {
    'use strict';

    $.fn.suspender = function (eventType, action) {
        var $self = $(this);
        var events = $._data($self.get(0), 'events');
        var emptyFunc = function(){};
        if (!$._suspendedEvents) {
            $._suspendedEvents = {};
        }

        if (events && events[eventType]) {
            var listeners = events[eventType];
            $.each(listeners, function(index, event) {
                if (event.type == eventType) {
                    if (action == 'off' && event.handler.toString() != emptyFunc.toString()){
                        $._suspendedEvents['event' + event.guid] = event.handler;
                        console.log(event.handler);
                        event.handler = emptyFunc;
                    } else if (action == 'on' && event.handler.toString() == emptyFunc.toString()){
                        event.handler = $._suspendedEvents['event' + event.guid];
                        console.log(event.handler);
                    }
                }
            });
        }

        return $(this);
    };
})(jQuery);
