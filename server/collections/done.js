import {Meteor} from 'meteor/meteor';

import {Done} from '../../lib/collections';

Meteor.publish('done', function () {
    return Done.find();
});

Meteor.methods({
    'done.insert'(timestamp, data){
        check(timestamp, String);
        check(data, Object);

        Done.upsert(
            {timestamp: timestamp},
            {$set: data}
        )
    }
});