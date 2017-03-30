import {Done} from '../collections';


DoneController = RouteController.extend({
    data: function () {
        return {done: Done.find().fetch()}
    },
});