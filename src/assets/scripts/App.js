define(function(require, exports, module) {
    'use strict';
    
    var Nav = require('components/Nav');

    var App = function() {
        var nav = new Nav($('.js-nav'));
    };

    var proto = App.prototype;

    return App;

});