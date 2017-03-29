import {Template} from 'meteor/templating';

import './header.html';

Template.Header.events({
    'click .logo'(event) {
        event.preventDefault();
        Router.go("home");
    }
});
