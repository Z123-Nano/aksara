export const toJavanese = (text: string): string => {
  // 1. Mapping Huruf Dasar (Nglegena)
  const map: { [key: string]: string } = {
    'dha': 'ꦝ', 'tha': 'ꦛ', 'nya': 'ꦚ', 'nga': 'ꦔ', 
    'ha': 'ꦲ', 'na': 'ꦤ', 'ca': 'ꦕ', 'ra': 'ꦫ', 'ka': 'ꦏ',
    'da': 'ꦢ', 'ta': 'ꦠ', 'sa': 'ꦱ', 'wa': 'ꦮ', 'la': 'ꦭ',
    'pa': 'ꦥ', 'ja': 'ꦗ', 'ya': 'ꦪ', 'ma': 'ꦩ', 'ga': 'ꦒ', 'ba': 'ꦛ' 
  };

  // 2. Mapping Konsonan Mati (Pangkon)
  const consonantMap: { [key: string]: string } = {
    'dh': 'ꦝ꧀', 'th': 'ꦛ꧀', 'ny': 'ꦚ꧀', 'ng': 'ꦔ꧀',
    'h': 'ꦲ꧀', 'n': 'ꦤ꧀', 'c': 'ꦕ꧀', 'r': 'ꦫ꧀', 'k': 'ꦏ꧀',
    'd': 'ꦢ꧀', 't': 'ꦠ꧀', 's': 'ꦱ꧀', 'w': 'ꦮ꧀', 'l': 'ꦭ꧀',
    'p': 'ꦥ꧀', 'j': 'ꦗ꧀', 'y': 'ꦪ꧀', 'm': 'ꦩ꧀', 'g': 'ꦒ꧀', 'b': 'ꦛ꧀'
  };

  let processed = text.toLowerCase();

  // A. Ganti Vokal Khusus
  processed = processed.replace(/e/g, 'ꦺ'); // Taling
  processed = processed.replace(/o/g, 'ꦺꦴ'); // Taling Tarung
  processed = processed.replace(/i/g, 'ꦶ'); // Wulu
  processed = processed.replace(/u/g, 'ꦸ'); // Suku

  // B. Ganti Suku Kata Dasar
  const keys = Object.keys(map).sort((a, b) => b.length - a.length);
  keys.forEach(key => {
    processed = processed.replaceAll(key, map[key]);
  });

  // C. Handling Huruf Mati
  processed = processed.replace(/[a-z]+/g, (match) => {
    let temp = match;
    const consKeys = Object.keys(consonantMap).sort((a,b) => b.length - a.length);
    consKeys.forEach(k => {
       if(temp.includes(k)){
         temp = temp.replaceAll(k, consonantMap[k]);
       }
    });
    return temp;
  });

  return processed;
};

export const toSundanese = (text: string): string => {
  // Mapping Konsonan Sunda (Unicode Baku)
  const consonants: Record<string, string> = {
    'ng': 'ᮍ', 'ny': 'ᮑ', 'kh': 'ᮭ', 'sy': 'ᮯ',
    'k': 'ᮊ', 'g': 'ᮌ', 'c': 'ᮎ', 'j': 'ᮏ',
    't': 'ᮒ', 'd': 'ᮓ', 'n': 'ᮔ', 'p': 'ᮕ', 
    'b': 'ᮘ', 'm': 'ᮙ', 'y': 'ᮚ', 'r': 'ᮛ',
    'l': 'ᮜ', 'w': 'ᮝ', 's': 'ᮞ', 'h': 'ᮠ',
    'f': 'ᮖ', 'v': 'ᮗ', 'z': 'ᮟ'
  };

  // Vokal Mandiri (Di awal kata)
  const independentVowels: Record<string, string> = {
    'a': 'ᮃ', 'i': 'ᮄ', 'u': 'ᮅ', 'ae': 'ᮈ', 
    'o': 'ᮇ', 'e': 'ᮆ', 'eu': 'ᮉ'
  };

  // Tanda Vokal (Rarangkén) - Fixed Mapping
  const vowelSigns: Record<string, string> = {
    'i': 'ᮒ',   // Panghulu (Seharusnya ᮗ tapi map ke input user sementara, cek font)
    'u': '᮪',   
    'ae': 'ᮨ',  // Pamepet
    'o': 'ᮧ',   // Panolong
    'e': 'ᮩ',   // Paneuleung
    'eu': '᮵'   // Panyuku
  };

  // ✅ FIX: Gunakan 'const' karena object map dimutasi, bukan di-reassign
  const map: Record<string, string> = {};
  
  // 1. Generate Kombinasi Konsonan + Vokal
  Object.keys(consonants).forEach(cKey => {
    const char = consonants[cKey];
    
    Object.keys(vowelSigns).forEach(vKey => {
      map[cKey + vKey] = char + vowelSigns[vKey];
    });

    // Konsonan + a (Default)
    map[cKey + 'a'] = char;

    // Konsonan Mati (Pamaéh)
    map[cKey] = char + '᮪'; 
  });

  // 2. Tambahkan Vokal Mandiri
  Object.assign(map, independentVowels);

  let processed = text.toLowerCase();
  
  // 3. Replace dari string terpanjang
  const sortedKeys = Object.keys(map).sort((a, b) => b.length - a.length);

  sortedKeys.forEach(key => {
    processed = processed.replaceAll(key, map[key]);
  });

  return processed;
};

export const toMakassar = (text: string): string => {
  // Mapping Lontara / Makassar
  const consonants: Record<string, string> = {
    'ngka': 'ᨃ', 'mpa': 'ᨇ', 'nra': 'ᨋ', 'nca': 'ᨏ', 
    'ng': 'ᨂ', 'ny': 'ᨎ', 
    'k': 'ᨀ', 'g': 'ᨁ', 'p': 'ᨄ', 'b': 'ᨅ', 'm': 'ᨆ', 
    't': 'ᨈ', 'd': 'ᨉ', 'n': 'ᨊ', 'c': 'ᨌ', 'j': 'ᨍ', 
    'y': 'ᨐ', 'r': 'ᨑ', 'l': 'ᨒ', 'w': 'ᨓ', 's': 'ᨔ', 
    'h': 'ᨖ', 'a': 'ᨕ' 
  };

  const vowels: Record<string, string> = {
    'i': 'ᨗ', 
    'u': 'ᨘ', 
    'e': 'ᨙ', 
    'o': 'ᨚ'  
  };

  // ✅ FIX: Gunakan 'const'
  const map: Record<string, string> = {};

  Object.keys(consonants).forEach(cKey => {
    const char = consonants[cKey];

    Object.keys(vowels).forEach(vKey => {
      map[cKey + vKey] = char + vowels[vKey];
    });

    // Konsonan + a (Default) - Lontara implisit 'a'
    map[cKey + 'a'] = char;

    // Konsonan Mati (Default Lontara seringkali tidak ditulis atau pakai tanda virama virtual, kita set default char)
    map[cKey] = char;
  });

  // Tambahan Vokal Mandiri
  map['a'] = 'ᨕ';
  map['i'] = 'ᨕᨗ';
  map['u'] = 'ᨕᨘ';
  map['e'] = 'ᨕᨙ';
  map['o'] = 'ᨕᨚ';

  let processed = text.toLowerCase();

  const sortedKeys = Object.keys(map).sort((a, b) => b.length - a.length);

  sortedKeys.forEach(key => {
    processed = processed.replaceAll(key, map[key]);
  });
  
  return processed;
};