# eventable
####v0.0.1
An arbitrary event and callback handler.  Events fire and listen globally but can be managed through a teardown process.

####Methods:
    fire
    on
    off
  
Instantiate a new `global` instance of `Eventable`.
```
var eventable = new Eventable();
```  

####fire Method
Fire / delegate an event along with data to pass as a callback.

```
var awesomeObject = {
  'cool': 'stuff'
};

eventable.fire('superAwesomeFunTime', awesomeObject);
```

####on Method
Listen for an event that has or will be fired.

```
eventable.on('superAwesomeFunTime', function(data) {
  return data; // Returns awesomeObject from the fire above.
};
```

####off Method
Completely remove the handler and its event.  Each handler is uniquely identified by a number.

```
eventable.off('superAwesomeFunTime');
```
