(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/home/gottino/CorsoNode/componentExercise/component/base.js":[function(require,module,exports){
var baratheon = require('./wine/Baratheon.js');
var template = require('./basetemplate.jade');


// robert
var robert_opts = { html_element: $('#rob'), name: 'Robert'}
robert = new baratheon(robert_opts);
robert.get_robert_phrases();


// stannis
var stannis_opts = { html_element: $('#rob'), name: 'Stannis', btn_text: 'Se vuoi un glabro trovati Stannis!' }
stannis = new baratheon(stannis_opts);
stannis.get_robert_phrases();





},{"./basetemplate.jade":"/home/gottino/CorsoNode/componentExercise/component/basetemplate.jade","./wine/Baratheon.js":"/home/gottino/CorsoNode/componentExercise/component/wine/Baratheon.js"}],"/home/gottino/CorsoNode/componentExercise/component/basetemplate.jade":[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (name, btn_text) {
buf.push("<div class=\"baratheon-component\"><h2>" + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + "</h2><a href=\"#\"" + (jade.cls(['button more-wine-for-' + (name) + ''], [true])) + ">" + (jade.escape((jade_interp = btn_text) == null ? '' : jade_interp)) + "</a><h3>Come sarebbe a dire!</h3><ul" + (jade.cls(['' + (name) + '_list'], [true])) + "></ul></div>");}("name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined,"btn_text" in locals_for_with?locals_for_with.btn_text:typeof btn_text!=="undefined"?btn_text:undefined));;return buf.join("");
};
},{"jade/runtime":"/home/gottino/CorsoNode/componentExercise/node_modules/jade/runtime.js"}],"/home/gottino/CorsoNode/componentExercise/component/wine/Baratheon.js":[function(require,module,exports){
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
},{"./refresh_template.jade":"/home/gottino/CorsoNode/componentExercise/component/wine/refresh_template.jade","./template.jade":"/home/gottino/CorsoNode/componentExercise/component/wine/template.jade"}],"/home/gottino/CorsoNode/componentExercise/component/wine/refresh_template.jade":[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (frasi) {
// iterate frasi
;(function(){
  var $$obj = frasi;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</li>");
    }

  }
}).call(this);
}("frasi" in locals_for_with?locals_for_with.frasi:typeof frasi!=="undefined"?frasi:undefined));;return buf.join("");
};
},{"jade/runtime":"/home/gottino/CorsoNode/componentExercise/node_modules/jade/runtime.js"}],"/home/gottino/CorsoNode/componentExercise/component/wine/template.jade":[function(require,module,exports){
var jade = require("jade/runtime");

module.exports = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (name, btn_text, frasi) {
buf.push("<div class=\"baratheon-component\"><h2>" + (jade.escape((jade_interp = name) == null ? '' : jade_interp)) + "</h2><a href=\"#\"" + (jade.cls(['button more-wine-for-' + (name) + ''], [true])) + ">" + (jade.escape((jade_interp = btn_text) == null ? '' : jade_interp)) + "</a><h3>Come sarebbe a dire!</h3><ul" + (jade.cls(['' + (name) + '_list'], [true])) + ">");
// iterate frasi
;(function(){
  var $$obj = frasi;
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var val = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var val = $$obj[$index];

buf.push("<li>" + (jade.escape(null == (jade_interp = val) ? "" : jade_interp)) + "</li>");
    }

  }
}).call(this);

buf.push("</ul></div>");}("name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined,"btn_text" in locals_for_with?locals_for_with.btn_text:typeof btn_text!=="undefined"?btn_text:undefined,"frasi" in locals_for_with?locals_for_with.frasi:typeof frasi!=="undefined"?frasi:undefined));;return buf.join("");
};
},{"jade/runtime":"/home/gottino/CorsoNode/componentExercise/node_modules/jade/runtime.js"}],"/home/gottino/CorsoNode/componentExercise/node_modules/jade/runtime.js":[function(require,module,exports){
(function (global){
!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.jade=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
'use strict';

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = merge(attrs, a[i]);
    }
    return attrs;
  }
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    a['class'] = ac.concat(bc).filter(nulls);
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {*} val
 * @return {Boolean}
 * @api private
 */

function nulls(val) {
  return val != null && val !== '';
}

/**
 * join array as classes.
 *
 * @param {*} val
 * @return {String}
 */
exports.joinClasses = joinClasses;
function joinClasses(val) {
  return Array.isArray(val) ? val.map(joinClasses).filter(nulls).join(' ') : val;
}

/**
 * Render the given classes.
 *
 * @param {Array} classes
 * @param {Array.<Boolean>} escaped
 * @return {String}
 */
exports.cls = function cls(classes, escaped) {
  var buf = [];
  for (var i = 0; i < classes.length; i++) {
    if (escaped && escaped[i]) {
      buf.push(exports.escape(joinClasses([classes[i]])));
    } else {
      buf.push(joinClasses(classes[i]));
    }
  }
  var text = joinClasses(buf);
  if (text.length) {
    return ' class="' + text + '"';
  } else {
    return '';
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = function attr(key, val, escaped, terse) {
  if ('boolean' == typeof val || null == val) {
    if (val) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    } else {
      return '';
    }
  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
  } else if (escaped) {
    return ' ' + key + '="' + exports.escape(val) + '"';
  } else {
    return ' ' + key + '="' + val + '"';
  }
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 */
exports.attrs = function attrs(obj, terse){
  var buf = [];

  var keys = Object.keys(obj);

  if (keys.length) {
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('class' == key) {
        if (val = joinClasses(val)) {
          buf.push(' ' + key + '="' + val + '"');
        }
      } else {
        buf.push(exports.attr(key, val, false, terse));
      }
    }
  }

  return buf.join('');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  var result = String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
  if (result === '' + html) return html;
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || _dereq_('fs').readFileSync(filename, 'utf8')
  } catch (ex) {
    rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

},{"fs":2}],2:[function(_dereq_,module,exports){

},{}]},{},[1])
(1)
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},["/home/gottino/CorsoNode/componentExercise/component/base.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi91c3IvbG9jYWwvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9nb3R0aW5vL0NvcnNvTm9kZS9jb21wb25lbnRFeGVyY2lzZS9jb21wb25lbnQvYmFzZS5qcyIsIi9ob21lL2dvdHRpbm8vQ29yc29Ob2RlL2NvbXBvbmVudEV4ZXJjaXNlL2NvbXBvbmVudC9iYXNldGVtcGxhdGUuamFkZSIsIi9ob21lL2dvdHRpbm8vQ29yc29Ob2RlL2NvbXBvbmVudEV4ZXJjaXNlL2NvbXBvbmVudC93aW5lL0JhcmF0aGVvbi5qcyIsIi9ob21lL2dvdHRpbm8vQ29yc29Ob2RlL2NvbXBvbmVudEV4ZXJjaXNlL2NvbXBvbmVudC93aW5lL3JlZnJlc2hfdGVtcGxhdGUuamFkZSIsIi9ob21lL2dvdHRpbm8vQ29yc29Ob2RlL2NvbXBvbmVudEV4ZXJjaXNlL2NvbXBvbmVudC93aW5lL3RlbXBsYXRlLmphZGUiLCIvaG9tZS9nb3R0aW5vL0NvcnNvTm9kZS9jb21wb25lbnRFeGVyY2lzZS9ub2RlX21vZHVsZXMvamFkZS9ydW50aW1lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYmFyYXRoZW9uID0gcmVxdWlyZSgnLi93aW5lL0JhcmF0aGVvbi5qcycpO1xudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9iYXNldGVtcGxhdGUuamFkZScpO1xuXG5cbi8vIHJvYmVydFxudmFyIHJvYmVydF9vcHRzID0geyBodG1sX2VsZW1lbnQ6ICQoJyNyb2InKSwgbmFtZTogJ1JvYmVydCd9XG5yb2JlcnQgPSBuZXcgYmFyYXRoZW9uKHJvYmVydF9vcHRzKTtcbnJvYmVydC5nZXRfcm9iZXJ0X3BocmFzZXMoKTtcblxuXG4vLyBzdGFubmlzXG52YXIgc3Rhbm5pc19vcHRzID0geyBodG1sX2VsZW1lbnQ6ICQoJyNyb2InKSwgbmFtZTogJ1N0YW5uaXMnLCBidG5fdGV4dDogJ1NlIHZ1b2kgdW4gZ2xhYnJvIHRyb3ZhdGkgU3Rhbm5pcyEnIH1cbnN0YW5uaXMgPSBuZXcgYmFyYXRoZW9uKHN0YW5uaXNfb3B0cyk7XG5zdGFubmlzLmdldF9yb2JlcnRfcGhyYXNlcygpO1xuXG5cblxuXG4iLCJ2YXIgamFkZSA9IHJlcXVpcmUoXCJqYWRlL3J1bnRpbWVcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVtcGxhdGUobG9jYWxzKSB7XG52YXIgYnVmID0gW107XG52YXIgamFkZV9taXhpbnMgPSB7fTtcbnZhciBqYWRlX2ludGVycDtcbjt2YXIgbG9jYWxzX2Zvcl93aXRoID0gKGxvY2FscyB8fCB7fSk7KGZ1bmN0aW9uIChuYW1lLCBidG5fdGV4dCkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJiYXJhdGhlb24tY29tcG9uZW50XFxcIj48aDI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gbmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oMj48YSBocmVmPVxcXCIjXFxcIlwiICsgKGphZGUuY2xzKFsnYnV0dG9uIG1vcmUtd2luZS1mb3ItJyArIChuYW1lKSArICcnXSwgW3RydWVdKSkgKyBcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBidG5fdGV4dCkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9hPjxoMz5Db21lIHNhcmViYmUgYSBkaXJlITwvaDM+PHVsXCIgKyAoamFkZS5jbHMoWycnICsgKG5hbWUpICsgJ19saXN0J10sIFt0cnVlXSkpICsgXCI+PC91bD48L2Rpdj5cIik7fShcIm5hbWVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm5hbWU6dHlwZW9mIG5hbWUhPT1cInVuZGVmaW5lZFwiP25hbWU6dW5kZWZpbmVkLFwiYnRuX3RleHRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmJ0bl90ZXh0OnR5cGVvZiBidG5fdGV4dCE9PVwidW5kZWZpbmVkXCI/YnRuX3RleHQ6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBCYXJhdGhlb247XG5cblxuXG5mdW5jdGlvbiBCYXJhdGhlb24ob3B0KXtcbiAgaWYgKHR5cGVvZiBvcHQgIT09ICdvYmplY3QnKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb25zIHNob3VsZCBiZSBhbiBvYmplY3QhJyk7XG4gIFxuICBpZiAodHlwZW9mIG9wdC5uYW1lICE9PSAnc3RyaW5nJykgdGhyb3cgbmV3IFR5cGVFcnJvcignbmFtZSBzaG91bGQgYmUgYSBzdHJpbmchJyk7XG4gIHRoaXMubmFtZSA9IG9wdC5uYW1lO1xuXG4gIGlmICh0eXBlb2Ygb3B0Lm5hbWUgIT09ICdzdHJpbmcnICYmIHR5cGVvZiBvcHQubmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHRocm93IG5ldyBUeXBlRXJyb3IoJ2J0bl90ZXh0IHNob3VsZCBiZSBhIHN0cmluZyEnKTtcbiAgdmFyIGxpbmtfdGV4dCA9IG9wdC5idG5fdGV4dCB8fCAnVlZJTk9PISEnXG4gIHRoaXMuYnRuX3RleHQgPSBsaW5rX3RleHQ7XG5cbiAgaWYgKHR5cGVvZiBvcHQuaHRtbF9lbGVtZW50ICE9PSAnb2JqZWN0JykgdGhyb3cgbmV3IFR5cGVFcnJvcignaHRtbF9lbGVtZW50IHNob3VsZCBiZSBhbiBvYmplY3QhJyk7XG4gIHRoaXMuZWwgPSBvcHQuaHRtbF9lbGVtZW50O1xuXG4gIHRoaXMudGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlLmphZGUnKTtcblxufVxuXG5CYXJhdGhlb24ucHJvdG90eXBlLndpbmUgPSBmdW5jdGlvbihodG1sX2VsZW1lbnQpe1xuICBpZiAodHlwZW9mIGh0bWxfZWxlbWVudCAhPT0gJ29iamVjdCcpIHRocm93IG5ldyBUeXBlRXJyb3IoJ2h0bWxfZWxlbWVudCBzaG91bGQgYmUgYW4gb2JqZWN0IScpO1xuICBodG1sX2VsZW1lbnQuaHRtbCgnVklOT09PSCEhJyk7XG59XG5cbkJhcmF0aGVvbi5wcm90b3R5cGUudG9vX211Y2hfd2luZSA9IGZ1bmN0aW9uKCl7XG4gIGlmKHRoaXMubmFtZSA9PT0gXCJSb2JlcnRcIil7XG4gICAgJCgnYm9keScpLmh0bWwoJzxkaXYgY2xhc3M9XCJ0b29fbXVjaF93aW5lXCI+VklOT09PSCEhPC9kaXY+Jyk7XG4gIH1cbn1cblxuQmFyYXRoZW9uLnByb3RvdHlwZS5wcmludF9waHJhc2VzID0gZnVuY3Rpb24oKXtcblxuICB0aGlzLmVsLmFwcGVuZChcbiAgICB0aGlzLnRlbXBsYXRlKHtcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIGJ0bl90ZXh0OiB0aGlzLmJ0bl90ZXh0LFxuICAgICAgZnJhc2k6IHRoaXMucGhyYXNlc1xuICAgIH0pXG4gICk7XG4gIHZhciB0aGF0ID0gdGhpcztcblxuICAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xuICAgICQoJy5tb3JlLXdpbmUtZm9yLScgKyB0aGF0Lm5hbWUpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICB0aGF0LmdldF9yb2JlcnRfcGhyYXNlcyh0cnVlKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbkJhcmF0aGVvbi5wcm90b3R5cGUucmVmcmVzaF9waHJhc2VzID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi9yZWZyZXNoX3RlbXBsYXRlLmphZGUnKTtcbiAgJCgnLicgKyB0aGlzLm5hbWUgKyAnX2xpc3QnKS5odG1sKFxuICAgIHRlbXBsYXRlKHtcbiAgICAgIGZyYXNpOiB0aGlzLnBocmFzZXNcbiAgICB9KVxuICApO1xufSBcblxuQmFyYXRoZW9uLnByb3RvdHlwZS5nZXRfcm9iZXJ0X3BocmFzZXMgPSBmdW5jdGlvbihyZWZyZXNoKXtcblxuICAvLyBwZXIgY2hlY2thcmUgc2UgYmlzb2duYSByZWZyZXNoYXJlIG8gcHJpbnRhcmVcbiAgdmFyIHJlZiA9IHJlZnJlc2ggfHwgZmFsc2U7XG5cbiAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICQuYWpheCAoe1xuICAgIHR5cGU6ICdHRVQnLFxuICAgIHVybDogJ2h0dHA6Ly8xOTIuMTY4LjEuOTg6MzIxMCcsXG4gICAgZGF0YVR5cGU6ICdqc29uJyxcblxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKXtcbiAgICAgICAgdGhhdC5waHJhc2VzID0gZGF0YTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoYXQucGhyYXNlcyA9IFsnTm8gd2luZSB0aGlzIHRpbWUhIFJldHJ5IGxhdGVyISddO1xuICAgICAgfVxuXG4gICAgICBpZihyZWYpe1xuICAgICAgICB0aGF0LnJlZnJlc2hfcGhyYXNlcygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5wcmludF9waHJhc2VzKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24oWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuICAgICAgdGhhdC5waHJhc2VzID0gWydObyBtb3JlIHdpbmUgZm9yIHRoaXMgQmFyYXRoZW9uISBSZXRyeSBsYXRlciEnXTtcbiAgICB9XG4gIH0pO1xuXG59IiwidmFyIGphZGUgPSByZXF1aXJlKFwiamFkZS9ydW50aW1lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRlbXBsYXRlKGxvY2Fscykge1xudmFyIGJ1ZiA9IFtdO1xudmFyIGphZGVfbWl4aW5zID0ge307XG52YXIgamFkZV9pbnRlcnA7XG47dmFyIGxvY2Fsc19mb3Jfd2l0aCA9IChsb2NhbHMgfHwge30pOyhmdW5jdGlvbiAoZnJhc2kpIHtcbi8vIGl0ZXJhdGUgZnJhc2lcbjsoZnVuY3Rpb24oKXtcbiAgdmFyICQkb2JqID0gZnJhc2k7XG4gIGlmICgnbnVtYmVyJyA9PSB0eXBlb2YgJCRvYmoubGVuZ3RoKSB7XG5cbiAgICBmb3IgKHZhciAkaW5kZXggPSAwLCAkJGwgPSAkJG9iai5sZW5ndGg7ICRpbmRleCA8ICQkbDsgJGluZGV4KyspIHtcbiAgICAgIHZhciB2YWwgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHZhbCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9saT5cIik7XG4gICAgfVxuXG4gIH0gZWxzZSB7XG4gICAgdmFyICQkbCA9IDA7XG4gICAgZm9yICh2YXIgJGluZGV4IGluICQkb2JqKSB7XG4gICAgICAkJGwrKzsgICAgICB2YXIgdmFsID0gJCRvYmpbJGluZGV4XTtcblxuYnVmLnB1c2goXCI8bGk+XCIgKyAoamFkZS5lc2NhcGUobnVsbCA9PSAoamFkZV9pbnRlcnAgPSB2YWwpID8gXCJcIiA6IGphZGVfaW50ZXJwKSkgKyBcIjwvbGk+XCIpO1xuICAgIH1cblxuICB9XG59KS5jYWxsKHRoaXMpO1xufShcImZyYXNpXCIgaW4gbG9jYWxzX2Zvcl93aXRoP2xvY2Fsc19mb3Jfd2l0aC5mcmFzaTp0eXBlb2YgZnJhc2khPT1cInVuZGVmaW5lZFwiP2ZyYXNpOnVuZGVmaW5lZCkpOztyZXR1cm4gYnVmLmpvaW4oXCJcIik7XG59OyIsInZhciBqYWRlID0gcmVxdWlyZShcImphZGUvcnVudGltZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0ZW1wbGF0ZShsb2NhbHMpIHtcbnZhciBidWYgPSBbXTtcbnZhciBqYWRlX21peGlucyA9IHt9O1xudmFyIGphZGVfaW50ZXJwO1xuO3ZhciBsb2NhbHNfZm9yX3dpdGggPSAobG9jYWxzIHx8IHt9KTsoZnVuY3Rpb24gKG5hbWUsIGJ0bl90ZXh0LCBmcmFzaSkge1xuYnVmLnB1c2goXCI8ZGl2IGNsYXNzPVxcXCJiYXJhdGhlb24tY29tcG9uZW50XFxcIj48aDI+XCIgKyAoamFkZS5lc2NhcGUoKGphZGVfaW50ZXJwID0gbmFtZSkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9oMj48YSBocmVmPVxcXCIjXFxcIlwiICsgKGphZGUuY2xzKFsnYnV0dG9uIG1vcmUtd2luZS1mb3ItJyArIChuYW1lKSArICcnXSwgW3RydWVdKSkgKyBcIj5cIiArIChqYWRlLmVzY2FwZSgoamFkZV9pbnRlcnAgPSBidG5fdGV4dCkgPT0gbnVsbCA/ICcnIDogamFkZV9pbnRlcnApKSArIFwiPC9hPjxoMz5Db21lIHNhcmViYmUgYSBkaXJlITwvaDM+PHVsXCIgKyAoamFkZS5jbHMoWycnICsgKG5hbWUpICsgJ19saXN0J10sIFt0cnVlXSkpICsgXCI+XCIpO1xuLy8gaXRlcmF0ZSBmcmFzaVxuOyhmdW5jdGlvbigpe1xuICB2YXIgJCRvYmogPSBmcmFzaTtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiAkJG9iai5sZW5ndGgpIHtcblxuICAgIGZvciAodmFyICRpbmRleCA9IDAsICQkbCA9ICQkb2JqLmxlbmd0aDsgJGluZGV4IDwgJCRsOyAkaW5kZXgrKykge1xuICAgICAgdmFyIHZhbCA9ICQkb2JqWyRpbmRleF07XG5cbmJ1Zi5wdXNoKFwiPGxpPlwiICsgKGphZGUuZXNjYXBlKG51bGwgPT0gKGphZGVfaW50ZXJwID0gdmFsKSA/IFwiXCIgOiBqYWRlX2ludGVycCkpICsgXCI8L2xpPlwiKTtcbiAgICB9XG5cbiAgfSBlbHNlIHtcbiAgICB2YXIgJCRsID0gMDtcbiAgICBmb3IgKHZhciAkaW5kZXggaW4gJCRvYmopIHtcbiAgICAgICQkbCsrOyAgICAgIHZhciB2YWwgPSAkJG9ialskaW5kZXhdO1xuXG5idWYucHVzaChcIjxsaT5cIiArIChqYWRlLmVzY2FwZShudWxsID09IChqYWRlX2ludGVycCA9IHZhbCkgPyBcIlwiIDogamFkZV9pbnRlcnApKSArIFwiPC9saT5cIik7XG4gICAgfVxuXG4gIH1cbn0pLmNhbGwodGhpcyk7XG5cbmJ1Zi5wdXNoKFwiPC91bD48L2Rpdj5cIik7fShcIm5hbWVcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLm5hbWU6dHlwZW9mIG5hbWUhPT1cInVuZGVmaW5lZFwiP25hbWU6dW5kZWZpbmVkLFwiYnRuX3RleHRcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmJ0bl90ZXh0OnR5cGVvZiBidG5fdGV4dCE9PVwidW5kZWZpbmVkXCI/YnRuX3RleHQ6dW5kZWZpbmVkLFwiZnJhc2lcIiBpbiBsb2NhbHNfZm9yX3dpdGg/bG9jYWxzX2Zvcl93aXRoLmZyYXNpOnR5cGVvZiBmcmFzaSE9PVwidW5kZWZpbmVkXCI/ZnJhc2k6dW5kZWZpbmVkKSk7O3JldHVybiBidWYuam9pbihcIlwiKTtcbn07IiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuIWZ1bmN0aW9uKGUpe2lmKFwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzKW1vZHVsZS5leHBvcnRzPWUoKTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoZSk7ZWxzZXt2YXIgZjtcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93P2Y9d2luZG93OlwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Zj1nbG9iYWw6XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHNlbGYmJihmPXNlbGYpLGYuamFkZT1lKCl9fShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNZXJnZSB0d28gYXR0cmlidXRlIG9iamVjdHMgZ2l2aW5nIHByZWNlZGVuY2VcbiAqIHRvIHZhbHVlcyBpbiBvYmplY3QgYGJgLiBDbGFzc2VzIGFyZSBzcGVjaWFsLWNhc2VkXG4gKiBhbGxvd2luZyBmb3IgYXJyYXlzIGFuZCBtZXJnaW5nL2pvaW5pbmcgYXBwcm9wcmlhdGVseVxuICogcmVzdWx0aW5nIGluIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gKiBAcGFyYW0ge09iamVjdH0gYlxuICogQHJldHVybiB7T2JqZWN0fSBhXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UoYSwgYikge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBhdHRycyA9IGFbMF07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhdHRycyA9IG1lcmdlKGF0dHJzLCBhW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0dHJzO1xuICB9XG4gIHZhciBhYyA9IGFbJ2NsYXNzJ107XG4gIHZhciBiYyA9IGJbJ2NsYXNzJ107XG5cbiAgaWYgKGFjIHx8IGJjKSB7XG4gICAgYWMgPSBhYyB8fCBbXTtcbiAgICBiYyA9IGJjIHx8IFtdO1xuICAgIGlmICghQXJyYXkuaXNBcnJheShhYykpIGFjID0gW2FjXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoYmMpKSBiYyA9IFtiY107XG4gICAgYVsnY2xhc3MnXSA9IGFjLmNvbmNhdChiYykuZmlsdGVyKG51bGxzKTtcbiAgfVxuXG4gIGZvciAodmFyIGtleSBpbiBiKSB7XG4gICAgaWYgKGtleSAhPSAnY2xhc3MnKSB7XG4gICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGE7XG59O1xuXG4vKipcbiAqIEZpbHRlciBudWxsIGB2YWxgcy5cbiAqXG4gKiBAcGFyYW0geyp9IHZhbFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG51bGxzKHZhbCkge1xuICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsICE9PSAnJztcbn1cblxuLyoqXG4gKiBqb2luIGFycmF5IGFzIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHsqfSB2YWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5qb2luQ2xhc3NlcyA9IGpvaW5DbGFzc2VzO1xuZnVuY3Rpb24gam9pbkNsYXNzZXModmFsKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbCkgPyB2YWwubWFwKGpvaW5DbGFzc2VzKS5maWx0ZXIobnVsbHMpLmpvaW4oJyAnKSA6IHZhbDtcbn1cblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGNsYXNzZXMuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gY2xhc3Nlc1xuICogQHBhcmFtIHtBcnJheS48Qm9vbGVhbj59IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5jbHMgPSBmdW5jdGlvbiBjbHMoY2xhc3NlcywgZXNjYXBlZCkge1xuICB2YXIgYnVmID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlc2NhcGVkICYmIGVzY2FwZWRbaV0pIHtcbiAgICAgIGJ1Zi5wdXNoKGV4cG9ydHMuZXNjYXBlKGpvaW5DbGFzc2VzKFtjbGFzc2VzW2ldXSkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYnVmLnB1c2goam9pbkNsYXNzZXMoY2xhc3Nlc1tpXSkpO1xuICAgIH1cbiAgfVxuICB2YXIgdGV4dCA9IGpvaW5DbGFzc2VzKGJ1Zik7XG4gIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgIHJldHVybiAnIGNsYXNzPVwiJyArIHRleHQgKyAnXCInO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAnJztcbiAgfVxufTtcblxuLyoqXG4gKiBSZW5kZXIgdGhlIGdpdmVuIGF0dHJpYnV0ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGVzY2FwZWRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVyc2VcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRyID0gZnVuY3Rpb24gYXR0cihrZXksIHZhbCwgZXNjYXBlZCwgdGVyc2UpIHtcbiAgaWYgKCdib29sZWFuJyA9PSB0eXBlb2YgdmFsIHx8IG51bGwgPT0gdmFsKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuICcgJyArICh0ZXJzZSA/IGtleSA6IGtleSArICc9XCInICsga2V5ICsgJ1wiJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0gZWxzZSBpZiAoMCA9PSBrZXkuaW5kZXhPZignZGF0YScpICYmICdzdHJpbmcnICE9IHR5cGVvZiB2YWwpIHtcbiAgICByZXR1cm4gJyAnICsga2V5ICsgXCI9J1wiICsgSlNPTi5zdHJpbmdpZnkodmFsKS5yZXBsYWNlKC8nL2csICcmYXBvczsnKSArIFwiJ1wiO1xuICB9IGVsc2UgaWYgKGVzY2FwZWQpIHtcbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyBleHBvcnRzLmVzY2FwZSh2YWwpICsgJ1wiJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInO1xuICB9XG59O1xuXG4vKipcbiAqIFJlbmRlciB0aGUgZ2l2ZW4gYXR0cmlidXRlcyBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHBhcmFtIHtPYmplY3R9IGVzY2FwZWRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuZXhwb3J0cy5hdHRycyA9IGZ1bmN0aW9uIGF0dHJzKG9iaiwgdGVyc2Upe1xuICB2YXIgYnVmID0gW107XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuXG4gIGlmIChrZXlzLmxlbmd0aCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGtleSA9IGtleXNbaV1cbiAgICAgICAgLCB2YWwgPSBvYmpba2V5XTtcblxuICAgICAgaWYgKCdjbGFzcycgPT0ga2V5KSB7XG4gICAgICAgIGlmICh2YWwgPSBqb2luQ2xhc3Nlcyh2YWwpKSB7XG4gICAgICAgICAgYnVmLnB1c2goJyAnICsga2V5ICsgJz1cIicgKyB2YWwgKyAnXCInKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnVmLnB1c2goZXhwb3J0cy5hdHRyKGtleSwgdmFsLCBmYWxzZSwgdGVyc2UpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmLmpvaW4oJycpO1xufTtcblxuLyoqXG4gKiBFc2NhcGUgdGhlIGdpdmVuIHN0cmluZyBvZiBgaHRtbGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGh0bWxcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMuZXNjYXBlID0gZnVuY3Rpb24gZXNjYXBlKGh0bWwpe1xuICB2YXIgcmVzdWx0ID0gU3RyaW5nKGh0bWwpXG4gICAgLnJlcGxhY2UoLyYvZywgJyZhbXA7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XG4gIGlmIChyZXN1bHQgPT09ICcnICsgaHRtbCkgcmV0dXJuIGh0bWw7XG4gIGVsc2UgcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8qKlxuICogUmUtdGhyb3cgdGhlIGdpdmVuIGBlcnJgIGluIGNvbnRleHQgdG8gdGhlXG4gKiB0aGUgamFkZSBpbiBgZmlsZW5hbWVgIGF0IHRoZSBnaXZlbiBgbGluZW5vYC5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IGxpbmVub1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5yZXRocm93ID0gZnVuY3Rpb24gcmV0aHJvdyhlcnIsIGZpbGVuYW1lLCBsaW5lbm8sIHN0cil7XG4gIGlmICghKGVyciBpbnN0YW5jZW9mIEVycm9yKSkgdGhyb3cgZXJyO1xuICBpZiAoKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgfHwgIWZpbGVuYW1lKSAmJiAhc3RyKSB7XG4gICAgZXJyLm1lc3NhZ2UgKz0gJyBvbiBsaW5lICcgKyBsaW5lbm87XG4gICAgdGhyb3cgZXJyO1xuICB9XG4gIHRyeSB7XG4gICAgc3RyID0gc3RyIHx8IF9kZXJlcV8oJ2ZzJykucmVhZEZpbGVTeW5jKGZpbGVuYW1lLCAndXRmOCcpXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgcmV0aHJvdyhlcnIsIG51bGwsIGxpbmVubylcbiAgfVxuICB2YXIgY29udGV4dCA9IDNcbiAgICAsIGxpbmVzID0gc3RyLnNwbGl0KCdcXG4nKVxuICAgICwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSBjb250ZXh0LCAwKVxuICAgICwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyBjb250ZXh0KTtcblxuICAvLyBFcnJvciBjb250ZXh0XG4gIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpe1xuICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gJyAgPiAnIDogJyAgICAnKVxuICAgICAgKyBjdXJyXG4gICAgICArICd8ICdcbiAgICAgICsgbGluZTtcbiAgfSkuam9pbignXFxuJyk7XG5cbiAgLy8gQWx0ZXIgZXhjZXB0aW9uIG1lc3NhZ2VcbiAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgJ0phZGUnKSArICc6JyArIGxpbmVub1xuICAgICsgJ1xcbicgKyBjb250ZXh0ICsgJ1xcblxcbicgKyBlcnIubWVzc2FnZTtcbiAgdGhyb3cgZXJyO1xufTtcblxufSx7XCJmc1wiOjJ9XSwyOltmdW5jdGlvbihfZGVyZXFfLG1vZHVsZSxleHBvcnRzKXtcblxufSx7fV19LHt9LFsxXSlcbigxKVxufSk7XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSkiXX0=
