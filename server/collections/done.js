import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Done = new Mongo.Collection('done');

Meteor.publish('done', function () {
    return Done.find();
});

Meteor.methods({
    'done.insert'(data){
        check(data.timestamp, String);

        Done.update(
            {timestamp: data.timestamp},
            {},
            {upsert: true}
        )
    }
});