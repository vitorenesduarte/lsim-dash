import {Running} from '../collections';


GraphController = RouteController.extend({
    subscriptions: function () {
        const timestamp = this.params._timestamp;
        return Meteor.subscribe('graph', timestamp);
    },
    data: function () {
        const timestamp = this.params._timestamp;
        return {graph: Running.find({timestamp: timestamp}).fetch()}
    },
});