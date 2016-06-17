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
    /**
     *
     * @description Event manager
     * @constructor Eventable
     * @memberof! <global>
     *
     */
    var Eventable = function() {
        return this.init.apply( this, arguments );
    }

    Eventable.prototype = {
        constructor: Eventable,
        
        /**
         *
         * @description Eventable constructor method
         * @memberof Eventable
         * @method Eventable.init
         *
         */
        init: function() {
            /**
             *
             * @description Eventable unique ID
             * @memberof Eventable
             * @member _uid
             * @private
             *
             */
            this._uid = 0;
            
            /**
             *
             * @description Eventable event handlers object
             * @memberof Eventable
             * @member _handlers
             * @private
             *
             */
            this._handlers = {};
        },
        
        /**
         *
         * @description Get a unique ID
         * @memberof Controller
         * @method getUID
         * @returns number
         *
         */
        _getUID: function() {
            return this.uid += 1;
        },

        /**
         *
         * @description Eventable remove event handler
         * @memberof Eventable
         * @method off
         * @param {string} event the event to remove handler for
         * @param {function} handler the handler to remove
         *
         */
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

        /**
         *
         * @description Eventable add event handler
         * @memberof Eventable
         * @method on
         * @param {string} event the event to listen for
         * @param {function} handler the handler to call
         *
         */
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

        /**
         *
         * @description Eventable fire an event
         * @memberof Eventable
         * @method fire
         * @param {string} event the event to fire
         *
         */
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
        
        /**
         *
         * @description Eventable internal off method assumes event AND handler are good
         * @memberof Eventable
         * @method _off
         * @param {string} event the event to remove handler for
         * @param {function} handler the handler to remove
         * @private
         *
         */
        _off: function(event, handler) {
            for (var i = 0; i < this._handlers[event].length; i++) {
                if (handler._eventId === this._handlers[event][i]._eventId) {
                    this._handlers[event].splice(i, 1);
                    
                    break;
                }
            }
        },
        
        /**
         *
         * @description Eventable completely remove all handlers and an event type
         * @memberof Eventable
         * @method _offed
         * @param {string} event the event to remove handler for
         * @private
         *
         */
        _offAll: function(event) {
            for (var i = this._handlers[event].length; i--;) {
                this._handlers[event][i] = null;
            }
            
            delete this._handlers[event];
        }
    };
    
    return Eventable;
});
