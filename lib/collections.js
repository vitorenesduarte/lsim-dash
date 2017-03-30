import {Mongo} from 'meteor/mongo';

export const OnGoing = new Mongo.Collection('on-going');
export const Done = new Mongo.Collection('done');
