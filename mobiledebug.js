(function(){

    var md = {};
    console.$mobiledebug = md;
    md.console$log = console.log;
    md.console$info = console.info;
    md.console$warn = console.warn;
    md.console$error = console.error;
    //md.console$dir = console.dir;
    
    console.log = function() {
        md.console$log.apply(console, arguments);
        md.pushContent(Array.prototype.join.call(arguments, " "));
    }

    console.info = function() {
        md.console$info.apply(console, arguments);
        md.pushContent(Array.prototype.join.call(arguments, " "),{backgroundColor:"#d1ecf1", color:"#0c5460"});
    }

    console.warn = function() {
        md.console$warn.apply(console, arguments);
        md.pushContent(Array.prototype.join.call(arguments, " "),{backgroundColor:"#fff3cd", color:"#856404"});
    }

    console.error = function() {
        md.console$error.apply(console, arguments);
        md.pushContent(Array.prototype.join.call(arguments, " "),{backgroundColor:"#f8d7da", color:"#721c24;"});
    }

    // console.dir = function(obj){
    //     md.console$dir.apply(console, arguments);

    //     if(isPrimitive(obj)){
    //         console.log(obj);
    //     }
    //     var df = document.createDocumentFragment();
    //     dirLayer(obj,df,1)
    // }

    // function dirLayer(obj, container, depth){

    // }

    function isPrimitive(thing){
        if(thing === null || thing === undefined){
            return true;
        }
        var t = typeof thing;
        return (t === "number" || t === "boolean" || t ==="string")
    }

    md.pushContent = function(content, style){
        md.show();
        var le = document.createElement("div");
        if(content instanceof DocumentFragment){
            le.appendChild(content);
        }else{
            le.textContent = content ;
        }
        Object.assign(le.style,{
            paddingLeft:"2px",
            marginTop:"3px",
            color: "#1b1e21",
            backgroundColor: "#fefefe",
        },style || {});
        md.content.insertBefore(le,md.content.firstElementChild);

    }
    
    md.show = function () {
       if (!md.ui) {
           var theUi = document.createElement("div");
           Object.assign(theUi.style,
           {
               position: "fixed",
               bottom: "0px",
               //left:"0px",
               right:"0px",
               height: "200px",
               width: "100%",
               backgroundColor: "white",
               zIndex:"10000",
               fontFamily:'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
               transition: "width .5s, height .5s"
           });
           var consoleContent = `
           <div style="background-color:#eee; width:100%; position:absolute; height:100%; padding:3px 43px 3px 3px; box-sizing:border-box; ">
            <div style="width:100%;height:100%;overflow: auto;  "></div>
           </div>
           <div style="width: 40px; height: 40px; position:absolute; top:0; right: 0; box-sizing:border-box; background-color:#555; color:#eee; font-size:40px; line-height:40px; text-align:center">⇕</div>
           <div style="transition: top .5s, transform .5s; width: 40px; height: 40px; position:absolute; top:42px; right: 0; box-sizing:border-box; background-color:#555; color:#eee; font-size:40px; line-height:40px; text-align:center">⇲</div>
           `;
           theUi.innerHTML = consoleContent;
           document.body.appendChild(theUi);
           md.ui = theUi;
           md.content = md.ui.firstElementChild.firstElementChild;
           md.mover = md.ui.children[1];
           md.collapser = md.ui.children[2];
           md.mover.addEventListener("touchstart", md.movertouchstart);
           md.mover.addEventListener("touchmove", md.movertouchmove);
           md.mover.addEventListener("touchend", md.movertouchend);
           md.mover.addEventListener("touchcancel", md.movertouchend);
           md.collapser.addEventListener("click", md.collapserclick)
        }
    }

    md.iscollapsed = false;
    md.collapserclick = function(e){
        if(md.iscollapsed){
            md.collapser.style.top = "42px";
            md.collapser.style.transform = ""
            //md.ui.style.left = "0px";
            md.ui.style.width = "100%";
            md.ui.style.height = "200px";
            md.iscollapsed = false;
        }else{
            md.collapser.style.top = 0;
            md.collapser.style.transform = "rotate(180deg)"
            //md.ui.style.left = "";
            md.ui.style.width = "40px";
            md.ui.style.height = "40px";
            md.iscollapsed = true;
        }
    }

    md.lastmovetouch = null;
    md.movertouchstart = function(e){
        md.lastmovetouch = e.changedTouches[0];
        e.preventDefault();
        e.stopPropagation();
    }
    md.movertouchmove = function(e){

        var thistouch = e.changedTouches[0];
        var dify = thistouch.clientY-md.lastmovetouch.clientY;
        md.lastmovetouch = thistouch;
        var b = parseInt(md.ui.style.bottom);
        b = b - dify;
        
        md.ui.style.bottom = b + "px"
        e.preventDefault();
        e.stopPropagation();
        
    }
    md.movertouchend = function(e){
        
        md.lastmovetouch = null;
        e.preventDefault();
        e.stopPropagation();
        
    }

    console.info('Mobile Debug Console activated.')

})() 
