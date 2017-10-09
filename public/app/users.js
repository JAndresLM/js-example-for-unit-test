var _users = {
  
  init: function () {
    //debugger;
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
            _users.getPosts();
          }
        }
      }
    );
  },

  getPosts: function(){
    $.ajax(
      {
        url: "http://jsonplaceholder.typicode.com/posts",
        success: function (data) {
          _users.posts = data;
          _users.mergePostsIntoUsers();
          _users.displayUsers();
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
    $('#users-table-content').html(_builder.buildUsersContent(this.users));
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
  template: "templates/dashboard.html"
};