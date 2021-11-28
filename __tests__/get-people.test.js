const app = require('../src/app');



jest.mock("../src/data", () => ([]));
jest.mock("qs", () => ({
    parse: (str) => str
}));
jest.mock("uuid", () => ({
    validate: (str) => true
}));

describe("GET /people", () => {
    
    it("should return [] under /person", async () => {
        const request = {
            url: "/person",
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
        expect(await response.end).toHaveBeenCalledWith("[]");
    });
    
})