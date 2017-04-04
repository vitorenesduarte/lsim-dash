import {Meteor} from 'meteor/meteor';

import {Running} from '../../lib/collections';

Meteor.publish('running', function () {
    return Running.find();
});

Meteor.publish('graph', function(timestamp){
   return Running.find({tiemstamp: timestamp});
});

Meteor.methods({
    'running.insert'(timestamp, data){
        check(timestamp, String);
        check(data, Object);

        Running.upsert(
            {timestamp: timestamp},
            {$set: data}
        )
    },
    'running.remove'() {
        Running.remove({});
    },
});