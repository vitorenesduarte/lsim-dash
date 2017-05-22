import {Meteor} from 'meteor/meteor';

import {Done} from '../../lib/collections';

Meteor.publish('done', function () {
    return Done.find();
});

Meteor.methods({
    /**
     * Insert/Update a done-simulation.
     *
     * @param timestamp Simulation timestamp.
     * @param data      Simulation data.
     */
    'done.insert'(timestamp, data){
        check(timestamp, String);
        check(data, Object);

        Done.upsert(
            {timestamp: timestamp},
            {$set: data}
        )
    }
});