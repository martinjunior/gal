define(function(require, exports, module) {
    'use strict';
    
    var $ = require('jQuery');

    var Form = function($element) {
        if ($element.length < 1) {
            return;
        }

        this.$element = $element;

        this.$inputs = this.$element.find('input').filter('[required]');

        this.numOfReqFields = this.$inputs.length;

        this.$submit = this.$element.find('.js-form-submit');

        this.init();
    }

    var proto = Form.prototype;

    proto.init = function() {
        return this._setupHandlers()
                   .enable();
    }

    proto._setupHandlers = function() {
        this._onSubmitHandler = this._onSubmit.bind(this);

        return this;
    }

    proto.enable = function() {
        this.$submit.on('click', this._onSubmitHandler);
    }

    proto.toggleError = function(index, isValid) {
        this.$inputs.eq(index).toggleClass('input_error', isValid);
    }

    proto.isValid = function() {
        var numOfValidFields = 0;
        var $input;
        var isValid;

        this.$inputs.each(function(i, input) {
            $input = $(input);
            isValid = $input.get(0).checkValidity();

            if (isValid) {
                numOfValidFields++;
            }

            this.toggleError(i, !isValid);
        }.bind(this));

        return numOfValidFields === this.numOfReqFields;
    }

    proto.clearInputs = function() {
        var $input;

        this.$inputs.each(function(i, input) {
            $input = $(input);
            $input.val('');
        });
    }

    proto.send = function() {
        $.ajax({
            type: 'POST',
            url: 'functions/send.php',
            data: this.$element.serialize()
        }).success(function(data) {
            this.clearInputs();
        }.bind(this));
    }

    proto._onSubmit = function(event) {
        event.preventDefault();

        if (this.isValid()) {
            this.send();
        }
    }

    return Form;

});