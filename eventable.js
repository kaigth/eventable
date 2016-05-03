/*!
 *
 * Arbitrary Event delegation and callback handler.
 * 
 * @author James Smith (kaigth)
 * 
 */ 
(function( factory ) {
    if ( typeof exports === "object" && module !== undefined ) {
        module.exports = factory();
    } else if ( typeof window !== undefined ) {
        window.Eventable = factory();
    }
})(function() {
    var Eventable = function() {
        return this.init.apply( this, arguments );
    }

    Eventable.prototype = {
        constructor: Eventable,
        init: function() {
            /*
            * Unique ID for each handler.
            */
            this._uid = 0;

            /*
            * Object to hold handler.
            */
            this._handlers = {};
        },

        _getUID: function() {
            return this.uid += 1;
        },
        
        off: function(event, handler) {
            if (!this._handlers[event]) {
                return this;
            }
            
            if (handler) {
                this._off(event, handler);
            } else {
                this._offAll(event);
            }
            
            return this;
        },

        on: function(event, handler) {
            var events = event.split(' ');

            handler._eventId = this._getUID;

            for (var i = events.length; i--; ) {
            if (typeof handler === 'function') {
                if (!this._handlers[events[i]]) {
                    this._handlers[events[i]] = [];
                }

                this._handlers[events[i]].push(handler);
            }
            };

            return this;
        },

        fire: function(event) {
            if (!this._handlers[event]) {
                return this;
            }
            
            args = [].slice.call( arguments, 1 );
            
            for (var i = this._handlers[event].length; i--;) {
                this._handlers[event][i].apply(this, args);
            }
            
            return this;
        },
        
        _off: function(event, handler) {
            for (var i = 0; i < this._handlers[event].length; i++) {
                if (handler._eventId === this._handlers[event][i]._eventId) {
                    this._handlers[event].splice(i, 1);
                    
                    break;
                }
            }
        },
        
        _offAll: function(event) {
            for (var i = this._handlers[event].length; i--;) {
                this._handlers[event][i] = null;
            }
            
            delete this._handlers[event];
        }
    };
    
    return Eventable;
});
