'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    Event = mongoose.model('Event'),
    TimeLine = mongoose.model('TimeLine');

//Globals
var user;
var timeline, eventa, eventb, tlid;

// The Tests
describe('<Unit Test>', function() {
    describe('Model TimeLine:', function() {
        beforeEach(function(done){
            timeline = new TimeLine({
                title: 'New Timeline',
            });
            eventa = new Event({
                    title: 'First Event',
                    note: 'This is the first event',
                    startDate: '2014-04-02'
                });
            eventb = new Event({
                    title: 'Second Event',
                    note: 'This is the second event',
                    startDate: '2014-03-03',
                    endDate: '2014-03-06'
                });
            done();
        });
        describe('Method Save', function() {
            it('should be able to save without problems', function(done) {
                return timeline.save(function(err) {
                    should.not.exist(err);
                    done();
                });
            });
            it('should show an error when there is no title', function(done) {
                timeline.title = '';
                return timeline.save(function(err) {
                    should.exist(err);
                    done();
                });
            });
        });
        describe('Method Add Event', function() {
            it('should show that there are no events in the timeline', function(done){
                timeline.title = 'Event test timeline';
                timeline.events.should.have.length(0);
                timeline.save(function(err) {
                    tlid = timeline._id;
                    should.not.exist(err);
                    done();
                });
            });
            it('should show that there is one event in the timeline', function(done){
                TimeLine.findById(tlid, function(err, timeline) {
                    timeline.events.push(eventa);
                    timeline.events.should.have.length(1);
                    timeline.save(function(err) {
                        should.not.exist(err);
                        done();
                    });
                });
            });
            it('should show that there are two events in the timeline', function(done){
                TimeLine.findById(tlid, function(err, timeline) {
                    timeline.events.push(eventb);
                    timeline.events.should.have.length(2);
                    timeline.save(function(err) {
                        should.not.exist(err);
                        done();
                    });
                });
            });
            it('should check the events are in date order', function(done) {
                TimeLine.findById(tlid, function(err, timeline) {
                    var eva = timeline.events[0];
                    var evb = timeline.events[1];
                    eva.startDate.should.be.above(evb.startDate);
                    // console.log('Dates: ' + eva.startDate + ' ' + evb.startDate);
                    done();
                });
            });
            it('should not allow an event without a startDate', function(done) {
                var eventc = {title: 'A bad event'};
                TimeLine.findById(tlid, function(err, timeline) {
                    timeline.events.push(eventc);
                    timeline.save(function(err) {
                        should.exist(err);
                        console.log(err);
                        done();
                    });
                });
            })
        });
        // afterEach(function(done) {
        //     done();
        // });
        after(function(done){
            TimeLine.remove().exec();
            done();
        });

    });
});
