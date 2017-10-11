var user = require("../app/users");
var uiManager = require("../app/uiManager");
var builder = require("../app/builder");
var userTestData = require('./userTestData');

var assert = require("assert");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

var jsdom = require("jsdom");
const {JSDOM} = jsdom;
const { document } = (new JSDOM('')).window;
global.document = document;
global.window = document.defaultView;
global.$ = require('jquery');

describe("USER TESTS", function () {

    describe("init function", function () {

        it("should call function to hide save button", function () {
            var hideSaveButton = sinon.spy(uiManager, 'hideSaveButton');

            user.init();
            hideSaveButton.restore();

            hideSaveButton.should.have.been.calledOnce;
        });

        it("should call function to get users (ajax request function)", function () {
            var getUsers = sinon.spy(user, 'getUsers'); 

            user.init();
            getUsers.restore();

            getUsers.should.have.been.calledOnce;
        });

    });

    describe("GetUsers AJAX Function", function () {

        it('should call ajax request to get users', function () {
            var getUsersAjaxRequest = sinon.spy($,'ajax');

            user.getUsers();

            getUsersAjaxRequest.should.have.been.calledOnce;
            getUsersAjaxRequest.restore();
        });

        /*
        it("should call getPost function on sucess", function () {
            var server = server = sinon.fakeServer.create();
            var getUsersAjaxRequest = sinon.spy();
            var getPostCall = sinon.spy(user, 'getPosts');

            user.getUsers();
        
            server.requests[0].respond(
                200,
                { "Content-Type": "application/json" },
                JSON.stringify([{ id: 1, text: "Provide examples"}])
            );

            getPostCall.should.have.been.calledOnce;
            server.restore();
        });*/

    });

    describe("GetPosts AJAX Function", function () {
        
        it('should call ajax request to get posts', function () {
            var getPostsAjaxRequest = sinon.spy($,'ajax');

            user.getPosts();

            getPostsAjaxRequest.should.have.been.calledOnce;
            getPostsAjaxRequest.restore();
        });

    });

    describe("mergePostsIntoUsers function", function () {

        it("should merge post with users correctly", function () {
            var usersList = userTestData.users;
            var postsList = userTestData.posts;
            var expectedResult = userTestData.usersWithPosts;

            var currentResult = user.mergePostsIntoUsers(usersList,postsList)

            //currentResult.should.equal(expectedResult);
            assert.deepEqual(currentResult[0], expectedResult[0]);
        });

    });

    describe("displayUsers function", function () {

        it("should call function to build users content", function () {
            var buildUsersContent = sinon.spy(builder, 'buildUsersContent');
            var usersWithPosts = userTestData.usersWithPosts;

            user.displayUsers(usersWithPosts);
            buildUsersContent.restore();

            buildUsersContent.should.have.been.calledWith(usersWithPosts);
        });

        it("should call function to display users in GUI", function () {
            var displayUsersTable = sinon.spy(uiManager, 'displayUsersTable');
            var usersWithPosts = userTestData.usersWithPosts;

            user.displayUsers(usersWithPosts);
            displayUsersTable.restore();

            displayUsersTable.should.have.been.calledOnce;
        });
    });

    describe("Update function", function () {

        it("should call function to hide save button", function () {
            var displaySaveButton = sinon.spy(uiManager, 'displaySaveButton');

            user.update();
            displaySaveButton.restore();

            displaySaveButton.should.have.been.calledOnce;
        });

    });

    describe("Save function", function () {

        it("should call function to hide save button", function () {
            var hideSaveButton = sinon.spy(uiManager, 'hideSaveButton');

            user.save();
            hideSaveButton.restore();

            hideSaveButton.should.have.been.calledOnce;
        });

    });

    describe("displaySelectedAddress function", function () {

        it("should call function to build address content", function () {
            var buildUserAddress = sinon.spy(builder, 'buildUserAddress');
            var selectedUser = userTestData.usersWithPosts[0];
            user.user = selectedUser;

            user.displaySelectedUserAddress();
            buildUserAddress.restore();

            buildUserAddress.should.have.been.calledWith(selectedUser);
        });

        it("should call function to display address in GUI", function () {
            var displayUserAddress = sinon.spy(uiManager, 'displayUserAddress');
            user.user = userTestData.usersWithPosts[0];

            user.displaySelectedUserAddress();
            displayUserAddress.restore();

            displayUserAddress.should.have.been.calledOnce;
        });
    });

    describe("displaySelectedUserPost function", function () {

        it("should call function to build post content", function () {
            var buildUserPost = sinon.spy(builder, 'buildUserPost');
            var selectedUser = userTestData.usersWithPosts[0];
            user.user = selectedUser;

            user.displaySelectedUserPost();
            buildUserPost.restore();

            buildUserPost.should.have.been.calledWith(selectedUser);
        });

        it("should call function to display post in GUI", function () {
            var displayUserPost = sinon.spy(uiManager, 'displayUserPost');
            user.user = userTestData.usersWithPosts[0];

            user.displaySelectedUserPost();
            displayUserPost.restore();

            displayUserPost.should.have.been.calledOnce;
        });
    });

    /* Not sure how to deal with undefined checkbox
    describe("selectUser function", function () {

        it("should call function to select checkbox in GUI", function () {
            var checkSelectedUserCheckBox = sinon.spy(uiManager, 'checkSelectedUserCheckBox');
            var userId = 1;

            user.selectUser(userId);
            checkSelectedUserCheckBox.restore();

            checkSelectedUserCheckBox.should.have.been.calledWith(userId);
        });

        it("should find the correct user that match with given ID", function () {
            var userId = 1;
            var expectedUser = userTestData.usersWithPosts[0];
            user.users = userTestData.usersWithPosts;

            user.selectUser(userId);
            var currentUser = user.user;

            currentUser.should.equal(expectedUser);
        });
    });*/


});