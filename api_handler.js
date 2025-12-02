import fetch from "node-fetch";

// cache two hours
const CACHE_MAX_AGE = 7200;

export const apiHeaders = new Headers({
  "Content-Type": "image/svg+xml",
  "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
});

export function ApiHandler(req) {
  // Parse query parameters
  const query = req.query;
  const apiUrl = `https://vaddict.b35.jp/users/${query.id}/history`;

  try {
    const res = await fetch(apiUrl);

    // Parse parameters
    const param = {
      "id":   query.id,
      "name": "user name"
      "vf":   20.000,
      "skill": "skill level",
      "played": "2020/01/01"
    };

    const content = Svg.render({}); // render image for svg

    // sucsess
    return new Response(content, {
      status: 200,
      headers: apiHeaders,
    });
    
  } catch (e) {
    return new Response("error", {
      status: 400,
      headers: ApiHeader,
    });
  }
}
