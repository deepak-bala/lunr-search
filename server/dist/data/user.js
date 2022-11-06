"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const faker_1 = require("@faker-js/faker");
var UserType;
(function (UserType) {
    UserType["Native"] = "NATIVE";
    UserType["External"] = "EXTERNAL";
})(UserType || (UserType = {}));
const accountId = 5561;
const companyId = 49750;
const companyName = "Rocketlane";
const timeZone = "Asia/Calcutta";
var userStatus;
(function (userStatus) {
    userStatus["Active"] = "ACTIVE";
    userStatus["Inactive"] = "INACTIVE";
})(userStatus || (userStatus = {}));
var identityType;
(function (identityType) {
    identityType["user"] = "USER";
})(identityType || (identityType = {}));
class User {
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createRandomUser() {
    return {
        userName: faker_1.faker.internet.userName(),
        emailId: faker_1.faker.internet.email(),
        userId: faker_1.faker.datatype.number({ min: 82000, max: 92000 }),
        firstName: faker_1.faker.name.firstName(),
        lastName: faker_1.faker.name.lastName(),
        userType: UserType.Native,
        accountId: accountId,
        company: {
            companyId: companyId,
            companyName: companyName,
        },
        timeZone: timeZone,
        userStatus: userStatus.Active,
        identityType: identityType.user,
        createdAt: faker_1.faker.date.past().getTime(),
        loginType: identityType.user,
        fields: [],
        capacity: 40,
        defaultCapacity: true,
        projectId: getRandomIntInclusive(1000, 3000),
    };
}
exports.users = Array.from({ length: 5000 }).map(() => createRandomUser());
//# sourceMappingURL=user.js.map