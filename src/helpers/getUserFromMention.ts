export default function getUserFromMention(input: string) {
  const regex = /<@(\d+)>/g;
  const matches = [];
  let match;

  while ((match = regex.exec(input)) !== null) {
    matches.push(match[1]);
  }

  return matches;
}
