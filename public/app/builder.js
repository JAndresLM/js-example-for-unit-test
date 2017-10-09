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
};