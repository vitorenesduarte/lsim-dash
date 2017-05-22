import {Running} from '../collections';


RunningController = RouteController.extend({
    data: function () {
        return {running: Running.find().fetch()}
    },
});