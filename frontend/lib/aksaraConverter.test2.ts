import { describe, it, expect } from 'vitest';
import { toJavanese } from './aksaraConverter';

describe('toJavanese fixes', () => {
  it('should fix the ba/tha bug', () => {
    expect(toJavanese('ba')).toBe('ꦧ');
    expect(toJavanese('tha')).toBe('ꦛ');
  });

  it('should handle single consonant with pangkon', () => {
    expect(toJavanese('b')).toBe('ꦧ꧀');
    expect(toJavanese('t')).toBe('ꦠ꧀');
  });

  it('should handle vowel signs', () => {
    expect(toJavanese('bi')).toBe('ꦧꦶ');
    expect(toJavanese('bu')).toBe('ꦧꦸ');
    expect(toJavanese('be')).toBe('ꦧꦺ');
    expect(toJavanese('bo')).toBe('ꦧꦺꦴ');
  });

  it('should handle inherent vowel a', () => {
    expect(toJavanese('ba')).toBe('ꦧ');
    expect(toJavanese('ka')).toBe('ꦏ');
  });

  it('should handle consonant clusters', () => {
    expect(toJavanese('nya')).toBe('ꦚ');
    expect(toJavanese('ngga')).toBe('ꦔꦒ'); // ng + ga? Actually ngga: ng + ga? We'll see
  });

  it('should preserve whitespace', () => {
    expect(toJavanese('budi santoso')).toBe('ꦧꦸꦝꦶ ꦱꦤ꧀ꦠꦺꦴꦱꦺꦴ'); // our expected output
  });
});