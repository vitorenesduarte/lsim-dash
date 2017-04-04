import {Running} from '../collections';


GraphController = RouteController.extend({
    waitOn: function () {
        const timestamp = this.params._timestamp;
        Meteor.subscribe('graph', timestamp);
    },
    data: function () {
        const timestamp = this.params._timestamp;
        return {graph: Running.findOne({timestamp: timestamp})}
    },
});