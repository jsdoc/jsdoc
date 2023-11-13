!/*
  Copyright 2014 the Baseline Authors.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*//* global document, window */// Function to prevent the top navbar from obscuring the page content.
function(){function n(n){var o,t=document.getElementById(n.replace(/^#/,""));t&&(o=t.getBoundingClientRect().top+window.pageYOffset,setTimeout(function(){window.scrollTo(0,o-50)},5))}window.addEventListener("load",function(){var o=window.location.hash;o&&"#"!==o&&n(o),// if the user clicks on an in-page anchor tag, scroll appropriately
window.addEventListener("hashchange",function(){n(window.location.hash)})})}();