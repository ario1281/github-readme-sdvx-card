import Fastify from "fastify";
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

// ====== Serverless ======
export default async (req, res) => {
    const { method, url, headers } = req;
    const payload = req.body;
    const response = await await fastify.inject({
        method,
        url,
        headers,
        payload,
    });

    res.statusCode = response.statusCode;
    for (const [key, value] of Object.entries(response.headers)) {
        res.setHeadeer(key, value);
    }
    res.end(response.body);
};

// end of api/server.js

