/*!
 *
 * Arbitrary Event delegation and handler.
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
          this._uid = 0;
        },
        
        fire: function() {
            
        },
        
        on: function() {
            return console.log('on');
        },
        
        off: function() {
            return console.log('off');
        }
    };
    
    return Eventable;
});
