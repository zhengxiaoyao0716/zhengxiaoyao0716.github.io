; (function () {
    "use strict";
    const board = {
        get container() { return document.querySelector(".-acg- #board"); },
        get fade() { return anim.fade(this.container); },
        "attributes": {
            now: "data-acg-board-now",
        },
    };

    // TODO 3个tab，分别是music, image, daily
    //     中间为弹幕列表，时间|内容|发送者
    //     底部为吐泡泡按钮、弹幕输入框、发送按钮
    board.switch = (tab) => {
        tab = tab || "music";
        board.container.setAttribute(board.attributes.now, tab);
        console.log(tab);
    };

    if (innerWidth / innerHeight > 1) {
        // 横向，电脑
        board.container.classList.remove("fold");
        // } else {
        //     // 竖向，手机
    }

    // Module defined.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = board;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return board; });
    } else {
        window.board = board;
    }
})();
