import {Meteor} from 'meteor/meteor';

import {OnGoing} from '../../lib/collections';

Meteor.publish('on-going', function () {
    return OnGoing.find();
});

Meteor.methods({
    'on-going.insert'(){
    }
});