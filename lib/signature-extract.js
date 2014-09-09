/**
 * Signature Extract
 * Copyright(c) 2014 John Henry
 * MIT Licensed
 *
 * Extract digital signatuer information from request headers
 * (PublicKey, Signature, and SignedURI).
 *
 * This this middleware extracts the public key, the signature, and the uri from
 * Authentication header of given request and assigns them as properties to the
 * request object ("publicey","signature", and "signeduri" respectively).
 * The format of the header follows as closely as possible the guidelines described
 * in HTTP Authentication: Basic and Digest Access Authentication (http://www.ietf.org/rfc/rfc2617.txt)
 * but there are some noticable devations.
 * Storage and verification is left to subsequent middleware.
 * If options.bitauth is specified as truthy, public key and the signature are
 * extracted from the "x-pubkey" and "x-signature" headers (see github.com/bitpay/bitauth)
 * and a x-signeduri key is also checked for compatibility with proxies.
 *
 * @param {Boolean} (optional) options.bitauth
 * @return {Function}
 * @api public
 */

module.exports = function(options){
    options = options || {};
    return function(request, response, next) {
        var headers = request.headers || {};
        request.publicKey = headers["x-pubkey"];
        request.signature = headers["x-signature"];
        request.signedURI = headers["x-signeduri"];
        if(options.bitauth){
            next();
        }else{
            try{
                var auth = headers["authentication"];
                auth = auth.split(" ");
                if(auth[0].toLowerCase() !== "digitalsignature"){
                    throw(new Error("Only 'DigialSignature' authentication method supported"));
                }
                auth = auth.slice(1).join("").split(",");
                var obj = {};
                for(var i in auth){
                    var param = auth[i].split("=");
                    var name = param[0];
                    var value = param[1].substr(1, param[1].length - 2);
                    obj[name] = value;
                }
                if(obj.algorithm.toLowerCase() !== "ecdsa"){
                    throw(new Error("Only 'ECDSA' algorithm supported"));
                }
                request.publicKey= obj.publickey;
                request.signature = obj.signature
                request.signedURI = obj.uri;
                next();
            }catch(e){
                next();
            }
        }
    };
}
