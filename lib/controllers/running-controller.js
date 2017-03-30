import {Running} from '../collections';


RunningController = RouteController.extend({
    subscriptions: function () {
        return Meteor.subscribe('running');
    },
    data: function () {
        return {running: Running.find().fetch()}
    },
});