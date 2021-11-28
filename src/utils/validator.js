const { v1, validate } = require('uuid');

const isValid = (person) => {
    if (!validate(person.id)) {
        return false;
    }
    if (!person.name) {
        return false;
    }
    if (!person.age) {
        return false;
    }
    if (!person.hobbies) {
        return false;
    }
    return true;
};

module.exports = isValid;