import { Task } from "./Task.js"

class Todos {

#tasks = []
#backend_url = ""

constructor(url) {

this.#backend_url = url

}


getTasks = () => {

return new Promise(async (resolve, reject) => {

fetch(this.#backend_url)

.then(response => response.json())

.then(json => {

this.#readJson(json)

resolve(this.#tasks)

})

.catch(error => {

reject(error)

})

})

}



removeTask = (id) => {

return new Promise(async (resolve, reject) => {

fetch(this.#backend_url + "/delete/" + id, {

method: "delete"

})

.then(response => response.json())

.then(json => {

this.#removeFromArray(id)

resolve(json.id)

})

.catch(error => {

reject(error)

})

})

}


addTask = (task) => {

return new Promise((resolve, reject) => {

fetch(this.#backend_url + "/new", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({ description: task })

})

.then(response => response.json())

.then(json => {

const newTask = new Task(json.id, task)

this.#tasks.push(newTask)

resolve(newTask)

})

.catch(error => {

reject(error)

})

})

}



#readJson = (tasksAsJson) => {

tasksAsJson.forEach(node => {

const task = new Task(node.id, node.description)

this.#tasks.push(task)

})

}



#removeFromArray = (id) => {

const arrayWithoutRemoved = this.#tasks.filter(task => task.getId() !== id)

this.#tasks = arrayWithoutRemoved

}

}

export { Todos }