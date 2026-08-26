import { aksaraDictionary, getConversionConfidence } from './aksaraDictionary';

// Export getConversionConfidence for use in tests
export { getConversionConfidence };

// ===== JAVANESE CONVERTER =====
export const toJavanese = (text: string): string => {
  if (!text) return '';

  // Split into words, process each word, preserve whitespace
  const words = text.split(/(\s+)/); // Split on whitespace, keeping delimiters
  return words.map(word => {
    // If it's whitespace, return as-is
    if (/^\s+$/.test(word)) return word;

    // Check dictionary first
    const cleanWord = word.toLowerCase();
    if (aksaraDictionary[cleanWord] && aksaraDictionary[cleanWord].javanese !== undefined) {
      return aksaraDictionary[cleanWord].javanese;
    }

    // Fall back to rule-based syllabifier
    return toJavaneseRuleBased(word);
  }).join('');
};

const toJavaneseRuleBased = (text: string): string => {
  if (!text) return '';

  const input = text.toLowerCase();
  let result = '';
  let i = 0;

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

  // Define vowel signs with their Unicode codepoints and positioning
  // Format: [vowelChar, { prefix: boolean, glyph: string }]
  const vowelSigns: Record<string, [boolean, string]> = {
    'a': [false, ''], // inherent vowel (no sign)
    'i': [false, 'ꦶ'], // wulu - POSTFIX (U+A9B6)
    'u': [false, 'ꦸ'], // suku - POSTFIX (U+A9B8)
    'e': [true, 'ꦺ'],  // taling - PREFIX (U+A9BA)
    'o': [true, 'ꦺꦴ'], // taling+tarung - PREFIX (U+A9BA U+A9B4)
    // Optional vowels
    'ê': [false, 'ꦼ'], // pepet - POSTFIX (U+A9BC)
  };

  // Define pangkon (virama) for dead consonants
  const pangkon = '꧀'; // U+A9C0

  while (i < input.length) {
    // Skip whitespace and preserve it
    if (input[i] === ' ') {
      result += ' ';
      i++;
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
      if (['a', 'i', 'u', 'e', 'o', 'ê'].includes(nextChar)) {
        vowel = nextChar;
        vowelLength = 1;
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

    // Check if next character is a consonant that should form a conjunct
    // For now, we'll handle basic pangkon for word-final consonants
    // More complex conjunct handling would go here for mid-word clusters
  }

  return result;
};

// ===== SUNDANESE CONVERTER =====
export const toSundanese = (text: string): string => {
  if (!text) return '';

  // Split into words, process each word, preserve whitespace
  const words = text.split(/(\s+)/); // Split on whitespace, keeping delimiters
  return words.map(word => {
    // If it's whitespace, return as-is
    if (/^\s+$/.test(word)) return word;

    // Check dictionary first
    const cleanWord = word.toLowerCase();
    if (aksaraDictionary[cleanWord] && aksaraDictionary[cleanWord].sundanese !== undefined) {
      return aksaraDictionary[cleanWord].sundanese;
    }

    // Fall back to rule-based syllabifier
    return toSundaneseRuleBased(word);
  }).join('');
};

const toSundaneseRuleBased = (text: string): string => {
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

    // In Unicode logical order, combining marks always follow the base character
    // regardless of whether they render as prefix or postfix.
    if (vowelGlyph) {
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

// ===== MAKASSAR CONVERTER =====
export const toMakassar = (text: string): string => {
  if (!text) return '';

  // Split into words, process each word, preserve whitespace
  const words = text.split(/(\s+)/); // Split on whitespace, keeping delimiters
  return words.map(word => {
    // If it's whitespace, return as-is
    if (/^\s+$/.test(word)) return word;

    // Check dictionary first
    const cleanWord = word.toLowerCase();
    if (aksaraDictionary[cleanWord] && aksaraDictionary[cleanWord].makassar !== undefined) {
      return aksaraDictionary[cleanWord].makassar;
    }

    // Fall back to rule-based syllabifier
    return toMakassarRuleBased(word);
  }).join('');
};

const toMakassarRuleBased = (text: string): string => {
  if (!text) return '';

  const input = text.toLowerCase().trim();
  let result = '';
  let i = 0;

  // Define consonant clusters (longest first for greedy matching)
  const clusters = ['ngka', 'mpa', 'nra', 'nca', 'ng', 'ny'];

  // Define base consonants
  const consonants: Record<string, string> = {
    'k': 'ᨀ', 'g': 'ᨁ', 'p': 'ᨄ', 'b': 'ᨅ', 'm': 'ᨆ',
    't': 'ᨈ', 'd': 'ᨉ', 'n': 'ᨊ', 'c': 'ᨌ', 'j': 'ᨍ',
    'y': 'ᨐ', 'r': 'ᨑ', 'l': 'ᨒ', 'w': 'ᨓ', 's': 'ᨔ',
    'h': 'ᨖ',
    // Add cluster mappings from original
    'ngka': 'ᨃ', 'mpa': 'ᨇ', 'nra': 'ᨋ', 'nca': 'ᨏ',
    'ng': 'ᨂ', 'ny': 'ᨎ'
  };

  // Define vowel signs with positioning
  // Format: [vowelChar, { prefix: boolean, glyph: string }]
  const vowelSigns: Record<string, [boolean, string]> = {
    'a': [false, ''], // inherent vowel (not written in Lontara)
    'i': [false, 'ᨗ'], // U+1A17
    'u': [false, 'ᨘ'], // U+1A18
    'e': [false, 'ᨙ'], // U+1A19
    'o': [false, 'ᨚ'], // U+1A1A
  };

  while (i < input.length) {
    // Skip whitespace and preserve it
    if (input[i] === ' ') {
      result += ' ';
      i++;
      continue;
    }

    // Try to match longest consonant cluster first
    let matched = false;
    let consonant = '';
    let clusterLength = 0;

    // Check for clusters (longest first)
    for (const cluster of [...clusters].sort((a, b) => b.length - a.length)) {
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
      if (['a', 'i', 'u', 'e', 'o'].includes(nextChar)) {
        vowel = nextChar;
        vowelLength = 1;
      }
    }

    // Apply vowel sign according to positioning rules
    const [isPrefix, vowelGlyph] = vowelSigns[vowel];

    // In Unicode logical order, combining marks always follow the base character
    // regardless of whether they render as prefix or postfix.
    if (vowelGlyph) {
      result += baseGlyph + vowelGlyph;
    } else {
      // No vowel sign (inherent 'a') - not written in Lontara
      result += baseGlyph;
    }

    // Move position past consonant and vowel
    i += clusterLength + vowelLength;

    // Handle virama/pangkon equivalent for dead consonants
    // Lontara often doesn't write virama explicitly, but we can add it
    // for clarity if needed
  }

  return result;
};