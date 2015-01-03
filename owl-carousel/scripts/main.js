var items = [
  '<div class="item item-1">\
     <ul class="actions">\
       <li class="action action-been">Been</li>\
       <li class="action action-want">Want</li>\
       <li class="action action-going">Going</li>\
       <li class="action action-not">Fuck Off</li>\
     </ul>\
     <div class="background"></div>\
   </div>',
  '<div class="item item-2">\
     <ul class="actions">\
       <li class="action action-been">Been</li>\
       <li class="action action-want">Want</li>\
       <li class="action action-going">Going</li>\
       <li class="action action-not">Fuck Off</li>\
     </ul>\
     <div class="background"></div>\
   </div>',
  '<div class="item item-3">\
     <ul class="actions">\
       <li class="action action-been">Been</li>\
       <li class="action action-want">Want</li>\
       <li class="action action-going">Going</li>\
       <li class="action action-not">Fuck Off</li>\
     </ul>\
     <div class="background"></div>\
   </div>',
  '<div class="item item-4">\
     <ul class="actions">\
       <li class="action action-been">Been</li>\
       <li class="action action-want">Want</li>\
       <li class="action action-going">Going</li>\
       <li class="action action-not">Fuck Off</li>\
     </ul>\
     <div class="background"></div>\
   </div>',
  '<div class="item item-5">\
     <ul class="actions">\
       <li class="action action-been">Been</li>\
       <li class="action action-want">Want</li>\
       <li class="action action-going">Going</li>\
       <li class="action action-not">Fuck Off</li>\
     </ul>\
     <div class="background"></div>\
    </div>',
  '<div class="item item-6">\
     <ul class="actions">\
       <li class="action action-been">Been</li>\
       <li class="action action-want">Want</li>\
       <li class="action action-going">Going</li>\
       <li class="action action-not">Fuck Off</li>\
     </ul>\
     <div class="background"></div>\
   </div>',
  '<div class="item item-7">\
     <ul class="actions">\
       <li class="action action-been">Been</li>\
       <li class="action action-want">Want</li>\
       <li class="action action-going">Going</li>\
       <li class="action action-not">Fuck Off</li>\
     </ul>\
     <div class="background"></div>\
   </div>'
];



//
var Carousel = function($carousel) {
  this.$carousel = $carousel;
  this.$actions = $carousel.find('.actions');
  this.init();
  this.index = 0;
};

//
Carousel.prototype.init = function() {
  this.$carousel.owlCarousel();
  this.carousel = this.$carousel.data('owlCarousel');
  this.populate();
  this.carousel.reinit({
    slideSpeed: 400,
    singleItem: true,
    mouseDrag: false,
    touchDrag: false
  });
  this.initNav();
};

//
Carousel.prototype.initNav = function() {
  var self = this;

  this.$carousel.on('click', '.action', function() {
    self.next();
  });
};

//
//
Carousel.prototype.removeLast = function() {
  this.carousel.removeItem(this.index + 2);
};

//
Carousel.prototype.getPrefetch = function() {

};

//
Carousel.prototype.prev = function() {
  this.carousel.prev();
  this.index--;
  if (this.index > 1) {
    this.removeLast();
  }
};

//
Carousel.prototype.next = function() {
  var firstIndex = this.index - 2,
      firstItem = items[firstIndex],
      nextItem = items[this.index + 1],
      nextItemPrefetch = items[this.index + 2];

  if (firstItem) {
    this.carousel.removeItem(firstIndex);
  }
  if (nextItemPrefetch) {
    this.carousel.addItem(nextItemPrefetch);
    this.carousel.jumpTo(this.index);
  } else {
    this.getPrefetch();
  }
  this.carousel.next();
  this.index++;
};

//
Carousel.prototype.getPrefetch = function() {
  var self = this;

  this.getData().done(function(data) {
    if (data.length) {
      self.addPrefetchToQueue(data);
      self.carousel.addItem(self.renderItem(data[0]));
    }
  });
};

//
Carousel.prototype.renderItem = function(context) {
  return itemTmpl(context);
};

//
Carousel.prototype.addPrefetchToQueue = function(data) {
  var i;

  for (i = 0; i < data.length; i++) {
    items.push(this.renderItem(data[i]));
  }
};

//
Carousel.prototype.getData = function() {

};

//
Carousel.prototype.populate = function() {
  var i;

  for (i = 0; i < 2; i++) {
    this.carousel.addItem(items[i]);
  }
};



$(function() {
  var $carousel = $('#owl-demo'),
      carousel = new Carousel($carousel);
});
