import {createServer} from "http";

const pid = process.pid;
const PORT = process.env.PORT || 3000;


const server = createServer((req,res)=>{
    for(let i = 0; i < 1e7; i++){}
    res.end("Hello");
}).listen(PORT, ()=>{
    console.log(`Server start \nPid: ${pid}`)
});

process.on("SIGINT", ()=>{
    console.log(`SIGINT`);
    server.close(()=>{
        process.exit(0);
    })
})

process.on("SIGTERM", ()=>{
    console.log(`SIGTERM`);
    server.close(()=>{
        process.exit(0);
    })
})

process.on("SIGUSR2", ()=>{
    console.log(`SIGUSR2`);
    server.close(()=>{
        process.exit(1);
    })
})