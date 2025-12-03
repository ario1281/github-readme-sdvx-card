import * as axios from "axios";
import * as cheerio from "cheerio";

const URI = "https://vaddict.b35.jp/user.php"

export class VaddictInfo {
    constructor() {
        this.$ = null;
    }

    async init(id) {
        const url = URI + `?player_id=${id}`
        const res = await axios.get(url);
        this.$ = cheerio.load(res.data);
    }

    getPlayerInfo() {
        if (!this.$) {
            throw new Error("Please initialize first.");
        }
        
        const info = {};
        
        this.$(".player_info").children().each((i, el) => {
            if (el.tagName === "h5") {
                const key = $(el).text().trim();
                const valueEl = $(el).next(".value");
                if (valueEl.length) {
                    info[key] = valueEl.text().trim();
                }
            }
        });
        
        return info;
    }
}
