'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * An event in the TimeLine
 * @type {Schema}
 */
var EventSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: 'An Event',
        trim: true,
        required: true
    },
    notes: {
        type: String,
        default: 'Describe'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    }
});

/**
 * The TimeLine schema
 */
var TimeLineSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: 'Timeline',
        trim: true,
        required: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    events: [EventSchema]
});

/**
 * Validations
 */
TimeLineSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');
EventSchema.path('title').validate(function(title) {
    return title.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
TimeLineSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};

mongoose.model('Event', EventSchema);
mongoose.model('TimeLine', TimeLineSchema);
