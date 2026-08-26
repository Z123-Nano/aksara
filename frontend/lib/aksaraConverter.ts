export const toJavanese = (text: string): string => {
  // Javanese Unicode block: U+A980–U+A9DF
  // Vowel signs:
  //   i (wulu)   = U+A9B6  ꦶ
  //   u (suku)   = U+A9B8  ꦸ
  //   e (taling) = U+A9BA  ꦺ
  //   o (taling tarung) = U+A9BA U+A9BB  ꦺꦴ
  // Pangkon (virama) = U+A9C0  ꧀

  // 1. Mapping Huruf Dasar (Nglegena) - consonant + inherent 'a'
  const consonantMap: { [key: string]: string } = {
    // digraphs
    'ny': 'ꦚ', 'ng': 'ꦔ', 'dh': 'ꦝ', 'th': 'ꦛ',
    // single consonants
    'h': 'ꦲ', 'n': 'ꦤ', 'c': 'ꦕ', 'r': 'ꦫ', 'k': 'ꦏ',
    'd': 'ꦢ', 't': 'ꦠ', 's': 'ꦱ', 'w': 'ꦮ', 'l': 'ꦭ',
    'p': 'ꦥ', 'j': 'ꦗ', 'y': 'ꦪ', 'm': 'ꦩ', 'g': 'ꦒ', 'b': 'ꦧ'
  };

  // 2. Mapping for consonant + pangkon (konsonan mati)
  const pangkonMap: { [key: string]: string } = {
    'ny': 'ꦚ꧀', 'ng': 'ꦔ꧀', 'dh': 'ꦝ꧀', 'th': 'ꦛ꧀',
    'h': 'ꦲ꧀', 'n': 'ꦤ꧀', 'c': 'ꦕ꧀', 'r': 'ꦫ꧀', 'k': 'ꦏ꧀',
    'd': 'ꦢ꧀', 't': 'ꦠ꧀', 's': 'ꦱ꧀', 'w': 'ꦮ꧀', 'l': 'ꦭ꧀',
    'p': 'ꦥ꧀', 'j': 'ꦗ꧀', 'y': 'ꦪ꧀', 'm': 'ꦩ꧀', 'g': 'ꦒ꧀', 'b': 'ꦧ꧀'
  };

  // 3. Vowel signs (including inherent 'a' with empty sign)
  const vowelSigns: { [key: string]: string } = {
    'a': '',   // inherent vowel (no sign)
    'i': 'ꦶ',   // wulu
    'u': 'ꦸ',   // suku
    'e': 'ꦺ',   // taling
    'o': 'ꦺꦴ'   // taling tarung
  };

  let processed = '';
  let i = 0;
  const lower = text.toLowerCase();

  while (i < lower.length) {
    // Try to match longest consonant cluster (digraph first)
    let match = null;
    let matchLen = 0;
    // Check digraphs (length 2) then single (length 1)
    for (let len = 2; len >= 1; len--) {
      if (i + len > lower.length) continue;
      const sub = lower.substring(i, i + len);
      if (consonantMap[sub]) {
        match = sub;
        matchLen = len;
        break;
      }
    }

    if (match) {
      const baseChar = consonantMap[match];
      // Look ahead for vowel
      let vowelSign = '';
      let vowelLen = 0;
      // Check for vowel (single char: a, i, u, e, o)
      // Note: 'o' is two Unicode codepoints but we treat as one input 'o'
      if (i + matchLen < lower.length) {
        const nextChar = lower.charAt(i + matchLen);
        if (vowelSigns[nextChar] !== undefined) {
          vowelSign = vowelSigns[nextChar];
          vowelLen = 1;
        }
      }

      if (vowelLen > 0) {
        // consonant + vowel (including inherent 'a')
        processed += baseChar + vowelSign;
        i += matchLen + vowelLen;
      } else {
        // consonant + pangkon (no vowel following)
        processed += pangkonMap[match];
        i += matchLen;
      }
    } else {
      // If no consonant match, treat as vowel? Should not happen for valid input.
      // For safety, pass through unchanged.
      processed += lower.charAt(i);
      i++;
    }
  }

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