define(function(require, exports, module) {
    'use strict';
    
    var $ = require('jQuery');

    var $HTML_BODY = $('html, body');

    var CLASSES = {
        IS_ACTIVE: 'isActive',
        BD: 'js-nav-bd',
        NO_SCROLL: 'noScroll'
    }

    var Nav = function($element) {
        this.$element = $element;

        this.$bd = this.$element.find('.' + CLASSES.BD);

        this.$trigger = $(this.$element.data('trigger'));

        this.init();
    };

    var proto = Nav.prototype;

    proto.init = function() {
        return this._setupHandlers()
                   .enable()
    }

    proto._setupHandlers = function() {
        this._onClickNav = this._onClickNav.bind(this);

        this._onClickTrigger = this._onClickTrigger.bind(this);

        return this;
    }

    proto.enable = function() {
        this.$element.on('click', this._onClickNav);

        this.$trigger.on('click', this._onClickTrigger);
        
        return this;
    }

    proto.toggle = function(shouldActivate) {
        this.$element.toggleClass(CLASSES.IS_ACTIVE, shouldActivate);
        $HTML_BODY.toggleClass(CLASSES.NO_SCROLL, shouldActivate);
    }

    proto._onClickNav = function(event) {
        var $target = $(event.target);
        var targetIsBd = $target.get(0) === this.$bd.get(0);
        var targetIsInBd = $target.closest(this.$bd).length > 0;

        if (!targetIsBd && !targetIsInBd) {
            this.toggle(false);
        }
    }

    proto._onClickTrigger = function(event) {
        event.preventDefault();

        this.toggle(true);
    }

    return Nav;

});