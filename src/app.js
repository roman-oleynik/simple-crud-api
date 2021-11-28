const data = require("./data");
const qs = require("qs");
const isValid = require("./utils/validator");
const { v1, validate } = require('uuid');

const app = (req, res) => {
    try {
        // Decomment the row below if you want to test how the app handles internal server errors
        // throw new Error("some error");

        if (req.url.match(/^\/person\/?$/) && req.method === "GET") {
            res.statusCode = 200;
            res.end(JSON.stringify(data));
        } else if (req.url.match(/^\/person\/?$/) && req.method === "POST") {
            let body = "";
            req.on("data", chunk => {
                body += chunk;
            });
            req.on('end', () => {
                const person = data && data.find(_ => _.id === qs.parse(`${body}`).id);
                const parsedBody = qs.parse(`${body}`);
                parsedBody.id = v1();
                if (person) {
                    res.statusCode = 400;
                    res.end("Error: Person with this id already exists");
                } else if (!isValid(parsedBody)) {
                    res.statusCode = 400;
                    res.end("Error: Person's data is invalid");
                } else {
                    res.statusCode = 201;
                    data.push(parsedBody);
                    res.end(JSON.stringify(parsedBody));
                }
            });
        } else if (req.url.match(/^\/person\/[a-z0-9\-]+$/) && req.method === "GET") {
                const person = data.find(_ => _.id === req.url.split("/").slice(-1)[0]);
                if (person && validate(person.id)) {
                    res.statusCode = 200;
                    res.end(JSON.stringify(person));
                } else if (person && !validate(person.id)) {
                    res.statusCode = 400;
                    res.end("Error: Person's id doesn't correspond to uuid v1");
                } else {
                    res.statusCode = 404;
                    res.end("Error: Person with this id doesn't exist");
                }
        } else if (req.url.match(/^\/person\/[a-z0-9\-]+$/) && req.method === "PUT") {
            const personIndex = data.findIndex(_ => _.id === req.url.split("/").slice(-1)[0]);
                let body = "";
                req.on("data", chunk => {
                    body += chunk;
                });
                req.on('end', () => {
                    const parsedBody = qs.parse(`${body}`);
                    if (data[personIndex] && validate(parsedBody.id)) {
                        data[personIndex] = parsedBody;
                        res.statusCode = 200;
                        res.write(JSON.stringify(parsedBody));
                    } else if (data[personIndex] && !validate(parsedBody.id)) {
                        res.statusCode = 400;
                        res.end("Error: Person's id doesn't correspond to uuid v1");
                    }  else {
                        res.statusCode = 404;
                        res.write("Error: Person is not found");
                    }
                });
        } else if (req.url.match(/^\/person\/[a-z0-9\-]+$/) && req.method === "DELETE") {
            const personIndex = data.findIndex(_ => _.id === req.url.split("/").slice(-1)[0]);
            if (personIndex > -1 && data[personIndex] && validate(data[personIndex].id)) {
                data.splice(personIndex, 1);
                res.statusCode = 204;
                res.end("[]");
            } else if (data[personIndex] && !validate(data[personIndex].id)) {
                res.statusCode = 400;
                res.end("Error: Person's id doesn't correspond to uuid v1");
            } else {
                res.statusCode = 404;
                res.end("Error: Person is not found");
            }
        } else {
            res.statusCode = 404;
            res.write("Error: Invalid request");
        }
        setTimeout(() => {
            res.end();
        })
    } catch (err) {
        res.statusCode = 500;
        res.end("Error: Internal server error!");
    }
};

module.exports = app;
