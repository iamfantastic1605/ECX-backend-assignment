import express from "express"
import fs from "fs"

const app = express( )
app.use(express.json())


// Add a user to the database
app.post("/users", (request, response) =>{
    const body = request.body
    const myName = body.myName
    const age = body.age
    const user = {name: myName, age: age}
    fs.readFile("users.json", "utf-8", (err, data) => {
        if(err) {
            console.log(err);
            return;
        }
        const users = JSON.parse(data)
        users.push(user)
        fs.writeFile("users.json", JSON.stringify(users), (err) =>{
            if(err) {
                console.log(err);
                response.status(500).send("Unable to add user")
            }
            response.send(users)
        })
    })
   
}) 

//Change information of a user
app.patch("/users/:position", (request, response) => {
    const body = request.body
    const parameters = request.params
    const newName = body.newName; 
    const newAge = body.newAge;
    const user = {name: newName, age: newAge}
    const position = parameters.position

    fs.readFile("users.json", "utf-8", (err, data) =>{
        if(err) {
            console.log(err);
            return;
        }
        const users = JSON.parse(data)
        const userToUpdate = users[position]
        userToUpdate.name = newName
        fs.writeFile("users.json", JSON.stringify(users), (err) => {
            if(err) {
                console.log(err);
                response.send("Unable to add user")
            }
            response.status(200).json(users)
        })
    })
})


// To remove a user
app.delete("/users", (request, response) => {
    const body = request.body
    const myName = body.myName
    const age = body.age
    const user = {name: myName, age: age}
    fs.rm("users.json",  (err) => {
        if(err) { 
            console.log(err);
            return;
        }
        console.log("User deleted successfully")
        
    })
    
})

// To fetch all users in the database
app.get("/users", (request, response) => {
    fs.readFile("users.json", "utf-8", (err, data) => {
        if(err) {
            console.log(err);
            return;
        }
        response.send(data)
    })
})


app.listen(4000, () => {
    console.log("Server is running on port 4000")
})