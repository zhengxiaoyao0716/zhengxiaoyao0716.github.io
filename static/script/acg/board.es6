; (function () {
    "use strict";
    const board = {
        get container() { return document.querySelector(".-acg- #board"); },
        get fade() { return anim.fade(this.container); },
    };

    // Module defined.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = board;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return board; });
    } else {
        window.board = board;
    }
})();
