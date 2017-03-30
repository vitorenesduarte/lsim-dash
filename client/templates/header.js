import {Template} from 'meteor/templating';

import './header.html';

Template.Header.events({
    'click .e-home'(event) {
        event.preventDefault();
        Router.go("home");
    }
});
