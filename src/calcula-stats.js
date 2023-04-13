export default function calculaStats (links) {
    const total = links.length;
    const unique = new Set(links.map(link => link.href)).size
    const broken = links.filter(link => (link.ok && link.ok !== 'ok')).length 

    const stats = {
        total: total,
        unique: unique,
    }

    if (broken > 0) {
        stats.broken = broken
    }

    return stats;
}