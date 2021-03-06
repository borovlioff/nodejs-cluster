import cluster from "cluster";
import { cpus } from "os";

const pid = process.pid;

if (cluster.isPrimary) {
    const cpusCount = cpus().length;
    console.log(`Master start. PID ${pid}\nCPU: ${cpusCount}`);
    for (let i = 0; i < cpusCount - 1; i++) {
        const worker = cluster.fork();
        worker.send("Hello from server");
        worker.on("message", (msg) => {
            console.log(`Message from worker ${worker.process.pid} : ${JSON.stringify(msg)}`);
        });
    }

    cluster.on("exit", (worker, code) => {
        console.log(`Worker died! PID: ${worker.process.pid}. Code: ${code}`);
        if (code === 1) {
            cluster.fork();
        }
    })
}

if (cluster.isWorker) {
    require("./worker");
    process.on("message", (msg) => {
        console.log(`Message from master: ${msg}`)
    });
    if (process.send) {
        process.send({ text: "Hello", pid });
    };
}