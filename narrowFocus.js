/// <reference path="/bower_components/handlebars/handlebars.js"/>

(function () {
  document.addEventListener("DOMContentLoaded", start);



    function start() {
        initHbs();
        buildUi();
    }


    function buildUi() {
        questions.forEach(function(q, idx) {
            var text = Handlebars.templates['tpl-text'](q);
            dom.html(text, document.querySelector('.nf-container .top'));

            var input = Handlebars.templates['tpl-type-' + q.type](q);
            dom.html(input, document.querySelector('.nf-container .bottom'));
        });
    }

    function initHbs(){
        var templates = document.querySelectorAll("script[type='text/tpl']");
        Handlebars.templates = {};
        [].forEach.call(templates, function (t) {
            
            Handlebars.templates[t.id] = Handlebars.compile(t.innerHTML);
        });

        
    }


    var questions = [
        {
            text: "this is the first thing that I want to ask you",
            type: "string"
        },
        {
            text: "how many days since the last time you left the state you live in?",
            type: "number"
        },
        {
            text: "What's your favorite TV show?",
            type: "string"
        },
        {
            text: "When were you born?",
            type: "date"
        }

    ];



    var dom = {
        //get an element by ID
        gid: function (id) {
            return document.getElementById(id);
        },

        //add text to an element or replace the contents of the node with text
        text: function (el, text, repl) {
            el = typeof (el) == "string" ? this.gid(el) : el;

            if (repl) {
                while (el.lastChild) {
                    el.removeChild(el.lastChild);
                }
            }

            el.appendChild(document.createTextNode(text));
        },

        //create an element
        el: function (nodeType, attrs, parent) {
            var el = document.createElement(nodeType);
            if (attrs) {
                for (var attr in attrs) {
                    el.setAttribute(attr, attrs[attr]);
                }
            }
            if (parent) {
                parent.appendChild(el);
            }
            return el;
        },

        //append html to an element or insert it before
        html: function (html, parent, insertPoint) {
            var d = this.el('div');
            d.innerHTML = html;
            while (d.firstChild) {
                if (insertPoint) {
                    parent.insertBefore(d.firstChild, insertPoint);
                } else {
                    parent.appendChild(d.firstChild);
                }
            }
        },


        //get the child nodes of a node or optionally by a specific node name
        childs: function (node, nodeName) {

            var childs = [].filter.call(node.childNodes, function (n) {
                return !nodeName || n.nodeName.toLowerCase() == nodeName.toLowerCase();
            });

            return childs;
        }
    }
})()
