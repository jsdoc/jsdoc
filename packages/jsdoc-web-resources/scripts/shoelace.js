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
import '../node_modules/@shoelace-style/shoelace/dist/components/tree/tree.js';
import '../node_modules/@shoelace-style/shoelace/dist/components/tree-item/tree-item.js';

const PREVENT_UNSTYLED_ELEMENTS = ['sl-tree', 'sl-tree-item'];

function stopImmediatePropagation(e) {
  e.stopImmediatePropagation();
}

// Prevent expandable tree items from expanding when their link is clicked.
document.querySelectorAll('sl-tree-item').forEach((item) => {
  const child = item.firstElementChild;

  if (child && child.nodeName === 'A') {
    child.addEventListener('click', stopImmediatePropagation);
  }
});

(async () => {
  // Prevent a flash of undefined custom elements (FOUCE).
  await Promise.allSettled(PREVENT_UNSTYLED_ELEMENTS.map((el) => customElements.whenDefined(el)));

  document.querySelectorAll('sl-tree').forEach((tree) => {
    tree.classList.add('ready');
  });
})();
