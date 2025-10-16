/**
 * Utility functions for text formatting
 */

/**
 * Converts newline characters (\n) to an array of text segments
 * @param text - Text containing newline characters
 * @returns Array of text segments
 */
export function formatTextWithLineBreaks(text: string): string[] {
  if (!text) return [text]
  
  return text.split('\n')
}

/**
 * Converts newline characters (\n) to HTML line breaks
 * @param text - Text containing newline characters
 * @returns HTML string with <br> tags
 */
export function formatTextWithHtmlBreaks(text: string): string {
  if (!text) return text
  
  return text.replace(/\n/g, '<br>')
}
