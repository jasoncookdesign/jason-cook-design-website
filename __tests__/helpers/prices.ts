/** Anything that reads as a fee figure: $ 12,000, 12,000, 5,000 dollars, USD 12000, 2.5k, a bare USD. */
export const FEE_PATTERNS: RegExp[] = [
  /\$\s*\d/,
  /\b\d{1,3}(,\d{3})+\b/,
  /\d\s*(USD|dollars?)\b/i,
  /\b(USD|dollars?)\s*\d/i,
  /\d(k|K)\b/,
  /\bUSD\b/i,
];

export function hasFeeFigure(text: string): boolean {
  return FEE_PATTERNS.some((re) => re.test(text));
}
