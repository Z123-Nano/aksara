export const toJavanese = (text: string): string => {
  if (!text) return '';

  const input = text.toLowerCase();
  let result = '';
  let i = 0;
  let wordStart = true; // true at start of string and after whitespace

  // Define consonant clusters (longest first for greedy matching)
  const clusters = ['dh', 'th', 'ny', 'ng'];

  // Define base consonants
  const consonants: Record<string, string> = {
    'k': 'ꦏ', 'g': 'ꦒ', 'ng': 'ꦔ', 'c': 'ꦕ', 'j': 'ꦗ', 'ny': 'ꦚ',
    't': 'ꦠ', 'd': 'ꦢ', 'n': 'ꦤ', 'p': 'ꦥ', 'b': 'ꦧ', 'm': 'ꦩ',
    'y': 'ꦪ', 'r': 'ꦫ', 'l': 'ꦭ', 'w': 'ꦮ', 's': 'ꦱ', 'h': 'ꦲ',
    // Add cluster mappings
    'dh': 'ꦝ', 'th': 'ꦛ'
  };

  // Define vowel signs with their Unicode codepoints
  // Note: 'a' is inherent vowel (no sign)
  const vowelSigns: Record<string, string> = {
    'a': '',   // inherent vowel
    'i': 'ꦶ',   // wulu
    'u': 'ꦸ',   // suku
    'e': 'ꦺ',   // taling
    'o': 'ꦺꦴ'   // taling tarung
  };

  // Ha-carrier glyph (used for word-initial vowels)
  const haCarrier = consonants['h']; // 'h': 'ꦲ'

  while (i < input.length) {
    // Handle whitespace
    if (input[i] === ' ') {
      result += ' ';
      i++;
      wordStart = true;
      continue;
    }

    // Handle word-initial vowels
    if (wordStart && ['a', 'i', 'u', 'e', 'o'].includes(input[i])) {
      const vowel = input[i];
      let sign = '';
      if (vowel === 'a') {
        // For word-initial 'a', use ha-carrier + pepet sign
        sign = 'ꦼ'; // pepet
      } else {
        sign = vowelSigns[vowel];
      }
      result += haCarrier + sign;
      i++;
      wordStart = false; // after processing the vowel, we are no longer at word start
      continue;
    }

    // Try to match longest consonant cluster first
    let matched = false;
    let consonant = '';
    let clusterLength = 0;

    // Check for clusters (2-char first)
    for (const cluster of clusters) {
      if (input.startsWith(cluster, i)) {
        consonant = cluster;
        clusterLength = cluster.length;
        matched = true;
        break;
      }
    }

    // If no cluster matched, try single consonant
    if (!matched && i < input.length) {
      const singleChar = input[i];
      if (consonants[singleChar]) {
        consonant = singleChar;
        clusterLength = 1;
        matched = true;
      }
    }

    // If still no match, pass through the character (vowel or other)
    if (!matched) {
      result += input[i];
      i++;
      wordStart = false;
      continue;
    }

    // Get the base consonant glyph
    let baseGlyph = consonants[consonant];
    if (!baseGlyph) {
      // Fallback - should not happen with proper mapping
      result += consonant;
      i += clusterLength;
      wordStart = false;
      continue;
    }

    // Look ahead for vowel
    let vowel = ''; // default no vowel
    let vowelLength = 0;

    if (i + clusterLength < input.length) {
      const nextChar = input[i + clusterLength];
      // Check for vowel letters
      if (['a', 'i', 'u', 'e', 'o'].includes(nextChar)) {
        vowel = nextChar;
        vowelLength = 1;
      }
    }

    // Output the consonant glyph
    result += baseGlyph;

    // If there is a vowel, output the vowel sign
    if (vowel) {
      result += vowelSigns[vowel];
    } else {
      // No vowel following, so add pangkon (virama)
      result += '꧀'; // U+A9C0
    }

    // Move position past consonant and vowel
    i += clusterLength + vowelLength;
    wordStart = false;
  }

  return result;
};

export const toSundanese = (text: string): string => {
  if (!text) return '';

  const input = text.toLowerCase();
  let result = '';
  let i = 0;

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

  // Tanda Vokal (Rarangkén) - Fixed Mapping according to user's claims
  const vowelSigns: Record<string, string> = {
    'i': 'ᮤ',   // Panghulu U+1BA4
    'u': 'ᮥ',   // Panyuku U+1BA5
    'ae': 'ᮨ',  // Pamepet U+1BA8
    'o': 'ᮧ',   // Panolong U+1BA7
    'e': 'ᮨ',   // Paneuleung U+1BA9
    'eu': '᮪',   // Pamaaeh (vowel killer) U+1BAA
  };

  // ✅ FIX: Gunakan 'const' karena object map dimutasi, bukan di-reassign
  const map: Record<string, string> = {};

  // 1. Generate Kombinasi Konsonan + Vokal
  Object.keys(consonants).forEach(cKey => {
    const char = consonants[cKey] as string;
    
    Object.keys(vowelSigns).forEach(vKey => {
      map[cKey + vKey] = char + (vowelSigns[vKey] ?? '');
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
    processed = processed.split(key).join(map[key] ?? key);
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
    const char = consonants[cKey] as string;

    Object.keys(vowels).forEach(vKey => {
      map[cKey + vKey] = char + (vowels[vKey] ?? '');
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
    processed = processed.split(key).join(map[key] ?? key);
  });

  return processed;
}
