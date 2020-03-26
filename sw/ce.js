
/** create an element
 * @param elemName the name of the element
 * @param attrs an object representing the attributes to assign to the element
 * @param children The children of the element. A string, an HTMLElement or an iterable of HTMLElement
 * @returns an html element
 */
function e(elemName, attrs, children) {
    var elem = document.createElement(elemName);

    if(!attrs && !children){
        return elem;
    }

    //no children but attrs. Assume attrs is children. 
    if(!children && !!attrs) {
        children = attrs;
        attrs = [];
    }

    for(let attr in attrs) {
        elem.setAttribute(attr, attrs[attr]);
    }

    if(typeof(children)==="string"){
        elem.textContent = children
        return elem;
    }

    
    if(children instanceof HTMLElement) {
        children = [children];
    }

    if(children[Symbol.iterator]) {
        for(let child of children) {
            if(child instanceof HTMLElement) {
                elem.appendChild(child);
            }
        }
    }

    return elem;
}

class SomeShit extends HTMLElement {
    constructor(){
        super();
        var shadow = this.attachShadow({mode:"open"});
        shadow.appendChild(e("style", `
div {
    border: solid .5rem red;
    padding: 1rem;
    color: green;
}

        `))

        shadow.appendChild(e('div', e('slot')))
    }
}
customElements.define('some-shit', SomeShit);

class NavLinks extends HTMLElement {
    constructor(){
        super();
        var shadow = this.attachShadow({mode:"open"})

        shadow.appendChild(e("style", `
        ul {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
        }
        li {
            margin: 0 .5rem;
        }
        `))

        shadow.appendChild(
            e("ul",[
                e("li",e("a", {"href":"index.html"}, "Home")),
                e("li",e("a", {"href":"page1.html"}, "Page 1")),
                e("li",e("a", {"href":"page2.html"}, "Page 2")),
            ])
        )

        
    }
}

customElements.define('nav-links', NavLinks);
