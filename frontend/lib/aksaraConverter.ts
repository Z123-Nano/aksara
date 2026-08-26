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
  if (!text) return '';

  const input = text.toLowerCase().trim();
  let result = '';
  let i = 0;

  // Define consonant clusters (longest first for greedy matching)
  const clusters = ['kh', 'ng', 'ny', 'sy'];

  // Define base consonants
  const consonants: Record<string, string> = {
    'k': 'ᮊ', 'g': 'ᮌ', 'c': 'ᮎ', 'j': 'ᮏ',
    't': 'ᮒ', 'd': 'ᮓ', 'n': 'ᮔ', 'p': 'ᮕ',
    'b': 'ᮘ', 'm': 'ᮙ', 'y': 'ᮚ', 'r': 'ᮛ',
    'l': 'ᮜ', 'w': 'ᮝ', 's': 'ᮞ', 'h': 'ᮠ',
    'f': 'ᮖ', 'v': 'ᮗ', 'z': 'ᮟ',
    // Add cluster mappings
    'kh': 'ᮭ', 'ng': 'ᮍ', 'ny': 'ᮑ', 'sy': 'ᮯ'
  };

  // Define independent vowels (for word beginnings)
  const independentVowels: Record<string, string> = {
    'a': 'ᮃ', 'i': 'ᮄ', 'u': 'ᮅ', 'ae': 'ᮈ',
    'o': 'ᮇ', 'e': 'ᮆ', 'eu': 'ᮉ'
  };

  // Define dependent vowel signs (rarangkén) with positioning
  // Format: [vowelChar, { prefix: boolean, glyph: string }]
  // Based on research: most Sundanese vowel signs are postfix
  const vowelSigns: Record<string, [boolean, string]> = {
    'a': [false, ''], // inherent vowel (no sign)
    'i': [false, '᮪'], // panghulu - POSTFIX (U+1B6A)
    'u': [false, 'ᮮ'], // pamaséng - POSTFIX (U+1B6E)
    'ae': [false, 'ᮨ'], // pamepet - POSTFIX (U+1B68)
    'o': [false, 'ᮧ'], // panolong - POSTFIX (U+1B67)
    'e': [false, 'ᮩ'], // paneuleung - POSTFIX (U+1B69)
    'eu': [false, '᮵'], // panyuku - POSTFIX (U+1B75)
  };

  while (i < input.length) {
    // Skip whitespace and preserve it
    if (input[i] === ' ') {
      result += ' ';
      i++;
      continue;
    }

    // Handle independent vowels at start of word
    let isStartOfWord = (i === 0 || input[i-1] === ' ');
    if (isStartOfWord) {
      // Check for 2-char independent vowels first
      if (i + 1 < input.length) {
        const twoChar = input.substring(i, i + 2);
        if (independentVowels[twoChar]) {
          result += independentVowels[twoChar];
          i += 2;
          continue;
        }
      }
      // Check for 1-char independent vowels
      const oneChar = input[i];
      if (independentVowels[oneChar]) {
        result += independentVowels[oneChar];
        i += 1;
        continue;
      }
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

    // If still no match, pass through the character
    if (!matched) {
      result += input[i];
      i++;
      continue;
    }

    // Get the base consonant glyph
    let baseGlyph = consonants[consonant];
    if (!baseGlyph) {
      // Fallback - should not happen with proper mapping
      result += consonant;
      i += clusterLength;
      continue;
    }

    // Look ahead for vowel
    let vowel = 'a'; // default inherent vowel
    let vowelLength = 0;

    if (i + clusterLength < input.length) {
      const nextChar = input[i + clusterLength];
      // Check for vowel signs
      if (['a', 'i', 'u', 'ae', 'o', 'e', 'eu'].includes(nextChar)) {
        // Handle 2-char vowels first
        if (nextChar === 'a' && i + clusterLength + 1 < input.length && input[i + clusterLength + 1] === 'e') {
          vowel = 'ae';
          vowelLength = 2;
        } else if (nextChar === 'e' && i + clusterLength + 1 < input.length && input[i + clusterLength + 1] === 'u') {
          vowel = 'eu';
          vowelLength = 2;
        } else {
          vowel = nextChar;
          vowelLength = 1;
        }
      }
    }

    // Apply vowel sign according to positioning rules
    const [isPrefix, vowelGlyph] = vowelSigns[vowel];

    if (isPrefix) {
      // Prefix vowels come before the consonant
      result += vowelGlyph + baseGlyph;
    } else if (vowelGlyph) {
      // Postfix vowels come after the consonant
      result += baseGlyph + vowelGlyph;
    } else {
      // No vowel sign (inherent 'a')
      result += baseGlyph;
    }

    // Move position past consonant and vowel
    i += clusterLength + vowelLength;
  }

  return result;
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