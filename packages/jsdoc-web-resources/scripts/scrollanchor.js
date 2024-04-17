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
*/

import ease from 'easy-ease';

// Prevent the top navbar from obscuring the page content.
(() => {
  const KEY_CODES = {
    PAGE_DOWN: 'PageDown',
    PAGE_UP: 'PageUp',
    SPACE: 'Space',
  };

  function adjustForNavbar(px) {
    const navbar = document.getElementById('jsdoc-navbar');
    const rect = navbar.getBoundingClientRect();
    // Round height up to the nearest multiple of 5.
    const adjustedNavbarHeight = Math.ceil(rect.height / 5) * 5;

    return px - adjustedNavbarHeight;
  }

  function easeToY(endValue) {
    ease({
      durationMs: 200,
      startValue: window.scrollY,
      endValue,
      onStep: (value) =>
        window.scroll({
          behavior: 'instant',
          top: value,
        }),
    });
  }

  function handleHashEvent(event, id, historyItem) {
    let target;

    if (!id) {
      return;
    }

    target = document.getElementById(id);
    if (target) {
      event.preventDefault();
      easeToY(adjustForNavbar(target.offsetTop));
      window.history.pushState(null, null, historyItem);
    }
  }

  function hashToId(hash) {
    return hash.substring(1);
  }

  // If we're loading a URL with an anchor, scroll appropriately.
  window.addEventListener('load', (event) => {
    const id = hashToId(document.location.hash);

    handleHashEvent(event, id, document.location.href);
  });

  // If the user clicks on an in-page anchor tag, scroll appropriately.
  window.addEventListener('hashchange', (event) => {
    const url = new URL(event.newURL);
    const id = hashToId(url.hash);

    handleHashEvent(event, id, url.hash);
  });

  // If the user pages up or down, scroll appropriately.
  document.addEventListener('keydown', (event) => {
    const code = event.code;
    let scrollBy;

    if (code !== KEY_CODES.SPACE && code !== KEY_CODES.PAGE_DOWN && code !== KEY_CODES.PAGE_UP) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
    scrollBy = adjustForNavbar(window.innerHeight);

    switch (code) {
      case KEY_CODES.PAGE_UP:
        easeToY(window.scrollY - scrollBy);
        break;
      default:
        easeToY(window.scrollY + scrollBy);
        break;
    }
  });
})();
