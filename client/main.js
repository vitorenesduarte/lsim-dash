import {Template} from 'meteor/templating';

import './main.html';

Template.Main.onRendered(function () {
    // hack to position the footer
    $(window).trigger('resize');
});
