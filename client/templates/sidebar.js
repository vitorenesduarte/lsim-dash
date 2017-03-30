import {Template} from 'meteor/templating';

import './sidebar.html';

Template.Sidebar.events({
    'click .e-running'(event) {
        event.preventDefault();
        Router.go("running");
    },
    'click .e-done'(event) {
        event.preventDefault();
        Router.go("done");
    }
});
