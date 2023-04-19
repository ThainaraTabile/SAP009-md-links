export default function calculaStats(links) {
  const total = links.length;
  const unique = new Set(links.map((link) => link.href)).size;
  const broken = links.filter((link) => (link.ok === false)).length;

  const stats = {
    total,
    unique,
  };

  if (broken > 0) {
    stats.broken = broken;
  }

  return stats;
}
