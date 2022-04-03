import {getDateNow} from "./DateUtil.js";

export function log(s) {
    console.log(`\u001b[1;32m[Menu-LLA-Story | ${getDateNow()}] [LOG]\u001b[0m`, s);
}

export function warn(s) {
    console.log(`\u001b[1;33m[Menu-LLA-Story | ${getDateNow()}] [WARN]\u001b[0m`, s);
}

export function errlog(...s) {
    console.log(`\u001b[1;31m[Menu-LLA-Story | ${getDateNow()}] [ERROR]\u001b[0m`, s);
}