var _utils = {
  goToDashboard: function (html) {
    $('#pages-main-content').html(html);
    _users.init();
  }
};