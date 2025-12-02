import fetch from "node-fetch";
import { Svg } from "../helpers/svg_helper.js";
import { PlayerInfoToJson } from "../helpers/html_json_helper.js";

// cache two hours
const CACHE_MAX_AGE = 7200;

export const apiHeaders = new Headers({
  "Content-Type": "image/svg+xml",
  "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
});

export async function ApiHandler(req) {
  // Parse query parameters
  const { id } = req || {};
  const apiUrl = `https://vaddict.b35.jp/user.php?player_id=${id}`;

  try {
    const res = await fetch(apiUrl);
    const player = PlayerInfoToJson(await res.text());

    // Parse parameters
    const param = {
      "id":   id,
      "name": player[0],
      "vf":   20.000,
      "skill": player[3],
      "played": player[4],
    };

    const content = Svg.render({}); // render image for svg

    // sucsess
    return new Response(content, {
      status: 200,
      headers: apiHeaders,
    });
    
  } catch (e) {
    return new Response(e, {
      status: 400,
      headers: ApiHeader,
    });
  }
}
