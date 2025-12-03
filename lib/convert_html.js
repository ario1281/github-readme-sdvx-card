<<<<<<< HEAD
import axios from "axios";
=======
import * as axios from "axios";
>>>>>>> main
import * as cheerio from "cheerio";

const URI = "https://vaddict.b35.jp/user.php"

export class VaddictInfo {
    constructor() {
        this.m_data = {};
        this.$ = null;
    }

    get data() { return this.m_data; }
    
    async init(id) {
<<<<<<< HEAD
        const url = `${URI}?player_id=${id}`;
=======
        const url = URI + `?player_id=${id}`;
>>>>>>> main
        try {
            const res = await axios.get(url);
            this.$ = cheerio.load(res.data);
        } catch (e) {
            throw e;
        }
    }

    getPlayerInfo() {
        if (!this.$) {
            throw new Error("Please initialize first.");
        }
        
<<<<<<< HEAD
        const $ = this.$;
        const info = {};
        
        $(".player_info").children().each((i, el) => {
=======
        const info = {};
        
        this.$(".player_info").children().each((i, el) => {
>>>>>>> main
            if (el.tagName === "h5") {
                const key = $(el).text().trim();
                const valueEl = $(el).next(".value");
                if (valueEl.length) {
                    info[key] = valueEl.text().trim();
                }
            }
        });

<<<<<<< HEAD
        this.m_data = info;
    }
}
=======
        
        return info;
    }

    get
}
>>>>>>> main
