; (function () {
    "use strict";

    const github = {
        user: "zhengxiaoyao0716",
        url: {
            issues(repo, page) {
                // github.user = "Microsoft"; repo = "vscode";  // debug
                return `https://api.github.com/repos/${github.user}/${repo}/issues?page=${page}`;
            },
        },
        // whiteList: { has: () => true },  // debug
        whiteList: new Set(["zhengxiaoyao0716"]),
        acgData() {
            const url = github.url.issues("blog-acg", github.acgData.page++);
            return fetch(url).then(r => r.status == 200 ? r.json() : Promise.reject(r.statusText))
                .then(data => data.filter(issue => true).map((issue) => ({
                    "zone": issue.title.slice(0, issue.title.indexOf(":")),
                    "title": issue.title.slice(2 + issue.title.indexOf(":")),
                    "url": issue.html_url,
                    "date": issue.created_at.slice(0, 10),
                    "image": (matched => matched ? matched[1] : "./static/image/mylogo.png")(issue.body.match(/!\[image\]\((.*)\)/i)),
                    "abstracts": issue.body.slice(0, issue.body.indexOf("\r\n\r\n***")).split("\r\n").filter(line => line).map((line) => {
                        [
                            [/\s\[([^\]]*)\]\(([^\)]*)\)\s/g, ' <a href="$2">$1</a> '],
                            [/^`([^`]*)`\s/, "<code>$1</code> "],
                            [/\s`([^`]*)`\s/g, " <code>$1</code> "],
                            [/<\/code>\s`([^`]*)`\s<code>/g, "</code> <code>$1</code> <code>"],
                        ].forEach(([regexp, replace]) => { line = line.replace(regexp, replace); });
                        return line.startsWith("# ") ? `<b>${line.slice(2)}</b>` : line;
                    }),
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
