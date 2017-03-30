import {Done} from '../collections';


DoneController = RouteController.extend({
    subscriptions: function () {
        return Meteor.subscribe('done');
    },
    data: function () {
        return {done: Done.find().fetch()}
    },
});