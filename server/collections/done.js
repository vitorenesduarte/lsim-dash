import {Meteor} from 'meteor/meteor';

import {Done} from '../../lib/collections';

Meteor.publish('done', function () {
    return Done.find();
});

Meteor.methods({
    'done.insert'(key, value){
        check(key, String);
        check(value, Object);

        const timestamp = key.split("/")[0];
        Done.upsert(
            {timestamp: timestamp},
            {$set: value}
        )
    }
});