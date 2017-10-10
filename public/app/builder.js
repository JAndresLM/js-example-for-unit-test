//To run app in web browser, please comment imports of modules and export at the end of file

var _builder = {

    buildUsersContent:function (users) {
        var usersContent = users.reduce(this.buildUserRows,'');
        return usersContent;
    },

    buildUserRows: function(result, user){
        var row = (
          '<tr data-id="' + user.id +'">'+
            '<td><input type="checkbox" onClick="_users.selectUser(' + user.id + ')"/></td>'+
            '<td><p>' + user.id +'</p></td>'+
            '<td><p>' + user.name + '</p></td>'+
            '<td><p>' + user.email + '</p></td>'+
            '<td><p>' + user.posts[0].title || ''+ '</p></td>'+
          '</tr>'
        );
        return result + row;
    }, 

    buildUserAddress: function (selectedUser) {
        var resultContent;
        if (selectedUser) {
            resultContent = (
                selectedUser.address.suite + ' ' + 
                selectedUser.address.street + ', ' + 
                selectedUser.address.city
            );
        } else {
            resultContent = 'Unable to Get Address - No user selected';
        }
        return resultContent;
    },
    
    buildUserPost: function (selectedUser) {
        var resultContent;
        if (selectedUser) {
            if (selectedUser.posts) {
                resultContent = (
                    '<b>' + selectedUser.posts[0].title + '</b>'+
                    '<br><br>' + selectedUser.posts[0].body
                );
            } else {
                resultContent = 'No posts available for that user';
            }
        } else {
          resultContent = 'Unable to Get Posts - No user selected';
        }
        return resultContent;
    },
};

// /*
module.exports = _builder;
//*/