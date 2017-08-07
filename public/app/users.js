var _users = {
  init: function () {
    this.hideSave();
    this.getUsers();
  },
  getUsers: function () {
    $.ajax(
      {
        url: "http://jsonplaceholder.typicode.com/users",
        success: function (data) {
          if (data) {
            _users.users = data;
            $.ajax({
              url: "http://jsonplaceholder.typicode.com/posts",
              success: function (data) {
                _users.posts = data;
                _users.mergePostsIntoUsers();
                _users.displayUsers();
              }
            });
          }
        }
      }
    );
  },
  mergePostsIntoUsers: function () {
    this.users.forEach(function (user) {
      user.posts = _users.posts.filter(function(post){
        return user.id === post.userId;
      });
    });
  },
  displayUsers: function () {
    var displayContent = this.users.reduce(function (result, user) {
      return result + '<tr data-id="' + user.id + '"><td><input type="checkbox" onClick="_users.selectUser(' + user.id + ')"/></td><td><p>' + user.id + '</p></td><td><p>' + user.name + '</p></td><td><p>' + user.email + '</p></td><td><p>' + user.posts[0].title || ''+ '</p></td></tr>';
    }, '');
    $('#users-table-content').html(displayContent);
  },
  displaySave: function() {
    $('#users-save-btn').show();
    $('#users-update-btn').hide();
  },
  hideSave: function() {
    $('#users-save-btn').hide();
    $('#users-update-btn').show();
  },
  update: function () {
    this.displaySave();
  },
  save: function () {
    this.hideSave();
  },
  getCompleteAddress: function () {
    if (this.user) {
      var resultContent = this.user.address.suite + ' ' + this.user.address.street + ', ' + this.user.address.city;
    } else {
      var resultContent = 'No user selected';
    }
    $('#user-actions-result').html(resultContent);
  },
  getCompletePost: function () {
    if (this.user) {
      if (this.user.posts) {
        var resultContent = '&nbsp&nbsp&nbsp&nbsp <b>' + this.user.posts[0].title + '</b><br><br>' + this.user.posts[0].body;
      } else {
        var resultContent = 'No posts available for that user';
      }
    } else {
      var resultContent = 'No user selected';
    }
    $('#user-actions-result').html(resultContent);
  },
  selectUser: function (id) {
    this.unSelectAllUsers();
    var selectedUser = $('#users-table-content').find("[data-id='" + id + "'] > td > input[type=checkbox]")[0];
    selectedUser.checked = true;
    this.user = this.users.find(function(user) {
      return user.id == id; 
    });
  },
  unSelectAllUsers: function () {
    $.each($('#users-table-content > tr > td > input[type=checkbox]'), function (i, value) {
      value.setAttribute('checked', false);
      value.checked = false;
    });
    this.user = null;
  },
  users: [],
  template: "<div class=\"page dashboardPage\"><div class=\"row\"><div class=\"col-sm-6\"><h2>Welcome</h2></div></div><br><div class=\"container-fluid\"><div class=\"row\" ng-if=\"!Users.loading\"><div class=\"col-sm-4\"><input type=\"text\" name=\"name\" class=\"primaryInput\" ng-model=\"Users.search\" placeholder=\"Search...\"></div><div class=\"col-sm-1\"><button id=\"users-update-btn\" type=\"button\" name=\"button\" class=\"btn btn-primary\" onClick=\"_users.update()\">Update Comments</button><button id=\"users-save-btn\"type=\"button\" name=\"button\" class=\"btn btn-success\" onClick=\"_users.save()\">Save</button></div></div><p>Loading...</p><table class=\"table table-striped\"><thead><th></th><th>Id</th><th>Name</th><th>Email</th><th>Last Post</th></thead><tbody id=\"users-table-content\"></tbody></table><div class=\"row\"><div class=\"col-sm-4\"><button onClick=\"_users.getCompleteAddress()\" type=\"button\" name=\"button\" class=\"btn btn-info\">Get Complete Address</button></div><div class=\"col-sm-4\"><button onClick=\"_users.getCompletePost()\" type=\"button\" name=\"button\" class=\"btn btn-info\">Get Complete Post</button></div><div class=\"col-sm-2\"></div></div><div class=\"row\"><div id=\"user-actions-result\" class=\"col-sm-12 jumbotron\"></div></div></div></div>",
};