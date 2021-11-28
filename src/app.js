const data = require("./data");

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
            data.push(JSON.parse(body));
        })
    } else if (req.url.match(/^\/person\/[a-z0-9]+$/) && req.method === "GET") {
        res.write(req.method);

        res.write("Current person: " + req.url);
    } else if (req.url.match(/^\/person\/[a-z0-9]+$/) && req.method === "POST") {
        res.write(req.method);
        res.write("Current person: " + req.url);
    } else if (req.url.match(/^\/person\/[a-z0-9]+$/) && req.method === "PUT") {
        res.write(req.method);
        res.write("Current person: " + req.url);
    } else if (req.url.match(/^\/person\/[a-z0-9]+$/) && req.method === "DELETE") {
        res.write(req.method);
        res.write("Current person: " + req.url);
    } else {
        res.statusCode = 404;
        res.write("Error: Not Found");
    }

    res.end();
};

module.exports = app;
