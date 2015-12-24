'use strict';
const schema = require('../schemas/categorySchema');
const Category = schema.Category;

class CategoryService {
 /**
  * Fetch Categories
  * @returns Promise
  */
  fetchList() {
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
  }

 /**
  * Add NewCategory
  * @returns Promise
  */  
  add(addData) {
    return new Promise(function (resolve, reject) {
      Category.save(addData, function (err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
  
  /**
  * Update Category
  * @returns Promise
  */  
  update(id, updateData) {
    const query = {id: id};
    return new Promise(function (resolve, reject) {
      Category.update(query, updateData, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });     
  }
}

module.exports = CategoryService;
