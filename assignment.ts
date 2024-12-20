import http from "node:http"
import fs from "node:fs"

type User = {
    name: string,
    age: number
}

const server = http.createServer((req, res) => {
    let users: User[] = []

    if(req.url == "/" && req.method == "GET") {
        res.end("Hello World!");
    }
// add users
     if(req.url == "/users" && req.method == "POST") {
           let body = ""
           req.on("data", (smallData) => {
            body += smallData.toString()
            })
            req.on("end", () => {
             const newuser: User = JSON.parse(body)
            fs.readFile('users.json', 'utf-8', (err, data) => {
                if(err) {
                    console.log(err);
                    return;
                }
                users = JSON.parse(data);
                users.push(newuser);
                fs.writeFile('users.json', JSON.stringify(users), (err) => {
                    if(err) {
                        console.log(err);
                        res.writeHead(500, "User Created", {
                            "content-type" : "application/json"
                        });
                        res.end("Unable to add user");
                    } else {
                        res.writeHead(201, "User Created", {
                            "content-type" : "application/json"
                        });
                         res.end(JSON.stringify(users));
                    }
                })
            })
            })
}
// remove user

});


server.listen(2000, () => {
    console.log("Server is running at port 2000");
}
)
