var Eventable = require( "dist/eventable" );
var eventable = new Eventable();


eventable.on( "foo", function ( data ) {
    console.log( "foo fired", data );
});


eventable.fire( "foo", {data: "stuff"} );