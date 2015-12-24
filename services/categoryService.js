'use strict';
var schema = require('../schemas/categorySchema');
var Category = schema.Category;
var service = {};
module.exports = service;

/**
 * 全カテゴリを取得する
 * @returns Promise
 */
service.fetchList = function () {
  return new Promise(function (resolve, reject) {
    Category.find({}, function(err, items){
      resolve(items);
      if (err) {
        reject(err);
      } else {
        resolve(items);
      }
    });
  });
};





