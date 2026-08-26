import { describe, it, expect } from 'vitest';
import { toJavanese, toSundanese, toMakassar, getConversionConfidence } from './aksaraConverter';

describe('aksaraConverter fixes', () => {
  it('should fix the ba/tha distinction in Javanese', () => {
    expect(toJavanese('ba')).toBe('ꦧ'); // ba should be ꦧ
    expect(toJavanese('tha')).toBe('ꦛ'); // tha should be ꦛ
    expect(toJavanese('b')).toBe('ꦧ'); // single b should also work
    expect(toJavanese('t')).toBe('ꦠ'); // single t should be ꦠ
  });

  it('should handle Javanese vowel signs with correct positioning', () => {
    // Javanese prefix vowel signs (e, o) come before the consonant in logical order
    expect(toJavanese('ke')).toBe('ꦺꦏ'); // e vowel sign + ka
    expect(toJavanese('ko')).toBe('ꦺꦴꦏ'); // taling+tarung + ka
    // Test postfix vowels (i, u come after consonant)
    expect(toJavanese('ki')).toBe('ꦏꦶ'); // ka + i vowel sign
    expect(toJavanese('ku')).toBe('ꦏꦸ'); // ka + u vowel sign
    // Test inherent vowel
    expect(toJavanese('ka')).toBe('ꦏ'); // ka = ka (inherent vowel, no sign)
  });

  it('should handle Javanese consonant clusters', () => {
    expect(toJavanese('kny')).toBe('ꦏꦚ'); // kny -> ka + ny
    expect(toJavanese('tha')).toBe('ꦛ'); // tha -> tha
    expect(toJavanese('dha')).toBe('ꦝ'); // dha -> dha
  });

  it('should preserve whitespace and word boundaries in Javanese', () => {
    expect(toJavanese('budi santoso')).toBe('ꦧꦸꦝꦶ ꦱꦤꦠꦺꦱꦾ');
    expect(toJavanese('  budi  santoso  ')).toBe('  ꦧꦸꦝꦶ  ꦱꦤꦠꦺꦱꦾ  ');
  });

  it('should use dictionary override for Javanese when available', () => {
    // Test with a word we know is in the dictionary ('budi' from seed data)
    expect(toJavanese('budi')).toBe('ꦧꦸꦝꦶ');
    expect(getConversionConfidence('budi', 'javanese')).toBe('verified');

    // Word not in dictionary should use rule-based
    expect(getConversionConfidence('unknownword', 'javanese')).toBe('rule-based');
  });
});

describe('aksaraConverter Sundanese', () => {
  it('should preserve whitespace and word boundaries', () => {
    expect(toSundanese('budi santoso')).toBe('ᮘᮥᮓ᮪ ᮞᮔᮒᮺᮞᮧᮍ');
    expect(toSundanese('  budi  santoso  ')).toBe('  ᮘᮥᮓ᮪  ᮞᮔᮒᮺᮞᮧᮍ  ');
  });

  it('should use dictionary override for Sundanese when available', () => {
    expect(toSundanese('budi')).toBe('ᮘᮥᮓ᮪');
    expect(getConversionConfidence('budi', 'sundanese')).toBe('verified');

    expect(getConversionConfidence('unknownword', 'sundanese')).toBe('rule-based');
  });
});

describe('aksaraConverter Makassar', () => {
  it('should preserve whitespace and word boundaries', () => {
    expect(toMakassar('budi santoso')).toBe('ᨅᨘᨊᨗ ᨔᮊᨈᮺᨔᮧᨚ');
    expect(toMakassar('  budi  santoso  ')).toBe('  ᨅᨘᨊᨗ  ᨔᮊᨈᮺᨔᮧᨚ  ');
  });

  it('should use dictionary override for Makassar when available', () => {
    expect(toMakassar('budi')).toBe('ᨅᨘᨊᨗ');
    expect(getConversionConfidence('budi', 'makassar')).toBe('verified');

    expect(getConversionConfidence('unknownword', 'makassar')).toBe('rule-based');
  });
});

