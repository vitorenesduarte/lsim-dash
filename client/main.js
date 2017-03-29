import { Template } from 'meteor/templating';

import './main.html';

Template.main.onRendered(function mainOnCreated() {
  // hack to position the footer
  $(window).trigger('resize');
});
