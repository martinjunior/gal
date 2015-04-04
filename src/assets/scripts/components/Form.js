define(function(require, exports, module) {
    'use strict';
    
    var $ = require('jQuery');

    var Form = function($element) {
        if ($element.length < 1) {
            return;
        }

        this.$element = $element;

        this.$inputs = this.$element.find('input, textarea');

        this.$requiredInputs = this.$inputs.filter('[required]');

        this.$reverseCaptcha = this.$inputs.filter('[name="referral"]');

        this.$successMessage = $(this.$element.data('success-message'));

        this.$errorMessage = $(this.$element.data('error-message'));

        this.numOfReqFields = this.$requiredInputs.length;

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

        this._onSuccessHandler = this._onSuccess.bind(this);

        this._onFailHandler = this._onFail.bind(this);

        return this;
    }

    proto.enable = function() {
        this.$submit.on('click', this._onSubmitHandler);
    }

    proto.toggleError = function(index, isValid) {
        this.$inputs.eq(index).toggleClass('input_error', isValid);
        this.$inputs.eq(index).attr('aria-invalid', isValid);
    }

    proto.checkValidity = function($input) {
        var isValid;

        try {
            isValid = $input.get(0).checkValidity();
        } catch(ex) {
            isValid = !!$input.val();
        }

        return isValid;
    }

    proto.isValid = function() {
        var numOfValidFields = 0;
        var anInputHasBeenFocused;
        var $input;
        var isValid;

        this.$requiredInputs.each(function(i, input) {
            $input = $(input);
            isValid = this.checkValidity($input);

            if (isValid) {
                numOfValidFields++;
            } else if (!anInputHasBeenFocused) {
                $input.focus();

                anInputHasBeenFocused = true;
            }

            this.toggleError(i, !isValid);
        }.bind(this));

        return numOfValidFields === this.numOfReqFields;
    }

    proto.clearInputs = function() {
        var $input;

        this.$inputs.each(function(i, input) {
            $input = $(input);

            if (input.type == ('checkbox' || 'radio')) {
                $input.attr('checked', false);
            }

            $input.val('');
        });
    }

    proto.send = function() {
        $.ajax(
            {
                type: 'POST',
                url: 'functions/send.php',
                data: this.$element.serialize()
            }
        ).success(
            this._onSuccessHandler
        ).fail(
            this._onFailHandler
        );
    }

    proto.hideMessages = function(success) {
        this.$successMessage.hide();
        this.$errorMessage.hide();
    }

    proto.showMessage = function(success) {
        if (success) {
            this.$successMessage.show();
            this.$successMessage.attr('tabindex', 0);
            this.$successMessage.focus();

            return;
        }

        this.$errorMessage.show();
        this.$errorMessage.attr('tabindex', 0);
        this.$errorMessage.focus();
    }

    proto._onSuccess = function(data) {
        this.clearInputs();

        this.$element.addClass('isActive');

        this.showMessage(true);
    }

    proto._onFail = function() {
        this.showMessage();
    }

    proto._onSubmit = function(event) {
        event.preventDefault();

        if (this.isValid() && !this.$reverseCaptcha.val()) {
            this.hideMessages();
            this.send();
        }
    }

    return Form;

});