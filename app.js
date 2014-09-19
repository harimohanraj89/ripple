// ------------
// SETTINGS
// ------------

var totalSize = 500;
var num = 20;
var size = Math.floor(totalSize/num);
var rippleTime = 100;

// ------------
// SQUARE GENERATION AND PLACEMENT
// ------------

var positionSquares = function() {
  $('#container').width(totalSize);

  for (var i = 0; i < num; i++) {
    for (var j = 0; j < num; j++) {
      createSquare(i, j);
    }
  }
}

var createSquare = function(i, j) {
  $('<div class="square">')
    .attr('id', j + '-' + i)
    .data('x', j)
    .data('y', i)
    .css('position', 'absolute')
    .css('left', j * size)
    .css('top', i * size)
    .css('width', size - 1)
    .css('height', size - 1)
    .appendTo('#container');
}

var init = function() {
  console.log("Loaded bro");
  positionSquares();
  $('.square').click(function() { ripple($(this)) });
}

window.onload = init;

// ------------
// ANIMATION
// ------------

var flash = function(square) {
  square.animate({
    backgroundColor: '#77f'
  }, 100, function() {
    square.animate({
      backgroundColor: '#f77'
    }, 300);
  });
}

var ripple = function(square) {
  originX = square.data('x');
  originY = square.data('y');
  $('.square').each(function() {
    var x = $(this).data('x');
    var y = $(this).data('y');
    var time = Math.floor(rippleTime * distance(x, y, originX, originY));
    setTimeout(function() {
      flash($(this));
    }.bind(this), time);
  })
}

// ------------
// UTILITIES
// ------------

var distance = function(ax, ay, bx, by) {
  return Math.sqrt((ax - bx) * (ax - bx) + (ay - by) * (ay - by));
}
