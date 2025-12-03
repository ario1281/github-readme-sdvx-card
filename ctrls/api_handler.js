import { Svg } from "../lib/svg_helper.js";
import { VaddictInfo } from "../lib/convert_html.js";

// cache two hours
const CACHE_MAX_AGE = 7200;

export const apiHeaders = new Headers({
  "Content-Type": "image/svg+xml",
  "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
});

export async function ApiHandler(req) {
  // Parse query parameters
  const vaddict = new VaddictInfo();

  try {
    await vaddict.init(req.id);

    // Parse parameters
    const param = {
      data: vaddict.data(),
    };

    const content = Svg.render(param); // render image for svg

    // sucsess
    return new Response(content, {
      status: 200,
      headers: apiHeaders,
    });
    
  } catch (e) {
    // failed
    return new Response(`code:${e.code}/n ${e.message}`, {
      status: e.code,
      headers: ApiHeader,
    });
  }
}
