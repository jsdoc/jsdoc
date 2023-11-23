/*
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
*/// Prevent the top navbar from obscuring the page content.
(()=>{let e={PAGE_DOWN:"PageDown",PAGE_UP:"PageUp",SPACE:"Space"};function t(e){let t=document.getElementById("jsdoc-navbar"),n=t.getBoundingClientRect(),o=5*Math.ceil(n.height/5);return e-o}function n(e,n,o){let l;n&&(l=document.getElementById(n))&&(e.preventDefault(),window.scroll({top:t(l.offsetTop)}),window.history.pushState(null,null,o))}function o(e){return e.substring(1)}// If we're loading a URL with an anchor, scroll appropriately.
window.addEventListener("load",e=>{let t=o(document.location.hash);n(e,t,document.location.href)}),// If the user clicks on an in-page anchor tag, scroll appropriately.
window.addEventListener("hashchange",e=>{let t=new URL(e.newURL),l=o(t.hash);n(e,l,t.hash)}),// If the user pages up or down, scroll appropriately.
document.addEventListener("keydown",n=>{let o;let l=n.code;(l===e.SPACE||l===e.PAGE_DOWN||l===e.PAGE_UP)&&((n.preventDefault(),n.stopImmediatePropagation(),o=t(window.innerHeight),l===e.PAGE_UP)?window.scroll({top:window.scrollY-o,behavior:"auto"}):window.scroll({top:window.scrollY+o,behavior:"auto"}))})})();