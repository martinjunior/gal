define(function(require, exports, module) {
    'use strict';
    
    var Nav = require('components/Nav');
    var Form = require('components/Form');

    var App = function() {
        var nav = new Nav($('.js-nav'));

        var form = new Form($('.js-form'));
    };

    var proto = App.prototype;

    return App;

});