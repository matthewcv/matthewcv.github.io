export function bindForm(form, object){
    return new FormBinding(form,object)
}

export function bindClick(elem, object,handler){
    return new EventBinding(elem,"click",object,handler);
}

export function bindContextMenu(elem, object,handler){
    return new EventBinding(elem,"contextmenu",object,handler);
}



class EventBinding{
    constructor(elem, eventName, object,handler){
        this.elem = elem;
        this.object = object;
        this.eventName = eventName;
        this.handler = handler;
        this._preventDefault = false;
        this.elem.addEventListener(eventName, (ev) => this.eventEmitted(ev))

    }

    preventDefault(){
        this._preventDefault = true;
        return this;
    }

    eventEmitted(ev){
        if(this._preventDefault){
            ev.preventDefault();
        }
        if(this.handler && typeof this.handler === "function"){
            this.handler.call(this.object,ev)
        } else{
            var targetHandler = ev.target.name || ev.target.id;
            if(targetHandler && this.object[targetHandler] && typeof this.object[targetHandler] === "function"){
                this.object[targetHandler](ev);
            }
        }
    }
}

class FormBinding{
    constructor(form,object){
        this.form = form;
        this.object = object;

        for(var key in object){
            if(this.form.elements[key]){
                this.form.elements[key].value = object[key]
            }
        }

        this.form.addEventListener('change',(ev) => this.formChanged(ev.target))
    }

    formChanged(el){
        if(el.type === "number"){
            this.object[el.name] = el.valueAsNumber;    
        }else{
            this.object[el.name] = el.value;
        }
    }
}