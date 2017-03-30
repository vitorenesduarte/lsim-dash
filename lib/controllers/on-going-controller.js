import {OnGoing} from '../collections';


OnGoingController = RouteController.extend({
    subscriptions: function () {
        return Meteor.subscribe('on-going');
    },
    data: function () {
        return {going: OnGoing.find().fetch()}
    },
});