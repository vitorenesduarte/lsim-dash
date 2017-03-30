import {Meteor} from 'meteor/meteor';

import {Running} from '../../lib/collections';

Meteor.publish('running', function () {
    return Running.find();
});

Meteor.methods({
    'running.insert'(){
    }
});