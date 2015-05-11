# TaffyDB (taffy.js)

TaffyDB is an opensouce library that brings database features into your JavaScript applications.

## Introduction

How you ever noticed how JavaScript object literals look a lot like records? And that if you wrap a group of them up in an array you have something that atcs a lot like a database table? TaffyDB brings powerful database funtionality to that concept and rapidly improves the way you work with data inside of JavaScript.

## What makes it sticky

 - Extremely fast
 - Powerful JavaScript centric data selection engine
 - Database inspired features such as insert, update, unique, count, etc
 - Robust cross browser support
 - Easily extended with your own functions
 - Compatible with any DOM library (jQuery, YUI, Dojo, etc)

## Create a DB

Just pass in JSON:

    var products = TAFFY([{
      "item":1,
    	"name":"Blue Ray Player",
    	"price":99.99
    }, {
        "item":2,
        name:"3D TV",
        price:1799.99
    }]);


## Find data

Use JSON to compare:

    var item1 = products({item:1});
    // where item is equal to 1
    var lowPricedItems = products({price:{lt:100}});
	// where price is less than 100
	var blueRayPlayers = products({name:{like:"Blue Ray"}});
	// where name is like "Blue Ray"

## Use data

    // update the price of the Blue Ray Player to 89.99
    products({item:1}).update({price:89.99});
    // loop over the records and call a function
    products().each(function (r) {alert(r.name)});
    // get first record
    products().first();
    // get last record
    products().last();
    // sort the records by price descending
    products.sort("price desc");
    // select only the item names into an array
    products().select("name"); // returns ["3D TV","Blue Ray Player"]
    // inject values from a record into a string template
    var row = products({item:2}).supplant("<tr><td>{name}</td><td>{price}</td></tr>");
    // row now equal to "<tr><td>3D TV</td><td>17999.99</td></tr>"

## Documentation, support, updates

View more docs and examples, get support, and get notified of updates:

Web: http://taffydb.com
Twitter: http://twitter.com/biastoact 


## Software License Agreement (BSD License)
Copyright (c)
All rights reserved.


Redistribution and use of this software in source and binary forms, with or without modification, are permitted provided that the following condition is met:

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
