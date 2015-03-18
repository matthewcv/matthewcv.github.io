/// <reference path="/bower_components/handlebars/handlebars.js"/>

(function () {
  document.addEventListener("DOMContentLoaded", start);

    var nowIdx = -1;

    function start() {


        initHbs();
        buildUi();

        document.addEventListener("keyup", function (ev) {
            //console.log(ev.keyCode);
            if (ev.keyCode == 39 || ev.keyCode == 13 || (ev.keyCode == 9 && !ev.shiftKey)) {
                showNext();
            }
            if (ev.keyCode == 37|| (ev.keyCode == 9 && ev.shiftKey)) {
                showPrev();
            }
        }, true);
        document.addEventListener("click", function (ev) {
            if (ev.target.classList.contains("nf-start-button")) {
                showNext();
            }
        }, true);


        setTimeout(showNext, 10);
        
    }

    function move(dir, id,o,n) {
        var now = dom.gid(id + nowIdx);
        nowIdx += dir;

        if (now) {
            now.classList.remove("nf-now");
            now.classList.add(o);
        }
        var next = dom.gid(id + nowIdx);

        next.classList.remove(n);
        next.classList.add("nf-now");
    }


    function showPrev() {
        if (nowIdx > 1) {
            move(-1, "text-", "nf-next", "nf-prev");
            nowIdx++;
            move(-1, "input-", "nf-next", "nf-prev");
        focusNow();
        }
    }

    function showNext() {
        if (nowIdx < questions.length - 1) {
            move(1, "text-", "nf-prev", "nf-next");
            nowIdx--;
            move(1, "input-", "nf-prev", "nf-next");
        focusNow();
        }
    }

    function focusNow() {
        var now = document.querySelector("#input-" + nowIdx + " input");
        if (now) {
            now.focus();
        }
    }


    function buildUi() {
        questions.forEach(function (q, idx) {
            q.idx = idx;
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
            text: "Before we begin, I need to ask you a few questions",
            type: "start"
        },
        {
            text: "how many days since the last time you left the state you live in?",
            type: "string"
        },
        {
            text: "What's your favorite TV show?",
            type: "string"
        },
        {
            text: "When were you born?",
            type: "string"
        },
        {
            text: "Thanks! We're all done.",
            type: "end"
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
