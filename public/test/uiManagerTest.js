var user = require("../app/users");
var uiManager = require("../app/uiManager");

var assert = require("assert");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

describe("UI-MANAGER TESTS", function () {

    describe("goToDashboard function", function () {
        
        it("should call init function of users", function () {
            var initFunction = sinon.spy(user, 'init');  

            uiManager.goToDashboard("<h1>testing</h1>");
            initFunction.restore();

            initFunction.should.have.been.calledOnce;
        });
        
    });
});