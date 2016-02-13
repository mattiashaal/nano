(function (root) {

    'use strict';

    function nano(selector) {
        return new dom(selector);
    }

    /**
     * Selector method
     */
    var dom = function (selector) {
        if (!selector) {
            return this;
        }
        this.length = 0;
        this.nodes = [];
        if (selector instanceof HTMLElement || selector instanceof NodeList) {
            this.nodes = (selector.length > 1) ? [].slice.call(selector) : [selector];
        } else if (typeof selector === 'string') {
            if (selector[0] === '<' && selector[selector.length - 1] === '>') {
                this.nodes = [nano.createNode(selector)];
            } else {
                this.nodes = [].slice.call(document.querySelectorAll(selector));
            }
        }
        if (this.nodes.length) {
            this.length = this.nodes.length;
            for (var i = 0; i < this.nodes.length; i++) {
                this[i] = this.nodes[i];
            }
        }
        return this;
    };

    nano.createNode = function (html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        return div.firstChild;
    }

    nano.each = function (collection, callback) {
        var l = collection.length;
        for (var i = 0; i < l; i++) {
            callback.call(collection[i], collection, i);
        }
    }

    /**
     * Callback method on DOMContentLoaded
     * 1. Sanity check.
     * 2. If document is already loaded, run method.
     * 3. Otherwise, wait until document is loaded.
     */
    nano.ready = function (callback) {
        if (typeof callback !== 'function') { // (1)
            return;
        }
        if (document.readyState === 'complete') { // (2)
            return callback();
        }
        document.addEventListener('DOMContentLoaded', callback, false); // (3)
    }

    /**
     * DOM manipulation methods
     */
    nano.fn = dom.prototype = {

        /**
         * Iterates through a collection and calls the callback method on each
         */
        each: function (callback) {
            nano.each(this, callback);
        },

        /**
         * Return first element in array
         */
        first: function () {
            return nano(this[0]);
        },

        /**
         * Return last element in array
         */
        last: function () {
            return nano(this[this.length - 1]);
        },

        /**
         * Show elements in DOM
         */
        show: function () {
            var l = this.length;
            while (l--) {
                this[l].style.display = 'block';
            }
            return this;
        },

        /**
         * Hide elements from DOM
         */
        hide: function () {
            var l = this.length;
            while (l--) {
                this[l].style.display = 'none';
            }
            return this;
        },

        /**
         * Check if element has class
         */
        hasClass: function (className) {
            if (document.documentElement.classList) {
                return this[0].classList.contains(className);
            } else {
                return new RegExp('(^|\\s)' + className + '(\\s|$)').test(this[0].className);
            }
        },

        /**
         * Add class to elements
         */
        addClass: function (className) {
            if (!this.hasClass(className)) {
                if (document.documentElement.classList) {
                    return this.each(function () {
                        this.classList.add(className);
                    });
                } else {
                    return this.each(function () {
                        this.className += ' ' + className;
                    });
                }
            }
        },

        /**
         * Remove class from elements
         */
        removeClass: function (className) {
            if (this.hasClass(className)) {
                if (document.documentElement.classList) {
                    return this.each(function () {
                        this.classList.remove(className);
                    });
                } else {
                    return this.each(function () {
                        this.className = this.className.replace(new RegExp('(^|\\s)*' + className + '(\\s|$)*', 'g'), '');
                    });
                }
            }
        },

        /**
         * Toggle class on elements
         */
        toggleClass: function (className) {
            if (document.documentElement.classList) {
                return this.each(function () {
                    this.classList.toggle(className);
                });
            } else {
                return this.each(function () {
                    if (this.hasClass(className)) {
                        this.removeClass(className);
                    } else {
                        this.addClass(className);
                    }
                });
            }
        },

        /**
         * Add event
         */
        on: function (type, callback) {
            if (document.addEventListener) {
                return this.each(function () {
                    this.addEventListener(type, callback, false);
                });
            } else if (document.attachEvent) {
                return this.each(function () {
                    this.attachEvent('on' + type, callback);
                });
            }
        },

        /**
         * Remove event
         */
        off: function () {
            if (document.removeEventListener) {
                return this.each(function () {
                    this.removeEventListener(type, callback, false);
                });
            } else if (document.detachEvent) {
                return this.each(function () {
                    this.detachEvent('on' + type, callback);
                });
            }
        },

        /**
         * Determine if an element is in viewport
         */
        inview: function () {
            var distance = this[0].getBoundingClientRect();
            if (distance.top <= (window.innerHeight || document.documentElement.clientHeight) && distance.bottom >= 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    root.nano = root.$ = nano;

})(this);
