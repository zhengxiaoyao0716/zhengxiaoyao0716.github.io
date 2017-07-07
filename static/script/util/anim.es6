; (function () {
    "use strict";
    const anim = {
        attributes: {
            display: "data-anim-display",
        },
    };

    anim.fade = function (ele) {
        return {
            in: (force) => { (force || ele.getAttribute(anim.attributes.display) === "false") && ele.setAttribute(anim.attributes.display, true); },
            out: (force) => { (force || ele.getAttribute(anim.attributes.display) === "true") && ele.setAttribute(anim.attributes.display, false); },
        }
    };

    // Module defined.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = anim;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return anim; });
    } else {
        window.anim = anim;
    }
})();
