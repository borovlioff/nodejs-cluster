import {createServer} from "http";

const pid = process.pid;
const PORT = process.env.PORT || 3000;


createServer((req,res)=>{
    for(let i = 0; i < 1e7; i++){}
    res.end("Hello");
}).listen(PORT, ()=>{
    console.log(`Server start \nPid: ${pid}`)
})