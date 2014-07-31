module.exports = Baratheon;



function Baratheon(opt){
  if (typeof opt !== 'object') throw new TypeError('options should be an object!');
  
  if (typeof opt.name !== 'string') throw new TypeError('name should be a string!');
  this.name = opt.name;

  if (typeof opt.name !== 'string' && typeof opt.name !== 'undefined') throw new TypeError('btn_text should be a string!');
  var link_text = opt.btn_text || 'VVINOO!!'
  this.btn_text = link_text;

  if (typeof opt.html_element !== 'object') throw new TypeError('html_element should be an object!');
  this.el = opt.html_element;

  this.template = require('./template.jade');

}

Baratheon.prototype.wine = function(html_element){
  if (typeof html_element !== 'object') throw new TypeError('html_element should be an object!');
  html_element.html('VINOOOH!!');
}

Baratheon.prototype.too_much_wine = function(){
  if(this.name === "Robert"){
    $('body').html('<div class="too_much_wine">VINOOOH!!</div>');
  }
}

Baratheon.prototype.print_phrases = function(){

  this.el.append(
    this.template({
      name: this.name,
      btn_text: this.btn_text,
      frasi: this.phrases
    })
  );
  var that = this;

  $(document).ready(function(){
    $('.more-wine-for-' + that.name).on('click', function(){
      that.get_robert_phrases(true);
    });
  });
}

Baratheon.prototype.refresh_phrases = function(){
  var template = require('./refresh_template.jade');
  $('.' + this.name + '_list').html(
    template({
      frasi: this.phrases
    })
  );
} 

Baratheon.prototype.get_robert_phrases = function(refresh){

  // per checkare se bisogna refreshare o printare
  var ref = refresh || false;

  var that = this;

  $.ajax ({
    type: 'GET',
    url: 'http://192.168.1.98:3210',
    dataType: 'json',

    success: function (data) {
      if (data.length > 0){
        that.phrases = data;
      } else {
        that.phrases = ['No wine this time! Retry later!'];
      }

      if(ref){
        that.refresh_phrases();
      } else {
        that.print_phrases();
      }
    },
    error: function(XHR, textStatus, errorThrown) {
      that.phrases = ['No more wine for this Baratheon! Retry later!'];
    }
  });

}