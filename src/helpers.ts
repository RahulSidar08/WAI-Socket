export async function summarize(text: string): Promise<string> {
  // simple summarizer (can improve later)
  return `Summary: ${text.slice(0, 60)}...`;
}

export async function translate(text: string, targetLang: string): Promise<string> {
  // Dummy translator (replace with real logic if needed)
  return `Translated (${targetLang}): ${text}`;
}
