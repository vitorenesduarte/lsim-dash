import {Template} from 'meteor/templating';

import './home.html';

Template.Home.events({
    'click .e-running'(event) {
        event.preventDefault();
        Router.go("running");
    },
    'click .e-done'(event) {
        event.preventDefault();
        Router.go("done");
    }
});
