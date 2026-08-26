// Dictionary of known word conversions for override
// Format: word -> { javanese: '...', sundanese: '...', makassar: '...' }
export const aksaraDictionary: Record<string, Record<'javanese' | 'sundanese' | 'makassar', string>> = {
  // Javanese examples
  'budi': {
    javanese: 'ꦧꦸꦝꦶ',
    sundanese: 'ᮘᮥᮓ᮪',
    makassar: 'ᨅᨘᨊᨗ'
  },
  'santoso': {
    javanese: 'ꦱꦤꦠꦺꦱꦾ',
    sundanese: 'ᮞᮔᮒᮺᮞᮧᮍ',
    makassar: 'ᨔᮊᨈᮺᨔᮧᨚ'
  },
  // 'jakarta': {  // NEEDS VERIFICATION - REMOVED CORRUPTED ENTRY
  //   javanese: 'TODO_VERIFY_JAVANESE',
  //   sundanese: 'TODO_VERIFY_SUNDANESE',
  //   makassar: 'TODO_VERIFY_MAKASSAR'
  // },
  // Add more examples as needed
  'jawa': {
    javanese: 'ꦗꦮ',
    sundanese: 'ᮏᮝ',
    makassar: 'ᨍᨓ'
  },
  'sunda': {
    javanese: 'ꦱꦸꦤꦝꦏꦼ',
    sundanese: 'ᮞᮥᮔ᮪ᮓᮨ',
    makassar: 'ᨔᨘᮔᨉᨊᮌ'
  },
  'makassar': {
    javanese: 'ꦩꦏꦱꦱꦂ',
    sundanese: 'ᮙᨀᮓᨀᮓᨀ',
    makassar: 'ᨆᨀᨔᨔᨑ'
  }
};

// Helper function to get conversion confidence
export function getConversionConfidence(word: string, script: 'javanese' | 'sundanese' | 'makassar'): 'verified' | 'rule-based' {
  const cleanWord = word.toLowerCase().trim();
  return aksaraDictionary[cleanWord] && aksaraDictionary[cleanWord][script] !== undefined
    ? 'verified'
    : 'rule-based';
}