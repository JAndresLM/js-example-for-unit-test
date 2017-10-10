var user = require("../app/users");
var uiManager = require("../app/uiManager");
var builder = require("../app/builder");

var assert = require("assert");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");

describe("USER TESTS", function () {
    describe("init function", function () {

        it("should call function to hide save button", function () {
            var hideSaveButton = sinon.spy(uiManager, 'hideSaveButton');  
            user.init();
            hideSaveButton.restore();
            sinon.assert.calledOnce(hideSaveButton);
        });

        it("should call function to get users (ajax request function)", function () {
            var getUsers = sinon.spy(user, 'getUsers');  
            user.init();
            getUsers.restore();
            sinon.assert.calledOnce(getUsers);
        });

    });
});