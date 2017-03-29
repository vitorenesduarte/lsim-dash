import {Template} from 'meteor/templating';

import './not-found.html';

Template.NotFound.events({
    'click .go-home'(event) {
        event.preventDefault();
        Router.go("home");
    }
});
