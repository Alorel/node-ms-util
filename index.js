/*
 * Copyright (c) Art <a.molcanovas@gmail.com>
 * Licensed under MIT: https://github.com/Alorel/node-ms-util/blob/master/LICENSE
 */

const defaultLangpack = {
    ms: "ms",
    sec: "sec",
    min: "min",
    hour: "hr",
    day: "d"
};
const defaultCfg = {
    lang: defaultLangpack,
    pad: true,
    forceMS: false
};

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const pad = (input, length = 2) => {
    input = input.toString();

    if (input.length < length) {
        let out = [input];
        for (let i = 0; i < length - input.length; i++) {
            out.unshift(0);
        }
        return out.join("");
    }

    return input;
};

const doPad = (input) => {
    input.millis = pad(input.millis, 3);
    for (let k of ['hours', 'minutes', 'seconds']) {
        input[k] = pad(input[k]);
    }
    return input;
};

/**
 * Parse the given millis and return the number of days, hours, minutes seconds and ms they translate to.
 * @param {Number} ms Input millis
 * @returns {{days: Number, hours: Number, minutes: Number, seconds: Number, millis: Number, input: Number}}
 */
const parse = ms => {
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % day % hour) / minute);
    const seconds = Math.floor((ms % day % hour % minute) / second);
    const millis = ms % 1000;

    return {days, hours, minutes, seconds, millis, input: ms};
};

/**
 * Parse the given millis to a word string, e.g. 3660000 ms would become 01hr 01min 00sec by default.
 * @param {Number} ms Input millis
 * @param {Object} [cfg] Configuration. Available keys:
 * <ul>
 *     <li><b>pad</b>: whether to pad the output numbers with zeroes (default: true)</li>
 *     <li><b>forceMS</b>: whether to display milliseconds even if ms >= 1000 (default: false)</li>
 *     <li>
 *         <b>lang</b>: language pack override. The default is
 *         <pre>
 *         {<br/>
 *              ms: "ms",<br/>
 *              sec: "sec",<br/>
 *              min: "min",<br/>
 *              hour: "hr",<br/>
 *              day: "d"<br/>
 *          }
 *             </pre>
 *     </li>
 * </ul>
 * @returns {string}
 */
const toWords = (ms, cfg) => {
    cfg = Object.assign({}, defaultCfg, cfg || {});
    let parsed = parse(ms);
    if (cfg.pad) {
        parsed = doPad(parsed);
    }

    let ret = [];

    if ((ms >= second && cfg.forceMS) || ms < second) {
        ret.push("" + parsed.millis + cfg.lang.ms);
    }
    if (ms >= second) {
        ret.unshift("" + parsed.seconds + cfg.lang.sec);
    }
    if (ms >= minute) {
        ret.unshift("" + parsed.minutes + cfg.lang.min);
    }
    if (ms >= hour) {
        ret.unshift("" + parsed.hours + cfg.lang.hour);
    }
    if (ms >= day) {
        ret.unshift("" + parsed.days + cfg.lang.day);
    }

    return ret.join(" ");
};

/**
 * Parse the given millis to a colon-separated string, e.g. 3660000 ms would become 01:01:00 by default
 * @param {Number} ms Input millis
 * @param {Object} [cfg] Configuration. Available keys:
 * <ul>
 *     <li><b>pad</b>: whether to pad the output numbers with zeroes (default: true)</li>
 *     <li><b>forceMS</b>: whether to display milliseconds even if ms >= 1000 (default: false)</li>
 * </ul>
 * @returns {string}
 */
const colonSeparated = (ms, cfg) => {
    cfg = Object.assign({}, defaultCfg, cfg || {});
    let parsed = parse(ms);
    if (cfg.pad) {
        parsed = doPad(parsed);
    }

    let ret = [];

    if ((ms >= second && cfg.forceMS) || ms < second) {
        ret.push(parsed.millis);
    }
    if (ms >= second) {
        ret.unshift(parsed.seconds);
    }
    if (ms >= minute) {
        ret.unshift(parsed.minutes);
    }
    if (ms >= hour) {
        ret.unshift(parsed.hours);
    }
    if (ms >= day) {
        ret.unshift(parsed.days);
    }

    return ret.join(":");
};

const out = {parse, toWords, colonSeparated};
const undef = "undefined";

if (typeof module !== undef) {
    module.exports = out;
}
if (typeof window !== undef) {
    window.parseMs = out;
}