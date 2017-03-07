// acg
// @author: zhengxiaoyao0716
; (function () {
    "use strict";
    const acg = {
        "background": {
            "doms": document.querySelectorAll(".-acg- .background, .-acg-.background"),
            "images": [{
                url: "./static/image/acg_bgs/49647343_p0.png",
                info: "PixivID: 49647343 | 画师：コ゛りぼて",
            }],  // 图片缓存队列，可空数组，获取到的图片会扩展进入数组。
            // "interval": 30,  // 自动切换时间间隔，单位s，不大于0时（0、-1、undefined）不自动切换
            // "provider": "http://pic.api.freejishu.com/v2/?tag=acg",  // 图片供应api，空值表示不获取新图片
        }
    };

    // 随机背景
    if (acg.background.doms) {
        acg.background.images = acg.background.images || [];
        let index = 0;
        // 拉取下一张图片
        const fetchImage = acg.background.provider ? (fn) => {
            base.fetch(acg.background.provider).then((data) => {
                if (fn) {
                    acg.background.images.push({
                        url: data['url'],
                        info: '' || data['url'],
                    });
                    fn(acg.background.images[index]);
                } else {
                    base.preload.image(data['url'], (src) => {
                        acg.background.images.push({
                            url: src,
                            info: '' | src,
                        });
                    });
                }
            });
        } : (fn) => {
            index = 0;
            fn && fn(acg.background.images[index]);
        };
        // 切换背景到下一张
        function nextImage() {
            new Promise((resolve, reject) => {
                function onImageGet(image) {
                    ++index >= acg.background.images.length && fetchImage();
                    resolve(image);
                }
                const image = acg.background.images[index];
                if (!image) {
                    fetchImage(image => onImageGet(image));
                } else {
                    onImageGet(image);
                }
            }).then(image => image && acg.background.doms.forEach(div => {
                console.log(image);
                div.style.backgroundImage = 'url(' + image.url + ')';
                div.setAttribute("data-acg-bg-info", image.info);
            }));
        };
        nextImage();
        // 定时刷新
        acg.background.interval > 0 && setInterval(nextImage, acg.background.interval * 1000);
    }

    // 功能模块
    ((keys, fn) => keys.forEach(key => addEventListener(key, () => fn(location.hash || "#"))))(
        ["load", "hashchange"],
        (() => {
            const style = ((style) => {
                document.head.appendChild(style);
                style.setAttribute("id", "acg-sticker-style");
                return style;
            })(document.createElement("style"));
            return (hash) => {
                style.innerHTML = `
                    .-acg- .sticker>a[data-acg-hide-hash="${hash}"] {
                        display: none;
                    }
                    .-acg- .sticker>a[data-acg-show-hash="${hash}"] {
                        display: block;
                    }
                `;
                ({
                    "#": () => {
                        // 首页
                        console.log("#");
                    },
                    "#anime": () => {
                        // 动画
                        console.log("a");
                    },
                    "#game": () => {
                        // 游戏
                        console.log("g");
                    },
                    "#music": () => {
                        // 音乐
                        console.log("m");
                    },
                    "#board": () => {
                        // 后台
                        console.log("b");
                    }
                })[hash]();
            }
        })()
    );

    // Module defined.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = acg;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return acg; });
    } else {
        window.acg = acg;
    }
})();
