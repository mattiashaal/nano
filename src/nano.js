(function (root) {

    'use strict';

    var nano = function (selector) {

        if (!(this instanceof nano)) {
            return new nano(selector);
        }

        if (selector instanceof nano) {
            return selector;
        }

        if (selector instanceof HTMLElement || selector instanceof NodeList) {
            this.nodes = (selector.length > 1) ? [].slice.call(selector) : [selector];
        } else if (typeof selector === 'string') {         
            if (new RegExp(/^</).test(selector)) {
                this.nodes = [nano.createNode(selector)];
            } else if (new RegExp(/^\#[\w\-]+$/).test(selector)) {
                return document.getElementById(selector.substr(1));
            } else if (new RegExp(/^\.[\w\-]+$/).test(selector)) {
                this.nodes = document.getElementsByClassName(selector.substr(1));  
            } else if (new RegExp(/^\w+$/).test(selector)) {
                this.nodes = [].slice.call(document.getElementsByTagName(selector));
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

    }

    nano.prototype = {

        /**
         * Extends nano.each()
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
         * Add class to element
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
         * Remove class from element
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
         * Toggle class on element
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
        },

        /**
         * Deal with animation and rendering with requestAnimationFram (rAF)
         */
        rAF: function (callback) {
            var rAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
            var ticking = false;
            function onScroll() {
                requestTick();
            }
            function requestTick() {
                if (!ticking) {
                    rAF(update);
                }
                ticking = true;
            }
            function update() {
                if (ticking) {
                    callback();
                }
                ticking = false; // Reset the tick so we can capture the next onScroll
            }
            if (document.addEventListener) {
                window.addEventListener('scroll', onScroll, false);
            } else if (document.attachEvent) {
                window.attachEvent('on' + 'scroll', onScroll);
            }
        }
    }

    /**
     * Create a new node for DOM
     */
    nano.createNode = function (html) {
        var div = document.createElement('div');
        div.innerHTML = html;
        return div.firstChild;
    }

    /**
     * Loop through a collection and calls the callback method on each
     */
    nano.each = function (collection, callback) {
        for (var i = 0; i < collection.length; i++) {
            callback.call(collection[i], collection, i);
        }
    };

    /**
     * Wait until the DOM is ready before executing code
     */
    nano.ready = function (callback) {
        if (typeof callback !== 'function') {
            return;
        }
        if (document.readyState === 'complete') {
            return callback();
        }
        document.addEventListener('DOMContentLoaded', callback, false);
    }

    root.nano = root.$ = root.n = nano;

})(this);
