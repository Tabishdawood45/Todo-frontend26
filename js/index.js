import { Todos } from "./classes/Todos.js"

const BACKEND_ROOT_URL = "http://localhost:3001"

const todos = new Todos(BACKEND_ROOT_URL)

const list = document.querySelector("ul")
const input = document.querySelector("input")

input.disabled = true



// ---------------- RENDER TASK ----------------
const renderTask = (task) => {

const li = document.createElement("li")

li.setAttribute("class", "list-group-item")

li.setAttribute("data-key", task.getId())

renderSpan(li, task.getText())

renderLink(li, task.getId())

list.append(li)

}



// ---------------- TASK TEXT ----------------
const renderSpan = (li, text) => {

const span = li.appendChild(document.createElement("span"))

span.innerHTML = text

}



// ---------------- DELETE ICON ----------------
const renderLink = (li, id) => {

const a = li.appendChild(document.createElement("a"))

a.innerHTML = '<i class="bi bi-trash"></i>'

a.style.float = "right"

a.addEventListener("click", () => {

todos.removeTask(id)

.then((removed_id) => {

const li_to_remove = document.querySelector(`[data-key='${removed_id}']`)

if(li_to_remove){

list.removeChild(li_to_remove)

}

})

.catch(error => alert(error))

})

}



// ---------------- GET TASKS ----------------
const getTasks = () => {

todos.getTasks()

.then(tasks => {

tasks.forEach(task => {

renderTask(task)

})

input.disabled = false

})

.catch(error => alert(error))

}



// ---------------- ADD TASK ----------------
input.addEventListener("keypress", (event) => {

if(event.key === "Enter"){

event.preventDefault()

const taskText = input.value.trim()

if(taskText !== ""){

todos.addTask(taskText)

.then(task => {

renderTask(task)

input.value = ""

input.focus()

})

.catch(error => alert(error))

}

}

})



// ---------------- LOAD TASKS ----------------
getTasks()