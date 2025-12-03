import { Svg } from "../helpers/svg_helper.js";
import { VaddictInfo } from "../helpers/convert_html_helper.js";

// cache two hours
const CACHE_MAX_AGE = 7200;

export const apiHeaders = new Headers({
  "Content-Type": "image/svg+xml",
  "Cache-Control": `public, max-age=${CACHE_MAX_AGE}`,
});

export async function ApiHandler(req) {
  // Parse query parameters
  const { id } = req || {};
  const vaddict = new VaddictInfo();

  try {
    await vaddict.init(`https://vaddict.b35.jp/user.php?player_id=${id}`);
    const player = vaddict.getPlayerInfo();

    // Parse parameters
    const param = {
      "id":   id,
      "name": player["name"],
      "vf":   20.000,
      "skill": player["skill"],
      "played": player["played"],
    };

    const content = Svg.render(param); // render image for svg

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
