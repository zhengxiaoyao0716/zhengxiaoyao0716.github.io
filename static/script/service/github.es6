; (function () {
    "use strict";

    const github = {
        user: "zhengxiaoyao0716",
        url: {
            issues(repo, page) { github.user = "Microsoft"; repo = "vscode"; return `https://api.github.com/repos/${github.user}/${repo}/issues?page=${page}` },
        },
        acgData() {
            // TODO 创建作为数据源的仓库
            // const url = github.url.issues("blog-acg", github.acgData.page++);
            const url = `https://api.github.com/repos/Microsoft/vscode/issues?page=${github.acgData.page++}`;
            return fetch(url).then(r => r.status == 200 ? r.json() : Promise.reject(r.statusText))
                .then(data => data.map((issue) => ({
                    "zone": issue.title.slice(0, issue.title.indexOf(":")),
                    "title": issue.title.slice(2 + issue.title.indexOf(":")),
                    "url": issue.url,
                    "date": issue.created_at.slice(0, 10),
                    "image": (matched => matched ? matched[1] : "./static/image/mylogo.png")(issue.body.match(/!\[image\]\((.*)\)/)),
                    "abstracts": issue.body.slice(0, issue.body.indexOf("***")).split("\n").filter(line => line),
                    "labels": issue.labels,
                })));
        },
    };
    {
        github.acgData.page = 1;
    }

    // Module defined.
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = github;
    } else if (typeof define === 'function' && define.amd) {
        define(function () { return github; });
    } else {
        window.github = github;
    }
})();
