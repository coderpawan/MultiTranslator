# npm-gtranslator

## Usage

```javascript
var GTranslator = require("g-translator");
new GTranslator({q:"text",tl:"translation language",sl:"text language"},function (res) {
    console.log(res);
});
```

```javascript
var GTranslator = require("g-translator");
new GTranslator({q:"hello",tl:"ar"},function (res) {
    console.log(res);
});
```
