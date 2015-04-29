var HeaderView = require('./view');

/**
 * Create the header controller
 * @constructor
 * @param   {Object}              options
 * @param   {HTMLElement}         options.el
 * @param   {SpaPageCollection}   options.pages
 * @param   {Observable}          options.model
 */
function HeaderController(options) {
  var self    = this;
  this.el     = options.el;
  this.pages  = options.pages;
  this.model  = options.model;

  //setup the view
  this.view = new HeaderView({
    el: this.el
  });

  // === Navigation ===

  //navigate to the specified page when the user clicks a link
  this.view.nav.on('navigate', function(name) {
    self.pages.navigate(name);
  });

  //update the navigation when a new page is displayed
  this.pages.on('display', function() {

    //set the selected page
    self.view.nav.setSelected(self.pages.current().getName());

    //iterate all the pages which have navigation items and disable any pages beyond the first invalid page
    var firstInvalidPageName  = self.model.get('JoinProgress.FirstInvalidPage');
    var firstInvalidPageIndex = self.pages.indexOf(self.pages.findByName(firstInvalidPageName));

    for (var j=0; j<self.pages.count()-1; ++j) { //-1 to ignore the confirmation page since there's no navigation item
      self.view.nav.setDisabled(self.pages.at(j).getName(), j>firstInvalidPageIndex);
    }

  });

  // === Cart ===

  this.model
    .on('saving', function() {
      self.view.cart.setLoading(true);
    })
    .on('saved', function() {
      self.view.cart.setLoading(false);
    })
    .on('price-updated', function(prices) {
      self.view.cart.setTotalPrice(prices.Price);
    })
  ;

}

/**
 * Show the header
 * @returns {HeaderController}
 */
HeaderController.prototype.show = function() {
  this.view.setVisible(true);
  return this;
};

/**
 * Hide the header
 * @returns {HeaderController}
 */
HeaderController.prototype.hide = function() {
  this.view.setVisible(false);
  return this;
};

module.exports = HeaderController;