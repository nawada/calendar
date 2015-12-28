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
        if (err) {
          reject(err);
        } else {
          const categoryArray = new Array();
          for (var i = 0; i < items.length; i ++) {
            const category = items[i];
            const entity = {};
            entity.id    = category.id;
            entity.name  = category.name;
            entity.icon  = category.icon;
            categoryArray.push(entity);  
          }
          resolve(categoryArray);  
        }
      });
    });    
  }

 /**
  * Add NewCategory
  * @param addData
  * @returns Promise
  */  
  create(addData) {
    return new Promise(function (resolve, reject) {
      Category.save(addData, function (err, result) {
        if (err) {
          reject(err);
        } else {
          const entity = {};
          entity.id    = result.id;
          entity.name  = result.name;
          entity.icon  = result.icon;            
          resolve(entity);
        }
      });
    });
  }
  
  /**
  * Update Category
  * @param id
  * @param updateData
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

  /**
  * Delete Category
  * @param id
  * @returns Promise
  */    
  delete(id) {
    const query = {id: id};
    return new Promise(function (resolve, reject) {
      Category.remove(query, function (err) {
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
