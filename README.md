[![Build Status](https://travis-ci.org/Alorel/node-ms-util.svg?branch=master)](https://travis-ci.org/Alorel/node-ms-util)
[![Coverage Status](https://coveralls.io/repos/github/Alorel/node-ms-util/badge.svg?branch=master)](https://coveralls.io/github/Alorel/node-ms-util?branch=master)

[![NPM](https://nodei.co/npm/ms-util.png?downloads=false&downloadRank=false&stars=false)](https://www.npmjs.com/package/ms-util/)

Converting millis to a human-readable string is a pain. It doesn't have to be.

# Table of contents

[![Greenkeeper badge](https://badges.greenkeeper.io/Alorel/node-ms-util.svg)](https://greenkeeper.io/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Related packages](#related-packages)
- [Base usage](#base-usage)
  - [Browser](#browser)
  - [NodeJS](#nodejs)
- [API](#api)
  - [parse](#parse)
  - [toWords](#towords)
  - [colonSeparated](#colonseparated)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Related packages

You might want to check out the [ms](https://www.npmjs.com/package/ms) package. There are two *main* differences:

  - It **can** convert a string to millis
  - It **can't** display more than one unit, i.e. `3,660,000` ms would be converted to one hour, not one hour and one minute.
  
# Base usage

Note: play around with it on [Runkit](https://runkit.com/npm/ms-util)!

## Browser

It's always best to use a specific version - you'll find the CDN URLs [here](https://www.jsdelivr.com/projects/ms-util).

```html
<script src="https://cdn.jsdelivr.net/ms-util/latest/ms-util.min.js" type="application/javascript"></script>
<!-- It is now available as window.parseMs -->
```

## NodeJS

```js
const parseMs = require('ms-util');
```

# API
## parse
Parse the given millis and return the number of days, hours, minutes seconds and ms they translate to.
```js
console.log(parseMs.parse(86407049));
```
```json
{
    "days": 1,
    "hours": 0,
    "minutes": 0,
    "seconds": 7,
    "millis": 49,
    "input": 86407049
}
```
## toWords
Parse the given millis to a word string, e.g. 3660000 ms would become 01hr 01min 00sec by default.

Function signature:

```js
parseMs.toWords = (ms, cfg = {}) => {};
```

Where `ms` is the millis you want to convert and cfg is configuration with the following keys:

  - **pad**: Whether to pad numbers with zeroes or not. Default: `true`.
  - **forceMS**: Force displaying millis even if `ms` is >= `1000`. Default: `false`.
  - **lang**: Language pack override. The default is:
  
```json
{
    "ms": "ms",
    "sec": "sec",
    "min": "min",
    "hour": "hr",
    "day": "d"
}
```

Usage:

```js
console.log(parseMs.toWords(86407049)); // 1d 00hr 00min 07sec
```

## colonSeparated
Parse the given millis to a colon-separated string, e.g. 3660000 ms would become 01:01:00 by default

Function signature:

```js
parseMs.colonSeparated = (ms, cfg = {}) => {};
```

Where `ms` is the millis you want to convert and cfg is configuration with the following keys:

  - **pad**: Whether to pad numbers with zeroes or not. Default: `true`.
  - **forceMS**: Force displaying millis even if `ms` is >= `1000`. Default: `false`.
  
Usage:

```js
console.log(parseMs.colonSeparated(86407049)); // 1:00:00:07
```