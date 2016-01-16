'use strict';
const schema = require('../schemas/eventSchema');
const Event = schema.Event;
const categorySchema = require('../schemas/categorySchema');
const Category = categorySchema.Category;
const async = require('async');

class EventService {
 /**
  * Fetch Events
  * @param query
  * @returns Promise
  */
  fetchList(query) {
    var self = this;
    return new Promise(function (resolve, reject) {
      Event.find({}, function(err, items){
        if (err) {
          console.log('err');
          reject(err);
        } else {
          const eventArray = new Array();
          const callbacks = new Array();
          for (var i = 0; i < items.length; i ++) {
            const event = items[i];
            callbacks.push(function(callback) {        
              setTimeout(function() {
                self.fetchCategory(event, function(err, category) {
                    if (err) {
                      callback(err, null);                    
                    } else {
                      const entity    = {};
                      entity.id       = event.id;
                      entity.name     = event.name;
                      entity.icon     = event.icon;
                      entity.category = category;
                      eventArray.push(entity);
                      callback(null, entity);                    
                    }
                })
              }, 10);
            });
          }
          async.parallel(callbacks,
          function(err, results){
             if (err) {
                 console.log('err');
                 reject(err);
             }
             console.log('all event end'); 
             resolve(eventArray);    
          })
        }
      });
    });    
  }
  
  fetchCategory(event, callback) {
    console.log(event.category);
    Category.find({category: event.category}, function(err, items){
        if (err) {
            console.log('invoke callback');
            callback(err, null);
        } else {
            console.log(items);
            callback(null, items[0]);
        }
    });
  }
}

module.exports = EventService;
