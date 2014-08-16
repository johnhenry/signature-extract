# Signature Extract

Extract digital signature information from request headers
(PublicKey, Signature, and SignedURI).

## Install
Note: this middleware expects certain headers to be set:
- Either an "Authentication" request header with
    publickey, signature, and signeduri information
- Or "x-pubkey", "x-signature", and "x-signeduri" from
    which to extract information

```bash
$ npm install signature-extract
```

## API

```js
var express             = require('express')
var signatureExtract    = require('signature-extract');
var options             = {};
var app = express();
app.use(signatureExtract(options));
```

### signatureExtract(options)

Returns the Signature Extract middleware using the given `options`.

```js
app.use(signatureExtract({
  bitauth: true
}))
```

#### Options

- `bitauth = false` - extract headers using the bitauth scheme (x-pubkey, x-signature).
Otherwise, the headers are extracted from the Authentication Header.

## Examples

### Server-Sent Events

```js
var express = require('express');
var app = express();
var signatureExtract = require('signature-extract');
app.use(...)
app.use(signatureExtract());
app.use(function(req,res){
    console.log(req.publicKey);//Log Public Key
    console.log(req.signature);//Log Signature
    console.log(req.signedURI);//Logg Signed URI
})
app.listen(8080);
```
## See Also
- [Signature Storage Middleware](https://github.com/johnhenry/signature-store)
- [Signature Verification Middleware](https://github.com/johnhenry/signature-verify)

## Credits
  - [John Henry](http://github.com/johnhenry)

## License

The MIT License (MIT)

Copyright (c) 2014 John Henry john@iamjohnhenry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
