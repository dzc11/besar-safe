import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.heat'

function getColor(sev) {
  switch(sev) {
    case 'HEAVY': return '#b91c1c'
    case 'MEDIUM': return '#f97316'
    case 'LIGHT': return '#f59e0b'
    default: return '#10b981'
  }
}

export default function MapView({ reports = [], center = [-6.200000, 106.816666], zoom = 14 }) {
  // create heat layer when component mounts
  const heatPoints = reports.map(r => [r.latitude, r.longitude, Math.min(1, r.waterLevel/120)]);
  return (
    <div className="h-[70vh] w-full rounded-xl overflow-hidden shadow-sm bg-white">
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {reports.map(r => (
          <CircleMarker
            key={r.id}
            center={[r.latitude, r.longitude]}
            radius={8}
            pathOptions={{ color: getColor(r.severity), fillOpacity: 0.8 }}
          >
            <Popup>
              <div className="w-56">
                <strong>No. {r.houseNumber}</strong>
                <div>Severity: {r.severity}</div>
                <div>Water level: {r.waterLevel} cm</div>
                <div>RW: {r.rw ?? '-'}</div>
                {r.photoUrl && <img src={r.photoUrl} alt="photo" className="mt-2 w-full h-24 object-cover rounded" />}
              </div>
            </Popup>
          </CircleMarker>
        ))}
        <HeatLayer points={heatPoints} />
      </MapContainer>
    </div>
  )
}

/* HeatLayer component (wrap leaflet.heat) */
function HeatLayer({ points }) {
  const map = useMap();
  useMapEffect(map, points);
  return null;
}

function useMapEffect(map, points) {
  // add or update heat layer
  useEffectOnce(() => {
    if (!map || !window.L || !window.L.heatLayer) return;
    const heat = window.L.heatLayer(points, { radius: 25, blur: 15 });
    heat.addTo(map);
    return () => {
      map.removeLayer(heat);
    }
  }, [map, JSON.stringify(points)]);
}

/* small helper: effect only once */
import { useEffect } from 'react'
function useEffectOnce(fn, deps) {
  useEffect(fn, deps);
}
