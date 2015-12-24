'use strict';

function ParamException(value) {
  this.value = value;
  this.message = 'Parameters are invalid';
  this.toString = function () {
    return this.value + this.message;
  };
}

exports.ParamException = ParamException;
