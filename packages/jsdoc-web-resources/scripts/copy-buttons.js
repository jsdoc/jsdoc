/*
  Copyright 2025 the Baseline Authors.

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

import '@shoelace-style/shoelace/dist/components/copy-button/copy-button.js';

import SlCopyButton from '@shoelace-style/shoelace/dist/components/copy-button/copy-button.component.js';
import { createIcons, Link, Unlink } from 'lucide';

const copyUrlIcons = {
  'copy-icon': 'link',
  'success-icon': 'link',
  'error-icon': 'unlink',
};

const HEADING_SELECTOR = 'h1, h2, h3, h4, h5, h6';
const ICON_ATTR = 'data-icon';

function createIcon([slotName, iconName]) {
  const icon = document.createElement('span');

  icon.setAttribute(ICON_ATTR, iconName);
  icon.setAttribute('slot', slotName);

  return icon;
}

class CopyUrl extends SlCopyButton {
  constructor() {
    super();
  }

  connectedCallback() {
    let heading;

    createIcons({
      icons: {
        Link,
        Unlink,
      },
      nameAttr: ICON_ATTR,
    });

    this.copyLabel = 'Copy link';
    this.successLabel = 'Copied';
    this.errorLabel = "Can't copy link";

    heading = this.closest(HEADING_SELECTOR);
    if (heading) {
      Object.entries(copyUrlIcons).forEach((props) => {
        this.appendChild(createIcon(props));
      });
    }

    super.connectedCallback();
  }

  /*
    The parent component can find an element by ID, then copy a property or attribute of that
    element when the user clicks the button. However, this doesn't work if the element ID contains
    any of these characters: .[] That makes the component think that you're referencing a property
    or attribute, not an element ID.

    To work around this issue, we insert a <span> with an ID that doesn't trigger this bug. We copy
    the text of that <span>, then remove the <span> after the text is copied.
  */
  async handleCopy() {
    const targetId = this.from;
    const targetUrl = new URL(window.location.href);
    const fakeTarget = document.createElement('span');
    // Replace characters that change the component's behavior, triggering bugs.
    const safeTargetId = targetId.replace(/\./g, '_').replace(/\[/g, '_');

    targetUrl.hash = targetId;

    fakeTarget.id = `FAKE_TARGET_${safeTargetId}`;
    fakeTarget.textContent = targetUrl.href;
    fakeTarget.style.display = 'none';
    this.appendChild(fakeTarget);
    this.from = fakeTarget.id;

    await super.handleCopy();

    this.from = targetId;
    this.removeChild(fakeTarget);
  }
}

customElements.define('copy-url', CopyUrl);
