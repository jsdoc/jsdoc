/*
*	JSMock 1.2.2, a mock object library for JavaScript 
* Copyright (C) 2006 Justin DeWind 
*
* This library is free software; you can redistribute it and/or
* modify it under the terms of the GNU Lesser General Public
* License as published by the Free Software Foundation; either
* version 2.1 of the License, or (at your option) any later version.
*
* This library is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
* Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public
* License along with this library; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
*/

JSMock = {
  extend: function(object) {
    var mockControl = new MockControl();
    object.createMock = function(objectToMock) {return mockControl.createMock(objectToMock)};
    object.resetMocks = function() {mockControl.reset()};
    object.verifyMocks = function() {mockControl.verify()};
    
    if(!object.tearDown) {
      object.tearDown = function() {
        object.verifyMocks();
      }
    }
    else if(object.tearDown.constructor == Function) {
      object.__oldTearDown__ = object.tearDown;
      object.tearDown = function() {
        object.__oldTearDown__();
        object.verifyMocks();
      }
    }
  }
}

function MockControl() {
	this.__expectationMatcher = new ExpectationMatcher();
	this.__lastMock = null;
	this.__lastCallName = null;
} 

MockControl.prototype = {

	createMock: function(objectToMock) {
		var mock = { calls: [], expects: function() {this.__recording = true; return this}, __recording: false};
		mock.expect = mock.expects;
		
		if(objectToMock != null) {

			if( typeof(objectToMock) == 'function' ) {
				this.__createMethods(objectToMock, mock);
				this.__createMethods(new objectToMock(), mock);
			} 
			else if( typeof(objectToMock) == 'object') {
				this.__createMethods(objectToMock, mock);
			} 
			else {
				throw new Error("Cannot mock out a " + typeof(objectToMock));
			}

		}

		var self = this;
		mock.addMockMethod = function(method) { self.__createMethod(self, mock, method); }

		return mock;
	},
	
	andReturn: function(returnValue) {
		this.__verifyLastMockNotNull("Cannot set return value without an expectation");
		this.__initializeReturnExpectationForMock();	
		this.__lastMock.calls[this.__lastCallName].push( function() { return returnValue; });
	},
	
	andThrow: function(throwMsg) {
		this.__verifyLastMockNotNull("Cannot throw error without an expectation");
		this.__initializeReturnExpectationForMock();	
		this.__lastMock.calls[this.__lastCallName].push( function() { throw new Error(throwMsg); });
	},

	andStub: function(block) {
		this.__verifyLastMockNotNull("Cannot stub without an expectation");
		if( typeof(block) != 'function') {
			throw new Error("Stub must be a function");
		}
		this.__initializeReturnExpectationForMock();	
		this.__lastMock.calls[this.__lastCallName].push( function() { return block.apply(this, arguments); });
	},
	
	reset: function() {
	  this.__expectationMatcher.reset();
	},

	verify: function() {
		if(!this.__expectationMatcher.matches())
		{
			discrepancy = this.__expectationMatcher.discrepancy();
			message = discrepancy.message;
			method = discrepancy.behavior.method
			formattedArgs = ArgumentFormatter.format(discrepancy.behavior.methodArguments);
			this.__expectationMatcher.reset();
			throw new Error(message + ": " + method + "(" + formattedArgs + ")");	
		}
		else {
		  this.__expectationMatcher.reset();
		}

	},

	__createMethods: function(object, mock) {
		for( property in object )	{
			if( this.__isPublicMethod(object, property) ) {
				this.__createMethod( this, mock, property );
			}
		}
	},

	__createMethod: function(control, mock, method) {
		mock[method] = 
			function() {
				if( mock.__recording ) {
						control.__lastMock = mock;
						control.__lastCallName = method;
						control.__expectationMatcher.addExpectedMethodCall( mock, method, arguments );
						mock.__recording = false;
						return control;
					} 
					else {
						control.__expectationMatcher.addActualMethodCall( mock, method, arguments );
						if( mock.calls[method] != null) {
							returnValue = mock.calls[method].shift();
							if( typeof(returnValue) == 'function') {
								return returnValue.apply(this, arguments);
							}
						}
					}
			}
	},

	__isPublicMethod: function(object, property) {
		try {
			return typeof(object[property]) == 'function' && property.charAt(0) != "_";
		} catch(e) {
			return false;
		}
	},

	__verifyLastMockNotNull: function(throwMsg) {
		if(this.__lastMock == null) {
			throw new Error(throwMsg);
		}
	},

	__initializeReturnExpectationForMock: function() {
		if(typeof(this.__lastMock.calls[this.__lastCallName]) == 'undefined') {
			this.__lastMock.calls[this.__lastCallName] = [];
		} 
	}
}

function ExpectationMatcher() {
	this.__expectationBehaviorList = [];
	this.__actualBehaviorList = [];
	this.__discrepancy = null; 
	
}

ExpectationMatcher.prototype = {
	addExpectedMethodCall: function(caller, method, methodArguments ) {
		this.__expectationBehaviorList.push(new InvocationBehavior(caller, method, methodArguments));
	},

	addActualMethodCall: function(caller, method, methodArguments ) {
		this.__actualBehaviorList.push(new InvocationBehavior(caller, method, methodArguments));
	},

	matches: function() {
	  var self = this;
	  var matches = true;
	  
	  this.__expectationBehaviorList.eachIndexForJsMock(function(index, expectedBehavior) {
	    var actualBehavior = (self.__actualBehaviorList.length > index) ? self.__actualBehaviorList[index] : null;
	    
	    if(matches) {
	      if( actualBehavior === null ) {
  				self.__discrepancy = new Discrepancy("Expected function not called", expectedBehavior);
  				matches = false;
  			}	
  			else if( expectedBehavior.method != actualBehavior.method ) {
  				self.__discrepancy = new Discrepancy("Surprise call", actualBehavior);
  				matches = false;
  			}
  			else if( expectedBehavior.caller != actualBehavior.caller ) {
  				self.__discrepancy = new Discrepancy("Surprise call from unexpected caller", actualBehavior);
  				matches = false;
  			} 
  			else if( !self.__matchArguments(expectedBehavior.methodArguments, actualBehavior.methodArguments) ) {
  				self.__discrepancy = new Discrepancy("Unexpected Arguments", actualBehavior);
  				matches = false;
  			}
	    }
	  });
	  
		if( this.__actualBehaviorList.length > this.__expectationBehaviorList.length && matches ) {
			this.__discrepancy = new Discrepancy("Surprise call", this.__actualBehaviorList[this.__expectationBehaviorList.length]);
			matches = false
		} 

		return matches;
	},

	reset: function() {
		this.__expectationBehaviorList = [];
		this.__actualBehaviorList = [];
		this.__discrepancy = null;
	},

	discrepancy: function() {
		return this.__discrepancy; 
	},

	__matchArguments: function(expectedArgs, actualArgs) {
		var expectedArray = this.__convertArgumentsToArray(expectedArgs);
		var actualArray = this.__convertArgumentsToArray(actualArgs);
		return ArgumentMatcher.matches(expectedArray, actualArray);
	},

	__convertArgumentsToArray: function(args) {
		var convertedArguments = [];

		for(var i = 0; i < args.length; i++) {
			convertedArguments[i] = args[i];	
		}

		return convertedArguments;
	}
}

function InvocationBehavior(caller, method, methodArguments) {
	this.caller = caller;
	this.method = method;
	this.methodArguments = methodArguments;
}

function TypeOf(type) {
	if(typeof(type) != 'function')
		throw new Error("Can only take constructors");

	this.type = type;
}

TypeOf.isA = function(type) { return new TypeOf(type); };

ArgumentMatcher = {

	matches: function(expected, actual) {
		return this.__delegateMatching(expected, actual);
	},

	__delegateMatching: function(expected, actual) {
		if( expected == null ) {
			return this.__match( expected, actual );
		} 
		else if( expected.constructor == TypeOf ) {
			return this.__match(expected.type, actual.constructor);
		} 
		else if( expected.constructor == Array ) {
			return this.__matchArrays(expected, actual);
		} 
		else {
			return this.__match(expected, actual);
		}
	}, 

	__match: function(expected, actual) {
		return ( expected == actual );
	},

	__matchArrays: function(expected, actual) {
		if ( actual == null) 
			return false;

		if( actual.constructor != Array)
			return false;

		if( expected.length != actual.length )
			return false;

		for(var i = 0; i < expected.length; i++ ) {
			if( !this.__delegateMatching(expected[i], actual[i]) )
				return false;
		}

		return true;
	}
}

function Discrepancy(message, behavior) {
	if(behavior.constructor != InvocationBehavior)
		throw new Error("The behavior can only be an InvocationBehavior object");

	this.message = message;
	this.behavior = behavior;
}

ArgumentFormatter = {

	format: function(args) {
		var formattedArgs = "";
		for(var i = 0; i < args.length; i++) {
			if( args[i] == null ) {
				formattedArgs += ( formattedArgs == "" ) ? "null" : ", " + "null"; 
			}
			else if( args[i].constructor == TypeOf || args[i].constructor == Function) {
				var func = ( args[i].constructor == TypeOf ) ? args[i].type : args[i];
				formattedArgs += ( formattedArgs == "" ) ? this.__formatFunction(func) : ", " + this.__formatFunction(func); 
			}
			else if( typeof(args[i]) == "string" ) {
				formattedArgs += ( formattedArgs == "" ) ? "\"" + args[i].toString() + "\"" : ", \"" + args[i].toString() + "\""
			}
			else if( args[i].constructor == Array ) {
				formattedArgs += ( formattedArgs == "" ) ? "[" + this.format(args[i]) + "]" : ", [" + this.format(args[i]) + "]";
			}
			else {
				formattedArgs += ( formattedArgs == "" ) ? args[i].toString() : ", " + args[i].toString();
			}
		}
		return formattedArgs;
	},

	__formatFunction: function(func) {
		// Manual checking is done for internal/native functions
		// since Safari will not display them correctly 
		// for the intended regex parsing.

		if(func == Array) {
			return "Array";
		} else if(func == Date) {
			return "Date";
		} else if(func == Object) {
			return "Object";
		} else if(func == String) {
			return "String";
		} else if(func == Function) {
			return "Function";
		} else if(func == RegExp) {
			return "RegExp";
		} else if(func == Error) {
			return "Error";
		} else if(func == Number) {
			return "Number";
		} else if(func == Boolean) {
			return "Boolean";
		} 
		var formattedFunc = func.toString().match(/function (\w+)/);

		return ( formattedFunc ==  null ) ? "{{Closure}}" : formattedFunc[1];
	}

}	

/* Helpers */

// Implemented each method with a unique name to avoid conflicting
// with other libraries that implement it.
Array.prototype.eachIndexForJsMock = function(block) {
  for(var index = 0; index < this.length; index++)
  {
    block(index, this[index]);
  }
}
