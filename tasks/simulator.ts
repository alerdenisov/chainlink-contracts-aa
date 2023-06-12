import * as p from "child_process";
import express from "express";
import cors from "cors";
import { task } from "hardhat/config";

let forkProcess: p.ChildProcessWithoutNullStreams | undefined = undefined;

function restartFork(fork: string, forkBlockNumber: number) {
  return new Promise(async (resolve, reject) => {
    let resolved = false;
    forkProcess?.kill();
    forkProcess = p.spawn("./node_modules/.bin/hardhat", [
      "node",
      "--fork",
      fork,
      "--fork-block-number",
      forkBlockNumber.toString(),
    ]);

    forkProcess.stdout.on("data", (data) => {
      console.log(`[FORK] ${data.toString()}`);
      if (
        !resolved &&
        data.toString().includes("JSON-RPC server at http://127.0.0.1:8545")
      ) {
        resolved = true;
        resolve("http://127.0.0.1:8545/");
      }
    });
    forkProcess.stderr.on("data", (data) => {
      console.error(`[FORK] ${data.toString()}`);
    });
    forkProcess.on("exit", (code) => {
      console.log(`Child exited with code ${code}`);
      if (!resolved) {
        reject("exit " + code);
      }
    });

    setTimeout(() => {
      if (!resolved) {
        reject("timeout");
      }
    }, 10000);
  });
}

task("simulator:api").setAction(async (args, hre) => {
  const apiPort = Number(args.port || 1337);
  const server = express();

  server.use(cors());
  server.get("/fork", async (request, response, next) => {
    const fork = request.query.fork;
    const forkBlockNumber = request.query.forkBlockNumber;

    if (typeof fork !== "string" || typeof forkBlockNumber !== "string") {
      response.status(502);
      response.send("fork, forkBlockNumber are required");
      return next();
    }

    try {
      response.send(await restartFork(fork, +forkBlockNumber - 60));
      response.status(200);
      return next();
    } catch (e: any) {
      response.status(500);
      response.send(e.toString());
      return next();
    }
    // process.pipeStdout(process.stdoutnpm)
  });

  server.get("/halt", async (request, response, next) => {
    forkProcess?.kill();
    forkProcess = undefined;
    response.send("ok");
    response.status(200);
    next();
  });

  server.listen(apiPort, function () {
    console.log("Example app listening");
  });

  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
});
