const { toSundanese } = require('./lib/aksaraConverter');

console.log('Testing toSundanese:');
console.log("a ->", toSundanese('a')); // should be ᮃ
console.log("ba ->", toSundanese('ba')); // should be ᮘ
console.log("bi ->", toSundanese('bi')); // should be ᮘ᮪
console.log("bu ->", toSundanese('bu')); // should be ᮘᮮ
console.log("be ->", toSundanese('be')); // should be ᮘᮩ
console.log("bo ->", toSundanese('bo')); // should be ᮘᮧ
console.log("new ->", toSundanese('new')); // n + e + w? n is ᮔ, e is ᮩ, w is ᮝ => ᮔᮩᮝ? But we need to check clustering.
console.log("sunda ->", toSundanese('sunda')); // s + u + n + d + a? Actually sunda: s u n d a -> s is ᮞ, u is ᮮ, n is ᮔ, d is ᮓ, a is inherent -> ᮞᮮᮔᮓ? Let's see.