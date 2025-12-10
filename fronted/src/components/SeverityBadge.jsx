export default function SeverityBadge({ severity }) {
  const map = {
    NONE: { text: 'None', className: 'bg-green-100 text-green-700' },
    LIGHT: { text: 'Light', className: 'bg-yellow-100 text-yellow-800' },
    MEDIUM: { text: 'Medium', className: 'bg-orange-100 text-orange-800' },
    HEAVY: { text: 'Heavy', className: 'bg-red-100 text-red-700' },
  };
  const item = map[severity] || map.NONE;
  return <span className={`inline-block px-3 py-1 rounded-full text-xs ${item.className}`}>{item.text}</span>
}