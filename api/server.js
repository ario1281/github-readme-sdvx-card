import { ApiHandler } from "../ctrls/api_handler.js";

async function SendFastifyResponse(reply, res) {
    // get text
    const text = await res.text();

    res.headers.forEach(([key, value]) => {
        reply.header(key, value);
    });
    reply.code(res.status).send(text);
}



// ====== Local debug ======


//
export default {
  fetch(req) {
    return new Response('Hello from Vercel!');
  },
};

// end of api/server.js

