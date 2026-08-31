/**
 * Historical note for unsupported letters in Javanese and Makassar scripts.
 */
export const LOANWORD_NOTE =
  "Huruf tersebut merupakan huruf serapan yang tidak termasuk dalam kumpulan huruf Aksara yang tersedia. Silakan gunakan huruf yang tersedia dalam Aksara untuk menulis teks kamu <3.";

/**
 * Returns the note for a given letter (same note for all unsupported letters).
 */
export function getLoanwordNote(letter: string): string {
  return LOANWORD_NOTE;
}
