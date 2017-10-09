var _uiManager = {
  goToDashboard: function (html) {
    $('#pages-main-content').load(html);
    _users.init();
  }
};