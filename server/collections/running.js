import {Meteor} from 'meteor/meteor';

import {Running} from '../../lib/collections';

Meteor.publish('running', function () {
    return Running.find();
});

Meteor.publish('graph', function(timestamp){
   return Running.find({timestamp: timestamp});
});

Meteor.methods({
    /**
     * Insert/Update a running-simulation.
     *
     * @param timestamp Simulation timestamp.
     * @param data      Simulation data.
     */
    'running.insert'(timestamp, data){
        check(timestamp, String);
        check(data, Object);

        Running.upsert(
            {timestamp: timestamp},
            {$set: data}
        )
    },
    /**
     * Remove non-running simulations.
     *
     * @param timestamps List of timestamps currently active.
     */
    'running.remove'(timestamps) {
        Running.remove({timestamp: {$nin: timestamps}});

        console.log(JSON.stringify(Running.find().fetch(), null, 2));
    },
});