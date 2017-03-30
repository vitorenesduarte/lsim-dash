import {Template} from 'meteor/templating';

import './sidebar.html';

Template.Sidebar.events({
    'click .e-going'(event) {
        event.preventDefault();
        Router.go("going");
    },
    'click .e-done'(event) {
        event.preventDefault();
        Router.go("done");
    }
});
