const data = require("./data");
const qs = require("qs");

const app = (req, res) => {
    res.setHeader("Content-Type", "text/html; charset=utf-8;");

    if (req.url.match(/^\/person\/?$/) && req.method === "GET") {
        res.write(JSON.stringify(data));
    } else if (req.url.match(/^\/person\/?$/) && req.method === "POST") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
        });
        req.on('end', () => {
            const person = data.find(_ => _.id === qs.parse(`${body}`).id);
            if (person) {
                res.statusCode = 404;
                res.write("Error: Person with this id already exists");
            } else {
                data.push(qs.parse(`${body}`));
                res.write(JSON.stringify(qs.parse(`${body}`)));
            }
        });
    } else if (req.url.match(/^\/person\/[a-z0-9]+$/) && req.method === "GET") {
            const person = data.find(_ => _.id === req.url.split("/").slice(-1)[0]);
            if (person) {
                res.write(JSON.stringify(person));
            } else {
                res.statusCode = 404;
                res.write("Error: Person with this id doesn't exist");
            }
    } else if (req.url.match(/^\/person\/[a-z0-9]+$/) && req.method === "PUT") {
        const personIndex = data.findIndex(_ => _.id === req.url.split("/").slice(-1)[0]);
        try {
            let body = "";
            req.on("data", chunk => {
                body += chunk;
            });
            req.on('end', () => {
                data[personIndex] = qs.parse(`${body}`);
                res.write(JSON.stringify(qs.parse(`${body}`)));
            })
        } catch (err) {
            res.statusCode = 404;
            res.write("Error: " + err.message);
        }
    } else if (req.url.match(/^\/person\/[a-z0-9]+$/) && req.method === "DELETE") {
        const personIndex = data.find(_ => _.id === req.url.split("/").slice(-1)[0]);
        data.splice(personIndex);
        res.write("[]");
    } else {
        res.statusCode = 404;
        res.write("Error: Not Found");
    }
    setTimeout(() => {
        res.end();
    })
};

module.exports = app;
