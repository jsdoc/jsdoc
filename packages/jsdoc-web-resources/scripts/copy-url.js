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

// eslint-disable-next-line no-unused-vars
import WaTooltip from '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { state } from 'lit/decorators/state.js';

import * as animations from './copy-url-animations.js';
import { initializeIcons } from './icons.js';

const STATUS = {
  REST: 'rest',
  SUCCESS: 'success',
};

@customElement('copy-url')
export class CopyUrl extends LitElement {
  @query('slot[name="copy-icon"]')
  accessor copyIcon;

  @query('slot[name="success-icon"]')
  accessor successIcon;

  @property()
  accessor from = '';

  @property({ attribute: 'copy-label' })
  accessor copyLabel = 'Copy link';

  @property()
  accessor feedbackDuration = 1000;

  @property()
  accessor showAnimation = animations.pop;

  @property()
  accessor showAnimationReducedMotion = animations.bloom;

  @property({ attribute: 'success-label' })
  accessor successLabel = 'Copied';

  @property({ attribute: 'tooltip-placement' })
  accessor tooltipPlacement = 'top';

  @state()
  accessor isCopying = false;

  @state()
  accessor status = STATUS.REST;

  static styles = [
    // Copy button styles.
    css`
      :host {
        --jsdoc-copy-icon-scale: 1;
        --jsdoc-copy-icon-stroke-width: 2px;
        display: inline-block;
      }

      .copy-button__button {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        background-color: transparent;
        border: none;
        color: inherit;
        font-size: inherit;
        margin-inline: var(--jsdoc-spacer-x-small);
        padding: var(--jsdoc-spacer-x-small);
        cursor: pointer;
        transform: translateY(var(--jsdoc-spacer-xxx-small));
        transition: color 0.3s ease-in-out;
      }

      .copy-button__button:focus-visible {
        outline-offset: var(--jsdoc-spacer-xx-small);
        transform: translateY(var(--jsdoc-spacer-xxx-small));
      }

      slot[name='copy-icon'],
      slot[name='success-icon'] {
        position: absolute;
        top: 0;
        right: 0;
      }

      slot[name='copy-icon'] {
        color: var(--jsdoc-copy-icon-color);
        opacity: var(--jsdoc-copy-icon-opacity);
        transition: opacity 0.3s ease-in-out;
      }

      slot[name='copy-icon']:focus,
      :focus slot[name='copy-icon'],
      slot[name='copy-icon']:hover,
      :hover slot[name='copy-icon'] {
        color: var(--jsdoc-copy-icon-color-hover);
        opacity: 1;
      }

      slot[name='copy-icon'][hidden]:focus,
      :focus slot[name='copy-icon'][hidden] {
        color: var(--jsdoc-copy-icon-color);
        opacity: var(--jsdoc-copy-icon-opacity);
      }

      slot[name='success-icon'] {
        color: var(--jsdoc-copy-icon-color);
        opacity: var(--jsdoc-copy-icon-opacity);
        transition: opacity 0.3s ease-in-out;
      }

      slot[name='success-icon']:focus,
      :focus slot[name='success-icon'],
      slot[name='success-icon']:hover,
      :hover slot[name='success-icon'] {
        color: var(--jsdoc-copy-icon-color-hover);
      }

      slot {
        display: inline-flex;
      }
    `,
    // Tooltip styles.
    css`
      :host {
        --wa-tooltip-arrow-size: 0.5rem;
        --wa-tooltip-background-color: var(--jsdoc-color-zinc-600);
      }

      :host wa-tooltip {
        translatey: -0.5rem;
      }

      :host wa-tooltip::part(base__arrow) {
        --arrow-size-diagonal: calc(var(--arrow-size) * 0.6);
        --arrow-size-div: var(--arrow-size-diagonal);
        bottom: calc(var(--arrow-size-diagonal) * -1);
        height: calc(var(--arrow-size-diagonal) * 2);
        width: calc(var(--arrow-size-diagonal) * 2);
        z-index: -1;
      }

      :host wa-tooltip::part(base__popup) {
        transform: translate(0, -0.25rem);
      }

      :host wa-tooltip::part(body) {
        --wa-tooltip-border-radius: 0.25rem;
        background-color: var(--jsdoc-color-zinc-600);
        color: var(--jsdoc-color-white);
        font-size: calc(var(--jsdoc-font-font-size-base) * 0.8);
        font-family: var(--jsdoc-font-sans-serif-font);
        padding: 0.25rem 0.5rem;
      }
    `,
  ];

  async handleCopy() {
    let targetUrl;
    let valueToCopy;

    if (this.isCopying) {
      return;
    }

    this.isCopying = true;
    targetUrl = new URL(window.location.href);
    targetUrl.hash = this.from;
    valueToCopy = targetUrl.href;

    if (valueToCopy) {
      await navigator.clipboard.writeText(valueToCopy);
      await this.animateIcon();
    }
  }

  firstUpdated() {
    super.firstUpdated();

    initializeIcons({ root: this.shadowRoot });
  }

  get label() {
    if (this.status === STATUS.SUCCESS) {
      return this.successLabel;
    }

    return this.copyLabel;
  }

  render() {
    return html`
      <button
        id="copy-button"
        class="copy-button__button"
        part="button"
        type="button"
        @click=${this.handleCopy}
      >
        <slot part="copy-icon" name="copy-icon">
          <span data-icon="link" slot="copy-icon"></span>
        </slot>
        <slot part="success-icon" name="success-icon">
          <span data-icon="link" slot="success-icon"></span>
        </slot>
        <wa-tooltip
          class="copy-url"
          for="copy-button"
          placement=${this.tooltipPlacement}
          ?disabled=${this.disabled}
          exportparts="
            base:tooltip__base,
            base__popup:tooltip__base__popup,
            base__arrow:tooltip__base__arrow,
            body:tooltip__body
          "
          >${this.label}</wa-tooltip
        >
      </button>
    `;
  }

  async animateIcon() {
    const { matches: prefersReducedMotion } = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animation = prefersReducedMotion ? this.showAnimationReducedMotion : this.showAnimation;

    this.copyIcon.hidden = false;
    this.status = STATUS.SUCCESS;
    await this.successIcon.animate(animation.keyframes, animation.options).finished;

    setTimeout(() => {
      document.documentElement.style.setProperty('--jsdoc-copy-icon-opacity', 0);
      this.copyIcon.hidden = true;
      this.isCopying = false;
      this.status = STATUS.REST;
    }, this.feedbackDuration);
  }
}
