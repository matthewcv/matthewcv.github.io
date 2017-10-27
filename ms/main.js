import {bindForm,bindClick, bindContextMenu} from "./bind.js"

//things that a spot can be
var empty = 0;
var mine = 1;

//states that a spot can be
var covered = 0;
var uncovered = 1;
var marked = 2;


var settings = {
    wide:20,
    high:15,
    mines:40
}
window.settings = settings;

//the mine field
class Field {
    constructor(init){
        
        this.spots = [];
        this.wide = init.wide;
        this.high = init.high;
        this.mines = init.mines;
        this.holder = null;
        this.init();
    }

    init(){
        for(let y = 0; y < this.high; y++){
            var row = [];
            this.spots.push(row);
            for(let x = 0; x < this.wide; x++){
                row.push(new Spot(empty, covered, x, y));
            }
        }

        for(let i = 0; i < this.mines; ){
            let spot = this.randomSpot();
            if(spot.is == empty){
                spot.is = mine;
                i++;
            }
        }

    }

    randomSpot(){
        var y =Math.floor( Math.random() * this.high);
        var x =Math.floor( Math.random() * this.wide);

        return this.spots[y][x];
    }

    findSpotFromEvent(ev){
        var node = ev.target;
        while(node){
            if(node.matches('[data-field-x]')){
                break;
            }
            node = node.parentElement;
        }
        if(node){
            var x = parseInt(node.attributes['data-field-x'].value);
            var y= parseInt(node.attributes['data-field-y'].value);

            return {node,spot:this.spots[y][x]};
        }

        return{node,spot:null};
    }

    holderClicked(ev){
        //find the spot that was clicked
        var node = ev.target;
        while(node){
            if(node.matches('[data-field-x]')){
                break;
            }
            node = node.parentElement;
        }
        if(node){
            var x = parseInt(node.attributes['data-field-x'].value);
            var y= parseInt(node.attributes['data-field-y'].value);

            var spot = this.spots[y][x];
            if(spot.state === covered){
                var minsAround = this.countMinesAround(x,y);
                spot.state = uncovered;
                
                spot.render(node,minsAround);
                if(minsAround === 0 && spot.is === empty){
                    this.uncoverSurrounding(x,y)
                }
            }
        }
    }

    markSpot(ev){
        var {node,spot} = this.findSpotFromEvent(ev);
        if(spot){
            if(spot.state === covered){
                spot.state = marked;
            }
            else if(spot.state === marked){
                spot.state = covered;
            }
            spot.render(node);
        }
        
    }

    render(parentElem){
        var gap = 3;
        var size = 25;
        var height = size * this.high + gap * this.high + gap;
        var width=size * this.wide + gap * this.wide + gap;
        this.holder = el('svg', {width, height, id:'holder'},el('rect',{width:'100%', height:'100%', fill:'#333333'}));
        bindClick(this.holder,this,this.holderClicked);
        bindContextMenu(this.holder,this,this.markSpot).preventDefault();
        parentElem.appendChild(this.holder);
        for(let y = 0; y < this.high; y++){
            
            for(let x = 0; x < this.wide; x++){
                var spotContainer = el('svg', {width:size, height:size, x: x*size + x*gap + gap, y: y*size + y*gap + gap, 'data-field-x':x, 'data-field-y':y});
                this.holder.appendChild(spotContainer);
                this.spots[y][x].render(spotContainer,this.countMinesAround(x,y));
            }
        }
    }

    visitSurrounding(x,y,visitor){
        var around = [
            {x:x-1,y:y-1},
            {x:x,y:y-1},
            {x:x+1,y:y-1},
            {x:x+1,y:y},
            {x:x+1,y:y+1},
            {x:x,y:y+1},
            {x:x-1,y:y+1},
            {x:x-1,y:y},
            
        ];
        for(let p of around){
            if(p.x < 0 || p.y < 0 || p.x >= this.wide || p.y >= this.high){
                continue;
            }

            visitor(this.spots[p.y][p.x]);            
        }

    }

    uncoverSurrounding(x, y){
        this.visitSurrounding(x, y, spot => {
            if(spot.is === empty && spot.state === covered)
            {
                
                var count = this.countMinesAround(spot.x,spot.y);
                spot.state = uncovered;

                var spotContainer = this.holder.querySelector(`[data-field-x='${spot.x}'][data-field-y='${spot.y}']`);
                spot.render(spotContainer,count);

                if(count === 0){
                    this.uncoverSurrounding(spot.x,spot.y);
                }
            }

        })
    }

    countMinesAround(x, y){
        
        var count = 0;
        this.visitSurrounding(x, y, spot => {
            if(spot.is === mine){
                count++;
            }
        });

        return count;

        

    }

}

//represents a spot on the field
class Spot{
    constructor(is, state, x,y){
        this.is = is;
        this.state = state;
        this.x = x;
        this.y = y;
    }

    render(parentElem, minesAround){
        emptyEl(parentElem);
        var w = parentElem.getAttribute('width');
        var h = parentElem.getAttribute('height');
        var stroke = "#777777"
        if(this.state == uncovered){
            var color = this.is === mine ? 'red':'green';
            parentElem.appendChild(el("rect", {width: w-2, height:h-2, x:1,y:1, rx:4,ry:4, fill:color, stroke, 'stroke-width':2}))
            if(minesAround && this.is === empty){
                parentElem.appendChild(el("text",{x:"50%", y:"50%", 'alignment-baseline':'central',fill:'#333333', 'text-anchor':'middle'},minesAround.toString()));
            }
        } else if(this.state == covered || this.state == marked){
            var color = "blue"
            parentElem.appendChild(el("rect", {width: w-2, height:h-2, x:1,y:1, rx:4,ry:4, fill:color, stroke, 'stroke-width':2}))
            if(this.state == marked){
                parentElem.appendChild(el("circle",{ cx:w/2,cy:h/2,r:w/2-6, fill:"yellow"}))
            }
        }
    }
}



class Main{

    constructor(){
        this.gameArea = document.querySelector(".gamearea");
        bindClick(document.forms.settings,this);
    }

    start(){
        this.field = new Field(settings);
        emptyEl(this.gameArea);
        this.field.render(this.gameArea);
    }
}

window. main = new Main();
bindForm(document.forms.settings,settings)

main.start()


function el(name, attributes, content){
    var svgns = "http://www.w3.org/2000/svg"; 
    var e = document.createElementNS(svgns, name);
    if(attributes){
        for(let name in attributes){
            e.setAttribute(name, attributes[name])
        }
    }
    if(content instanceof SVGElement){
        e.appendChild(content);
    }

    if(typeof content === "string"){
        e.textContent = content;
    }

    return e;
}

function emptyEl(el){
    while(el.childNodes.length){
        el.removeChild(el.lastChild);
    }
}