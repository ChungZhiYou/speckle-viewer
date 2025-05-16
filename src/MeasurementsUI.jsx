import React, { useState } from "react"
import {
  MeasurementType,
  Units,
  MeasurementsExtension
} from "@speckle/viewer"
import "./MeasurementsUI.css"

export default function MeasurementsUI({ viewer }) {
  const [enabled, setEnabled] = useState(true)
  const [visible, setVisible] = useState(true)
  const [type, setType] = useState(MeasurementType.POINTTOPOINT)
  const [vertexSnap, setVertexSnap] = useState(true)
  const [units, setUnits] = useState("m")
  const [precision, setPrecision] = useState(2)

  const extension = viewer.getExtension(MeasurementsExtension)

  const updateExtension = () => {
    extension.enabled = enabled
    extension.options = {
      type,
      vertexSnap,
      units,
      precision,
      visible,
      enabled,
    }
  }

  const deleteLast = () => {
    extension.removeMeasurement()
  }

  const deleteAll = () => {
    extension.clearMeasurements()
  }

  return (
    <div className="measurement-panel">
      <h3>Measurements</h3>

      <label>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => {
            setEnabled(e.target.checked)
            updateExtension()
          }}
        />
        Enabled
      </label>

      <label>
        <input
          type="checkbox"
          checked={visible}
          onChange={(e) => {
            setVisible(e.target.checked)
            updateExtension()
          }}
        />
        Visible
      </label>

      <label>
        Type:
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value)
            updateExtension()
          }}
        >
          <option value={MeasurementType.POINTTOPOINT}>Point to Point</option>
          <option value={MeasurementType.PERPENDICULAR}>Perpendicular</option>
        </select>
      </label>

      <label>
        <input
          type="checkbox"
          checked={vertexSnap}
          onChange={(e) => {
            setVertexSnap(e.target.checked)
            updateExtension()
          }}
        />
        Snap to Vertex
      </label>

      <label>
        Units:
        <select
          value={units}
          onChange={(e) => {
            setUnits(e.target.value)
            updateExtension()
          }}
        >
          {Object.entries(Units).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
      </label>

      <label>
        Precision:
        <input
          type="number"
          min={1}
          max={5}
          value={precision}
          onChange={(e) => {
            setPrecision(parseInt(e.target.value, 10))
            updateExtension()
          }}
        />
      </label>

      <button onClick={deleteLast}>Delete</button>
      <button onClick={deleteAll}>Delete All</button>
    </div>
  )
}
