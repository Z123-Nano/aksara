const { toJavanese } = require('./lib/aksaraConverter');

console.log('Testing toJavanese:');
console.log('ba ->', toJavanese('ba')); // should be ꦧ
console.log('b ->', toJavanese('b')); // should be ꦧꦰ? Actually b alone should be ꦧ꧀
console.log('tha ->', toJavanese('tha')); // should be ꦛ
console.log('th ->', toJavanese('th')); // should be ꦛ꧀
console.log('budi ->', toJavanese('budi')); // should be ꦧꦸꦝꦶ
console.log('jakarta ->', toJavanese('jakarta')); // test
console.log('spasi ->', toJavanese('spasi')); // test