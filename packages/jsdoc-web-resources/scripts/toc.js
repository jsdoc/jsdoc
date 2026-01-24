/*
  Copyright 2022 the Baseline Authors.

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

import '@awesome.me/webawesome/dist/components/details/details.js';
import '@awesome.me/webawesome/dist/components/tree/tree.js';
import '@awesome.me/webawesome/dist/components/tree-item/tree-item.js';

function preventDefault(e) {
  e.preventDefault();
}

function stopImmediatePropagation(e) {
  e.stopImmediatePropagation();
}

// Prevent always-open accordions from being closed and reopened.
document.querySelectorAll('wa-details').forEach((item) => {
  item.addEventListener('wa-hide', preventDefault);
  item.addEventListener('wa-show', preventDefault);
});

// Prevent expandable tree items from expanding when their link is clicked.
document.querySelectorAll(':not(wa-details) > wa-tree > wa-tree-item').forEach((item) => {
  const child = item.firstElementChild;

  if (child?.nodeName === 'A') {
    child.addEventListener('click', stopImmediatePropagation);
  }
});
