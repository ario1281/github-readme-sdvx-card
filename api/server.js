import Fastify from "fastify";
import serverless from "serverless-http";
import { ApiHandler } from "../ctrls/api_handler.js";

const fastify = Fastify();

async function SendFastifyResponse(reply, res) {
    // get text
    const text = await res.text();

    Ores.headers.forEach(([key, value]) => {
        reply.header(key, value);
    });
    reply.code(res.status).send(text);
}

fastify.get("/api", async (req, reply) => {
    // return Response
    const res = await ApiHandler(req.query);
    await SendFastifyResponse(reply, res);
});

// ====== Local debug ======
if (!process.env.VERCEL) {
    fastify.listen({ port: 3000 }, (err, address) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log("Local Fastify server running at:", address);
    });
}

// ====== Vercel serverless ======
export default serverless((req, res) => {
    return fastify.route(req, res);
});

// end of api/server.js