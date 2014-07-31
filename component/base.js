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




