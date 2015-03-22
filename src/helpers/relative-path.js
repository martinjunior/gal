module.exports.register = function(Handlebars, options) {

    /**
     * Handlebars helper that returns the
     * root path relative to the current path.
     * 
     * @requires Handlebars, assemble
     * @example {{ relative-path }}
     */
    Handlebars.registerHelper('relative-path', function() {

        /**
         * The relative of the file being
         * generated to the root of the project
         *
         * @static
         * @type {String}
         */
        var relativePath = options.pages[0].relativeLink
                                  .replace(/[a-zA-Z0-9_-]+\.html$/, '');

        return relativePath;

    });

};