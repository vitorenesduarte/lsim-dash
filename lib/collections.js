import {Mongo} from 'meteor/mongo';

export const Running = new Mongo.Collection('running');
export const Done = new Mongo.Collection('done');
