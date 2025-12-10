import SeverityBadge from './SeverityBadge'

export default function ReportCard({ r }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex items-start gap-3">
        <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
          { r.photoUrl ? <img src={r.photoUrl} alt="photo" className="w-full h-full object-cover"/> : <div className="text-xs text-gray-400 p-2">No photo</div> }
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">No. {r.houseNumber}</h3>
            <SeverityBadge severity={r.severity} />
          </div>
          <p className="text-sm text-gray-600 mt-1">Water level: {r.waterLevel} cm · RW {r.rw || '-'}</p>
          <p className="text-sm text-gray-500 mt-2">{new Date(r.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
