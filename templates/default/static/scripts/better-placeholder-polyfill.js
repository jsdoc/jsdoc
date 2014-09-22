(function(DOM) {
    "use strict";

    var supportsPlaceholder = typeof DOM.create("input").get("placeholder") === "string";

    DOM.extend("[placeholder]", !supportsPlaceholder, {
        constructor: function() {
            var placeholder = DOM.create("input[tabindex=-1 unselectable=on class=better-placehoder value=`{0}`]", [this.get("placeholder")]);

            this
                .on("focus", this.onFocus.bind(this, placeholder))
                .on("blur", this.onBlur.bind(this, placeholder))
                .set("_placeholder", placeholder)
                .before(placeholder);

            placeholder
                .on("mousedown", this.onPlaceholderClick.bind(this))
                .style(this.style(["width", "height", "font", "padding", "text-align", "border-width"]));

            if (this.get() || this.matches(":focus")) placeholder.hide();
        },
        onFocus: function(placeholder) {
            placeholder.hide();
        },
        onBlur: function(placeholder) {
            if (!this.get()) placeholder.show();
        },
        onPlaceholderClick: function() {
            this.fire("focus");

            return false;
        }
    });

    DOM.importStyles(".better-placehoder", {
        "box-sizing": "border-box",
        position: "absolute",
        color: "graytext",
        background: "none",
        "border-color": "transparent"
    });
}(window.DOM));
