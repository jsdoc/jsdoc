/*
    Copyright 2014-2020 Google LLC

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        https://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
*/
/* global document, window */
// Function to prevent the top navbar from obscuring the page content.
(function () {
  // timeout for scrolling the window
  var TIMEOUT = 5;
  // top navbar height
  var TOP_OFFSET = 50;

  function scrollTo(hash) {
    var element = document.getElementById(hash.replace(/^#/, ''));
    var elementOffset;
    var rect;

    if (element) {
      rect = element.getBoundingClientRect();
      elementOffset = rect.top + window.pageYOffset;

      setTimeout(function () {
        window.scrollTo(0, elementOffset - TOP_OFFSET);
      }, TIMEOUT);
    }
  }

  window.addEventListener('load', function () {
    var currentHash = window.location.hash;

    // if we're loading a URL with an anchor, scroll appropriately
    if (currentHash && currentHash !== '#') {
      scrollTo(currentHash);
    }

    // if the user clicks on an in-page anchor tag, scroll appropriately
    window.addEventListener('hashchange', function () {
      scrollTo(window.location.hash);
    });
  });
})();
