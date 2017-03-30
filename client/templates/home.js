import {Template} from 'meteor/templating';

import './home.html';

Template.Home.events({
    'click .e-going'(event) {
        event.preventDefault();
        Router.go("going");
    },
    'click .e-done'(event) {
        event.preventDefault();
        Router.go("done");
    }
});
