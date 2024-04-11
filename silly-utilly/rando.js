import { Password } from "./password.js"


import { Guid } from "./guid.js"



export const Rando = {
    components: {
        Password, Guid
    },
    template: `
    <ul class="list-group list-group-flush">
       <li class="list-group-item"><Guid></Guid></li>
       <li class="list-group-item">
        <Password></Password>
        </li>
    </ul>
    `
}