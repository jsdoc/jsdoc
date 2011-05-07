# JS-Signals Changelog #

## v0.6.1 (2011/05/03) ##

 - added NPM package.json and CommmonJS wrapper for NPM distribution. (thanks @tomyan)


## v0.6 (2011/04/09) ##

### API changes ###

 - Added:
   - `Signal.active`
   - `SignalBinding.active`

 - Removed:
   - `Signal.protytpe.enable()`
   - `Signal.protytpe.disable()`
   - `Signal.protytpe.isEnabled()`
   - `SignalBinding.protytpe.enable()`
   - `SignalBinding.protytpe.disable()`
   - `SignalBinding.protytpe.isEnabled()`

### Other ###

 - created AMD wrapped version.
 - switched from "module pattern" to a closure with a global export.
  


## v0.5.3 (2011/02/21) ##

### API changes ###

 - added priority parameter to `add` and `addOnce`.

### Other ###

 - improved code structure.



## v0.5.2 (2011/02/18) ##

### Other ###

 - changed to a module pattern. 
 - added YUI test coverage.
 - improved build and src files structure.
 - simplified `remove`, `removeAll`, `add`.
 - improved error messages.



## v0.5.1 (2011/01/30) ##

### API changes ###

 - made `SignalBinding` constructor private. (issue #15)
 - changed params order on `SignalBinding` constructor.
 - removed `signals.isDef()`. (issue #14)
 
### Other ###

 - added JSLint to the build process. (issue #12)
 - validated source code using JSLint. (issue #13)
 - improved docs.



## v0.5 (2010/12/03) ##

### API changes ###

 - Added:
   - `SignalBinding.prototype.getListener()` (issue #3)
   - `Signal.prototype.dispose()` (issue #6)
   - `signals.VERSION`
   - `signals.isDef()`

 - Removed:
   - `SignalBinding.listener` (issue #3)

 - Renamed:
   - `SignalBinding.listenerScope` -> `SignalBinding.context` (issue #4)

### Fixes ###

 - Removed unnecessary function names (issue #5)
 - Improved `remove()`, `removeAll()` to dispose binding (issue #10)

### Test Changes ###

 - Added different HTML files to test dev/dist/min files. 
 - Updated test cases to match new API.
 
### Other ###

 - Improved source code comments and documentation.
 - Small refactoring for better organization and DRY. 
 - Added error messages for required params.
 - Removed unnecessary info from `SignalBinding.toString()`.



## v0.4 (2010/11/27) ##

### API changes ###

 - Added:
   - `SignalBinding.prototype.detach()`
   - `SignalBinding.prototype.dispose()`
 
### Test Changes ###

 - Added test cases for `detach` and `dispose`.
 
### Other ###

 - Improved docs for a few methods.
 - Added internal method `Signal.prototype._addBinding()`.
 


## v0.3 (2010/11/27) ##

### API changes ###
 
 - Renamed:
   - `Signal.prototype.stopPropagation()` -> `Signal.prototype.halt()`
   - `Signal.prototype.pause()` -> `Signal.prototype.disable()`
   - `Signal.prototype.resume()` -> `Signal.prototype.enable()`
   - `Signal.prototype.isPaused()` -> `Signal.prototype.isEnabled()`
   - `SignalBinding.prototype.pause()` -> `SignalBinding.prototype.disable()`
   - `SignalBinding.prototype.resume()` -> `SignalBinding.prototype.enable()`
   - `SignalBinding.prototype.isPaused()` -> `SignalBinding.prototype.isEnabled()`
   
### Fixes ###

 - Calling `halt()` before/after `dispatch()` doesn't affect listeners execution anymore, `halt()` only works during propagation.

### Test Changes ###

 - updated API calls to reflect new method names.
 - added tests that match `halt()` before/after `dispatch()`.

### Other ###

Added inline documentation to source code and included an HTML version of the documentation together with distribution files.



## v0.2 (2010/11/26) ##

### API changes ###
 
 - Added:
   - `Signal.prototype.pause()`
   - `Signal.prototype.resume()`
   - `Signal.prototype.isPaused()`
   - `Signal.prototype.stopPropagation()`
 
### Fixes ###
 
 - `SignalBinding.prototype.isPaused()`

### Test Changes ###

 - Increased test coverage a lot. 
 - Tests added: 
   - pause/resume (for individual bindings and signal)
   - stopPropagation (using `return false` and `Signal.prototype.stopPropagation()`)
   - `SignalBindings.prototype.isOnce()`
   - if same listener added twice returns same binding

### Other ###

Small refactoring and code cleaning.



## v0.1 (2010/11/26) ##

 - initial release, support of basic features.