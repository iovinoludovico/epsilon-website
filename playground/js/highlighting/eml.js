import {define} from "ace-builds";

define("ace/mode/eml_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var emlHighlightRules = function() {

    var keywords = (
        "merge|with|into|rule|transform|from|to|guard|pre|post|not|delete|import|for|while|in|and|or|operation|return|var|throw|if|new|else|transaction|abort|break|continue|assert|assertError|not|function|default|switch|case|as|ext|driver|alias|model|breakAll|async|group|nor|xor|implies|extends"
    );

    var builtinConstants = (
        "true|false|self"
    );

    var builtinFunctions = (
        ""
    );

    var dataTypes = (
        "Any|String|Integer|Real|Boolean|Native|Bag|Set|List|Sequence|Map|OrderedSet|Collection|Tuple|ConcurrentBag|ConcurrentMap|ConcurrentSet"
    );

    var keywordMapper = this.createKeywordMapper({
        "support.function": builtinFunctions,
        "keyword": keywords,
        "constant.language": builtinConstants,
        "storage.type": dataTypes
    }, "identifier", true);

    this.$rules = {
        "start" : [ {
            token : "comment",
            regex : "//.*$"
        },  {
            token : "comment",
            start : "/\\*",
            end : "\\*/"
        }, {
            token : "string",           // " string
            regex : '".*?"'
        }, {
            token : "string",           // ' string
            regex : "'.*?'"
        }, {
            token : "string",           // ` string (apache drill)
            regex : "`.*?`"
        }, {
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "text",
            regex : "\\s+"
        } ]
    };
    this.normalizeRules();
};

oop.inherits(emlHighlightRules, TextHighlightRules);

exports.emlHighlightRules = emlHighlightRules;
});

define("ace/mode/eml",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/eml_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var emlHighlightRules = require("./eml_highlight_rules").emlHighlightRules;

var Mode = function() {
    this.HighlightRules = emlHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/eml";
    this.snippetFileId = "ace/snippets/eml";
}).call(Mode.prototype);

exports.Mode = Mode;

});