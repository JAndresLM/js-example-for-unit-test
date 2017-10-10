//To run app in web browser, please comment imports of modules and export at the end of file
// /*
var _users = require("../app/users");
var jsdom = require("jsdom");
const {JSDOM} = jsdom;
const { document } = (new JSDOM('')).window;
global.document = document;
global.window = document.defaultView;
global.$ = require('jquery');
// */

var _uiManager  = {

    goToDashboard: function (html) {
        $('#pages-main-content').load(html);
        _users.init();
    },

    displaySaveButton: function () {
        $('#users-save-btn').show();
        $('#users-update-btn').hide();
    },

    hideSaveButton: function () {
        $('#users-save-btn').hide();
        $('#users-update-btn').show();
    },

    displayUsersTable: function (htmlTable) {
        $('#users-table-content').html(htmlTable);
    },

    displayUserAddress: function (htmlContent) {
        $('#user-actions-result').html(htmlContent);
    },

    displayUserPost: function (htmlContent) {
        $('#user-actions-result').html(htmlContent);
    },

    checkSelectedUserCheckBox: function (userId) {
        this.unCheckAllCheckboxes();
        var selectedUserCheckbox = $('#users-table-content').find("[data-id='" + userId + "'] > td > input[type=checkbox]")[0];
        selectedUserCheckbox.checked = true;
    },

    unCheckAllCheckboxes: function () {
        $.each($('#users-table-content > tr > td > input[type=checkbox]'), this.setAllCheckedValuesToFalse );
    },

    setAllCheckedValuesToFalse : function (i, value) {
        value.setAttribute('checked', false);
        value.checked = false;
    },

};

// /*
module.exports = _uiManager;
// */