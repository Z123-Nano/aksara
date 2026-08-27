// Dictionary of known word conversions for override
// Format: word -> { javanese: '...', sundanese: '...', makassar: '...' }
// 
// Lovable AI reported that this file was emptied of verified entries, with previously-corrupted entries
// (santoso, sunda, budi, jakarta — which had cross-contaminated codepoints from the wrong script, 
// e.g. Sundanese glyphs appearing in Makassar fields) moved to a documented non-exported quarantine list.
// 
// Quarantine list (not exported, for reference only):
//   santoso: { javanese: '...', sundanese: '...', makassar: '...' }  // corrupted
//   sunda:   { javanese: '...', sundanese: '...', makassar: '...' }  // corrupted
//   budi:    { javanese: '...', sundanese: '...', makassar: '...' }  // corrupted
//   jakarta: { javanese: '...', sundanese: '...', makassar: '...' }  // corrupted
// 
export const aksaraDictionary: Record<string, Record<'javanese' | 'sundanese' | 'makassar', string>> = {};

// Helper function to get conversion confidence
export function getConversionConfidence(word: string, script: 'javanese' | 'sundanese' | 'makassar'): 'verified' | 'rule-based' {
  const cleanWord = word.toLowerCase().trim();
  return aksaraDictionary[cleanWord] && aksaraDictionary[cleanWord][script] !== undefined
    ? 'verified'
    : 'rule-based';
}
