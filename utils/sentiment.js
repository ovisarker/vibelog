export function analyzeMood(note) {
  if (!note) return 0;
  const positive = ["good", "great", "happy", "fun", "amazing", "love"];
  const negative = ["bad", "sad", "tired", "angry", "bored", "stress"];

  let score = 0;
  const text = note.toLowerCase();
  positive.forEach((w) => {
    if (text.includes(w)) score += 1;
  });
  negative.forEach((w) => {
    if (text.includes(w)) score -= 1;
  });

  return Math.max(-1, Math.min(1, score / 3));
}
