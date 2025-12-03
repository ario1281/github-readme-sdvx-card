import * as axios from "axios";
import * as cheerio from "cheerio";

export class VaddictInfo {
    constructor() {
        this.$ = null;
    }

    async init(url) {
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
