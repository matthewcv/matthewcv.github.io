
class Router {
    nav(url) {
        window.history.pushState({},url,url)

        
    }
}

const router = new Router();

document.addEventListener("click", (evt) =>{
    if(evt.target instanceof HTMLAnchorElement) {
        let a = evt.target;
        
        router.nav(a.attributes.href.value);

        evt.preventDefault()
    }

    if(evt.target instanceof HTMLButtonElement) {
        var txt = evt.target.innerText;

        window.history[txt]();
    }
})

window.addEventListener('popstate', evt => {
    // happens when you click the forward or backward buttons on the browser
    // and when you call history.forward() or history.back()
    // but not when you call history.pushState
    console.info('popstate', window.location, evt)
})

console.info('load', new Date())