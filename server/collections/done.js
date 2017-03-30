import {Meteor} from 'meteor/meteor';

import {Done} from '../../lib/collections';

Meteor.publish('done', function () {
    return Done.find();
});

Meteor.methods({
    'done.insert'(key, value){
        const timestamp = key.split("/")[0];
        console.log(timestamp, value);
        Done.upsert(
            {timestamp: timestamp},
            {$set: {a: 10}}
        )
    }
});