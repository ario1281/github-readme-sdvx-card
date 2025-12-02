import * as cheerio from "cheerio";

export function PlayerInfoToJson(html) {
    const $ = cheerio.load(html);
    const info = {};

    $(".player_info").children().each((i, el) => {
        if (el.tagName === "h5") {
            const key = $(el).text().trim();
            const valueEl = $(el).next(".value"); // h5 の次の div.value を取得
            if (valueEl.length) {
                player[key] = valueEl.text().trim();
            }
        }
    });

    return info;
}