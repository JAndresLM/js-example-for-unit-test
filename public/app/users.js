//To run app in web browser, please comment imports of modules and export at the end of file
// /*
var _uiManager = require("../app/uiManager");
var _builder = require("../app/builder");
// */

var _users =  {

    init: function () {
        _uiManager.hideSaveButton();
        this.getUsers();
    },

    getUsers: function () {
        $.ajax(
            {
                url: "http://jsonplaceholder.typicode.com/users",
                success: function (data) {
                    if (data) {
                        _users.users = data;
                        _users.getPosts();
                    }
                }
            }
        );
    },

    getPosts: function () {
        $.ajax(
            {
                url: "http://jsonplaceholder.typicode.com/posts",
                success: function (data) {
                    _users.posts = data;
                    _users.users = _users.mergePostsIntoUsers(_users.users, _users.posts);
                    _users.displayUsers(_users.users);
                }
            }
        );
    },

    mergePostsIntoUsers: function (usersList,postsList) {
        var users = usersList;
        var posts = postsList;

        users.forEach(function (user) {
            user.posts = posts.filter(function (post) {
                return user.id === post.userId;
            });
        });

        return users;
    },

    displayUsers: function (users) {
        var usersTableHtml = _builder.buildUsersContent(users)
        _uiManager.displayUsersTable(usersTableHtml);
    },

    update: function () {
        _uiManager.displaySaveButton();
    },

    save: function () {
        _uiManager.hideSaveButton();
    },

    displaySelectedUserAddress: function () {
        var resultContent = _builder.buildUserAddress(this.user);
        _uiManager.displayUserAddress(resultContent);
    },

    displaySelectedUserPost: function () {
        var resultContent = _builder.buildUserPost(this.user);
        _uiManager.displayUserPost(resultContent);
    },

    selectUser: function (id) {
        _uiManager.checkSelectedUserCheckBox(id);
        this.user = this.users.find( function (user) {
            return user.id == id;
        });
    },

    users: [],
    template: "templates/dashboard.html"
};

// /*
module.exports = _users;
// */