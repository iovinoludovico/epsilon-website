define("ace/mode/emfatic_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var emfaticHighlightRules = function() {

    var keywords = (
        "abstract|attr|class|enum|extends|import|package|ref|val"
    );

    var builtinConstants = (
        "true|false|self"
    );

    var builtinFunctions = (
        ""
    );

    var dataTypes = (
        "String|Integer|Real|Boolean"
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
            token : "keyword.operator",
            regex : "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
        }, {
            token : "paren.lparen",
            regex : "[\\(]"
        }, {
            token : "paren.rparen",
            regex : "[\\)]"
        }, {
            token : "text",
            regex : "\\s+"
        } ]
    };
    this.normalizeRules();
};

oop.inherits(emfaticHighlightRules, TextHighlightRules);

exports.emfaticHighlightRules = emfaticHighlightRules;
});

define("ace/mode/emfatic",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/emfatic_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var emfaticHighlightRules = require("./emfatic_highlight_rules").emfaticHighlightRules;

var Mode = function() {
    this.HighlightRules = emfaticHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "--";

    this.$id = "ace/mode/emfatic";
    this.snippetFileId = "ace/snippets/emfatic";
}).call(Mode.prototype);

exports.Mode = Mode;

});                (function() {
                    window.require(["ace/mode/emfatic"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            