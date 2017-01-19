((floor) => {
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

    const parse = ms => {
        const days = floor(ms / day);
        const hours = floor((ms % day) / hour);
        const minutes = floor((ms % day % hour) / minute);
        const seconds = floor((ms % day % hour % minute) / second);
        const millis = ms % 1000;

        return {days, hours, minutes, seconds, millis, input: ms};
    };

    const toWords = (ms, cfg) => {
        cfg = Object.assign({}, defaultCfg, cfg);
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

    const colonSeparated = (ms, cfg) => {
        cfg = Object.assign({}, defaultCfg, cfg);
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

    if (typeof window !== "undefined") {
        window.parseMs = out;
    }

    if (typeof module !== "undefined") {
        module.exports = out;
    }
})(Math.floor);