var View          = require('view');
var ViewMixins    = require('view-mixins');

var StickyHeader  = require('sticky-header');
var NavView       = require('jol-header-nav-view');
var CartView      = require('jol-header-cart-view');

/**
 * Header view
 * @class
 */
var HeaderView = View.extend({

  /**
   * Compose the view from other views
   */
  init: function() {

    //setup the sticky header
    new StickyHeader(
      this.el.querySelector('.js-sticky')
    );

    //the navigation view
    this.nav = new NavView({
      el: this.el.querySelector('.js-nav')
    });

    /** @private */
    this.cart = new CartView({
      el: this.el.querySelector('.js-cart')
    });

  }

});
ViewMixins.visibility(HeaderView.prototype);

module.exports = HeaderView;