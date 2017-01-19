(() => {
    const defaultLangpack = {
            ms: "ms",
            sec: "sec",
            min: "min",
            hour: "hr",
            day: "d"
        },
        toString = (ms, config = {}) => {
            const cfg = Object.assign({}, {
                lang: defaultLangpack
            }, config);


        },
        toMS = (ms, config = {}) => {
        },
        out = {
            toString,
            toMS
        },
        undef = "undefined";

    if (typeof window !== undef) {
        window.msUtil = out;
    }

    if (typeof module !== undef) {
        module.exports = out;
    }
})();