import test from "ava";
const pkg = require('./src/index.js');
// const pkg = require('./dist/ms-util.min.js');
const times = {
    justMS: 43,
    seconds: 1069,
    minutes: 69003,
    hours: 3610005,
    days: 86407049
};

test('ms:parse', t => {
    const expect = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            millis: 43,
            input: times.justMS
        },
        actual = pkg.parse(times.justMS);

    t.deepEqual(actual, expect);
});

test('ms:words', t => {
    const words = {
        noPad: pkg.toWords(times.justMS, {pad: false}),
        pad: pkg.toWords(times.justMS, {pad: true})
    };
    t.is(words.noPad, '43ms', 'No padding');
    t.is(words.pad, '043ms', 'padded');
});

test('ms:colon', t => {
    const colon = {
        noPad: pkg.colonSeparated(times.justMS, {pad: false}),
        pad: pkg.colonSeparated(times.justMS, {pad: true})
    };

    t.is(colon.noPad, '43', 'No padding');
    t.is(colon.pad, '043', 'padded');
});

test('seconds:parse', t => {
    const expect = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 1,
            millis: 69,
            input: times.seconds
        },
        actual = pkg.parse(times.seconds);

    t.deepEqual(actual, expect);
});

test('seconds:words', t => {
    const words = {
        noPadNoMs: pkg.toWords(times.seconds, {pad: false, forceMS: false}),
        noPadMs: pkg.toWords(times.seconds, {pad: false, forceMS: true}),
        padNoMs: pkg.toWords(times.seconds, {pad: true, forceMS: false}),
        padMs: pkg.toWords(times.seconds, {pad: true, forceMS: true}),
    };

    t.is(words.noPadNoMs, '1sec', 'No pad, no ms');
    t.is(words.noPadMs, '1sec 69ms', 'no pad, ms');
    t.is(words.padNoMs, '01sec', 'pad, no ms');
    t.is(words.padMs, '01sec 069ms', 'pad, ms');
});

test('seconds:colon', t => {
    const colon = {
        noPadNoMs: pkg.colonSeparated(times.seconds, {pad: false, forceMS: false}),
        noPadMs: pkg.colonSeparated(times.seconds, {pad: false, forceMS: true}),
        padNoMs: pkg.colonSeparated(times.seconds, {pad: true, forceMS: false}),
        padMs: pkg.colonSeparated(times.seconds, {pad: true, forceMS: true})
    };

    t.is(colon.noPadNoMs, '1', 'no pad, no ms');
    t.is(colon.noPadMs, '1:69', 'no pad, ms');
    t.is(colon.padNoMs, '01', 'pad, no ms');
    t.is(colon.padMs, '01:069', 'pad, ms');
});

test('minutes:parse', t => {
    const expect = {
            days: 0,
            hours: 0,
            minutes: 1,
            seconds: 9,
            millis: 3,
            input: times.minutes
        },
        actual = pkg.parse(times.minutes);

    t.deepEqual(actual, expect);
});

test('minutes:words', t => {
    const words = {
        noPadNoMs: pkg.toWords(times.minutes, {pad: false, forceMS: false}),
        noPadMs: pkg.toWords(times.minutes, {pad: false, forceMS: true}),
        padNoMs: pkg.toWords(times.minutes, {pad: true, forceMS: false}),
        padMs: pkg.toWords(times.minutes, {pad: true, forceMS: true}),
    };

    t.is(words.noPadNoMs, '1min 9sec', 'No pad, no ms');
    t.is(words.noPadMs, '1min 9sec 3ms', 'no pad, ms');
    t.is(words.padNoMs, '01min 09sec', 'pad, no ms');
    t.is(words.padMs, '01min 09sec 003ms', 'pad, ms');
});

test('minutes:colon', t => {
    const colon = {
        noPadNoMs: pkg.colonSeparated(times.minutes, {pad: false, forceMS: false}),
        noPadMs: pkg.colonSeparated(times.minutes, {pad: false, forceMS: true}),
        padNoMs: pkg.colonSeparated(times.minutes, {pad: true, forceMS: false}),
        padMs: pkg.colonSeparated(times.minutes, {pad: true, forceMS: true})
    };

    t.is(colon.noPadNoMs, '1:9', 'no pad, no ms');
    t.is(colon.noPadMs, '1:9:3', 'no pad, ms');
    t.is(colon.padNoMs, '01:09', 'pad, no ms');
    t.is(colon.padMs, '01:09:003', 'pad, ms');
});

test('hours:parse', t => {
    const expect = {
            days: 0,
            hours: 1,
            minutes: 0,
            seconds: 10,
            millis: 5,
            input: times.hours
        },
        actual = pkg.parse(times.hours);

    t.deepEqual(actual, expect);
});

test('hours:words', t => {
    const words = {
        noPadNoMs: pkg.toWords(times.hours, {pad: false, forceMS: false}),
        noPadMs: pkg.toWords(times.hours, {pad: false, forceMS: true}),
        padNoMs: pkg.toWords(times.hours, {pad: true, forceMS: false}),
        padMs: pkg.toWords(times.hours, {pad: true, forceMS: true}),
    };

    t.is(words.noPadNoMs, '1hr 0min 10sec', 'No pad, no ms');
    t.is(words.noPadMs, '1hr 0min 10sec 5ms', 'no pad, ms');
    t.is(words.padNoMs, '01hr 00min 10sec', 'pad, no ms');
    t.is(words.padMs, '01hr 00min 10sec 005ms', 'pad, ms');
});

test('hours:colon', t => {
    const colon = {
        noPadNoMs: pkg.colonSeparated(times.hours, {pad: false, forceMS: false}),
        noPadMs: pkg.colonSeparated(times.hours, {pad: false, forceMS: true}),
        padNoMs: pkg.colonSeparated(times.hours, {pad: true, forceMS: false}),
        padMs: pkg.colonSeparated(times.hours, {pad: true, forceMS: true})
    };

    t.is(colon.noPadNoMs, '1:0:10', 'no pad, no ms');
    t.is(colon.noPadMs, '1:0:10:5', 'no pad, ms');
    t.is(colon.padNoMs, '01:00:10', 'pad, no ms');
    t.is(colon.padMs, '01:00:10:005', 'pad, ms');
});

test('days:parse', t => {
    const expect = {
            days: 1,
            hours: 0,
            minutes: 0,
            seconds: 7,
            millis: 49,
            input: times.days
        },
        actual = pkg.parse(times.days);

    t.deepEqual(actual, expect);
});

test('days:words', t => {
    const words = {
        noPadNoMs: pkg.toWords(times.days, {pad: false, forceMS: false}),
        noPadMs: pkg.toWords(times.days, {pad: false, forceMS: true}),
        padNoMs: pkg.toWords(times.days, {pad: true, forceMS: false}),
        padMs: pkg.toWords(times.days, {pad: true, forceMS: true}),
    };

    t.is(words.noPadNoMs, '1d 0hr 0min 7sec', 'No pad, no ms');
    t.is(words.noPadMs, '1d 0hr 0min 7sec 49ms', 'no pad, ms');
    t.is(words.padNoMs, '1d 00hr 00min 07sec', 'pad, no ms');
    t.is(words.padMs, '1d 00hr 00min 07sec 049ms', 'pad, ms');
});

test('days:colon', t => {
    const colon = {
        noPadNoMs: pkg.colonSeparated(times.days, {pad: false, forceMS: false}),
        noPadMs: pkg.colonSeparated(times.days, {pad: false, forceMS: true}),
        padNoMs: pkg.colonSeparated(times.days, {pad: true, forceMS: false}),
        padMs: pkg.colonSeparated(times.days, {pad: true, forceMS: true})
    };

    t.is(colon.noPadNoMs, '1:0:0:7', 'no pad, no ms');
    t.is(colon.noPadMs, '1:0:0:7:49', 'no pad, ms');
    t.is(colon.padNoMs, '1:00:00:07', 'pad, no ms');
    t.is(colon.padMs, '1:00:00:07:049', 'pad, ms');
});