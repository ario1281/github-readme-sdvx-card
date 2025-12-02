import { ApiHandler } from "../ctrls/api_header.js";

export default function handler(req, res) {
	return ApiHandler(req.query);
}
