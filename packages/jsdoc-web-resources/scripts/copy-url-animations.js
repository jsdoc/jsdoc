/*
  Copyright 2026 the Baseline Authors.

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

export const bloom = {
  keyframes: [
    { scale: 'var(--jsdoc-copy-icon-scale)', strokeWidth: 'var(--jsdoc-copy-icon-stroke-width)' },
    {
      scale: 'calc(var(--jsdoc-copy-icon-scale) * 1.05)',
      strokeWidth: 'calc(var(--jsdoc-copy-icon-stroke-width) * 1.025)',
      color: 'oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h)',
      filter:
        'drop-shadow(0 0 0.0625rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h))',
      offset: 0.3,
    },
    {
      scale: 'calc(var(--jsdoc-copy-icon-scale) * 1.1)',
      strokeWidth: 'calc(var(--jsdoc-copy-icon-stroke-width) * 1.05)',
      color: 'oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.1) c h)',
      filter:
        'drop-shadow(0 0 0.125rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.1) c h))',
      offset: 0.6,
    },
    {
      scale: 'calc(var(--jsdoc-copy-icon-scale) * 1.05)',
      strokeWidth: 'calc(var(--jsdoc-copy-icon-stroke-width) * 1.025)',
      color: 'oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h)',
      filter:
        'drop-shadow(0 0 0.0625rem oklch(from var(--jsdoc-copy-icon-color-hover) calc(l * 1.05) c h))',
      offset: 0.9,
    },
    {
      scale: 'var(--jsdoc-copy-icon-scale)',
      strokeWidth: 'var(--jsdoc-copy-icon-stroke-width)',
      color: 'var(--jsdoc-copy-icon-color)',
    },
  ],
  options: {
    duration: 800,
    easing: 'ease-in-out',
  },
};

export const pop = {
  keyframes: [
    { scale: 1, opacity: 1 },
    { scale: 3, opacity: 0.25, offset: 0.2 },
    { scale: 5, opacity: 0.0625, offset: 0.4 },
    { scale: 10, opacity: 0 },
  ],
  options: {
    duration: 300,
    easing: 'ease-in-out',
  },
};
