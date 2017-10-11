var user = require("../app/users");
var uiManager = require("../app/uiManager");
var builder = require("../app/builder");
var userTestData = require('../test_data/userTestData');
var builderTestData = require('../test_data/builderTestData');

var assert = require("assert");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

describe("BUIDER TESTS", function () {

    describe("buildUsersContent function", function () {
        
        it("should build correct content for given users", function () {
            var usersWithPosts = userTestData.usersWithPosts;
            var expectedContent = builderTestData.userTableRowHTML;

            var currentContent = builder.buildUsersContent(usersWithPosts);  

            currentContent.should.equal(expectedContent);
        });
        
    });

    describe("buildAddressContent function", function () {
        
        it("should build correct address content for given user", function () {
            var selectedUser = userTestData.usersWithPosts[0];
            var expectedAddress = builderTestData.correctAddress;

            var currentAddress = builder.buildUserAddress(selectedUser);  

            currentAddress.should.equal(expectedAddress);
        });

        it("should return correct error message trying to get address when user is not selected", function () {
            var expectedAddress = builderTestData.noUserSelectedToGetAddress;

            var currentAddress = builder.buildUserAddress(null);  

            currentAddress.should.equal(expectedAddress);
        });
        
    });

    describe("buildPostContent function", function () {
        
        it("should build correct post content for given user", function () {
            var selectedUser = userTestData.usersWithPosts[0];
            var expectedPostContent = builderTestData.correctPostContent;

            var currentPostContent = builder.buildUserPost(selectedUser);  

            currentPostContent.should.equal(expectedPostContent);
        });

        it("should return correct error message trying to get posts when user is not selected", function () {
            var expectedPostContent = builderTestData.noUserSelectedToGetPost;

            var currentPostContent = builder.buildUserPost(null);  

            currentPostContent.should.equal(expectedPostContent);
        });

        it("should return correct error message trying to get posts when user does not have anyone", function () {
            var selectedUser = userTestData.users[1];
            var expectedPostContent = builderTestData.noPostForSelectedUser;

            var currentPostContent = builder.buildUserPost(selectedUser);  

            currentPostContent.should.equal(expectedPostContent);
        });
        
    });
});