; (function () {
    "use strict";
    const barrage = {
    };

    // Module defined.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = barrage;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return barrage; });
    } else {
        window.barrage = barrage;
    }
})();
