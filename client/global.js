import {Running} from '../lib/collections';
import {Done} from '../lib/collections';

Template.registerHelper('runningCount', function () {
    return Running.find().count();
});

Template.registerHelper('doneCount', function () {
    return Done.find().count();
});
