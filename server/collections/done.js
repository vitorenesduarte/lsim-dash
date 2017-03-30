import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

import {Done} from '../../lib/collections';

Meteor.publish('done', function () {
    return Done.find();
});

Meteor.methods({
    'done.insert'(data){
        check(data.timestamp, String);

        Done.upsert(
            {timestamp: data.timestamp},
            {$set: data}
        )
    }
});