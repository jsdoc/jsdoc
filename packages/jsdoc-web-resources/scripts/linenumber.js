/*
    Copyright 2014-2019 Google LLC

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
/* global document */
(function() {
    var counter = 0;
    var numbered;
    var source = document.getElementsByClassName('prettyprint');

    if (source && source[0]) {
        source = source[0].getElementsByTagName('code')[0];

        numbered = source.innerHTML.split('\n');
        numbered = numbered.map(function(item) {
            counter++;

            return '<span id="source-line-' + counter + '" class="line"></span>' + item;
        });

        source.innerHTML = numbered.join('\n');
    }
})();
