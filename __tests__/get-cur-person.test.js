const app = require('../src/app');
const qs = require("qs");
const isValid = require("../src/utils/validator");
const { v1, validate } = require('uuid');
const http = require("http");
const { PORT } = require('../src/common/config');



jest.mock("../src/data", () => ([
    {"id":"a86ac470-5083-11ec-aa6d-f5543e9cf5ac","name":"Noname","age":"17","hobbies":['sport']}
]));
jest.mock("qs", () => ({
    parse: (str) => str
}));
jest.mock("uuid", () => ({
    validate: (str) => true
}));

describe("GET /people/:id", () => {
    it("should return a person under /person/:id", async () => {
        const request = {
            url: "/person/a86ac470-5083-11ec-aa6d-f5543e9cf5ac",
            method: "GET"
        }
        const response = {
            statusCode: 0,
            end: jest.fn().mockImplementation((result) => {
                return result;
            })
        }
        await app(request, response)
        expect(await response.statusCode).toBe(200);
        expect(await response.end).toHaveBeenCalledWith(`{"id":"a86ac470-5083-11ec-aa6d-f5543e9cf5ac","name":"Noname","age":"17","hobbies":[\"sport\"]}`);
    });
})