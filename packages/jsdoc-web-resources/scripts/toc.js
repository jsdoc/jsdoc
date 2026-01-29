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

import WaTree from '@awesome.me/webawesome/dist/components/tree/tree.js';
import WaTreeItem from '@awesome.me/webawesome/dist/components/tree-item/tree-item.js';

import { createIcon, initializeIcons } from './icons.js';

const slotToIcon = {
  'expand-icon': 'chevron-right',
  'collapse-icon': 'chevron-right',
};

function preventDefault(e) {
  e.preventDefault();
}

function stopImmediatePropagation(e) {
  e.stopImmediatePropagation();
}

class JsdocTree extends WaTree {
  // Renaming <wa-tree-item> breaks handleClick(), so we provide our own version.
  handleClick(event) {
    const target = event.target;
    const treeItem = target.closest('jsdoc-tree-item');
    const isExpandButton = event
      .composedPath()
      .some((el) => el?.classList?.contains('expand-button'));

    if (!treeItem || treeItem.disabled || target !== this.clickTarget) {
      return;
    }

    if (isExpandButton) {
      treeItem.expanded = !treeItem.expanded;
    } else {
      this.selectItem(treeItem);
    }
  }
}

class JsdocTreeItem extends WaTreeItem {
  connectedCallback() {
    super.connectedCallback();

    Object.entries(slotToIcon).forEach(([slotName, iconName]) => {
      const icon = createIcon([slotName, iconName]);

      this.prepend(icon);
    });

    initializeIcons();
  }

  firstUpdated() {
    super.firstUpdated();

    for (const waIcon of this.shadowRoot.querySelectorAll('wa-icon')) {
      waIcon.remove();
    }
  }
}

customElements.define('jsdoc-tree', JsdocTree);
customElements.define('jsdoc-tree-item', JsdocTreeItem);

// Prevent always-open accordions from being closed and reopened.
document.querySelectorAll('wa-details').forEach((item) => {
  item.addEventListener('wa-hide', preventDefault);
  item.addEventListener('wa-show', preventDefault);
});

// Prevent expandable tree items from expanding when their link is clicked.
document.querySelectorAll(':not(wa-details) > jsdoc-tree > jsdoc-tree-item').forEach((item) => {
  const child = item.firstElementChild;

  if (child?.localName === 'a') {
    child.addEventListener('click', stopImmediatePropagation);
  }
});
