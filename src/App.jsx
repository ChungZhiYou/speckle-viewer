import { useEffect, useRef, useState } from "react"
import "./App.css"
import {
  Viewer,
  DefaultViewerParams,
  SpeckleLoader,
  UrlHelper,
  CameraController,
  MeasurementsExtension,
  SelectionExtension,
  ViewerEvent,
  SectionTool,
  SectionOutlines
} from "@speckle/viewer"

import { Box3 } from 'three';
// import MeasurementsUI from "./MeasurementsUI.jsx";

const modelUrls =[
  "https://app.speckle.systems/projects/c832429e56/models/0e55cdcae5",
  "https://app.speckle.systems/projects/c832429e56/models/cde7c2555c",
  "https://app.speckle.systems/projects/c832429e56/models/963110c8c2",
  "https://app.speckle.systems/projects/c832429e56/models/53793399af"]

function App() {
  const viewerRef = useRef(null)
  const viewerInstance = useRef(null) // hold the Viewer object persistently
  const [selectedMetadata, setSelectedMetadata] = useState(null)
  const [sectionActive, setSectionActive] = useState(false)
  const sectionRef = useRef(null)
  // const [measurementActive, setMeasurementActive] = useState(false)
  // const [viewerReady, setViewerReady] = useState(false)


  useEffect(() => {
    let animationFrameId

    const initViewer = async () => {
      const container = viewerRef.current
      if (!container || viewerInstance.current) return // prevent double init

      const params = { ...DefaultViewerParams, verbose: true }
      const viewer = new Viewer(container, params)
      viewerInstance.current = viewer
      // setViewerReady(true)

      console.log("Loading viewer...");
      await viewer.init()
      console.log("Viewer initialized.");

      viewer.createExtension(CameraController)

      viewer.createExtension(SelectionExtension)

      const sections = viewer.createExtension(SectionTool);
      sectionRef.current = sections

      viewer.createExtension(SectionOutlines);

      // setting the section box position
      const box = new Box3().copy(viewer.getRenderer().sceneBox);
      box.min.x = 115
      box.max.x = 140
      box.min.y = 0
      box.max.y = 28
      box.min.z = -6
      box.max.z = 12
      sections.setBox(box);

      viewer.on(ViewerEvent.ObjectClicked, (event) => {
        
        if (event) {
          const obj = event.hits[0]?.node.model
          setSelectedMetadata({ id: obj.id, props: obj.raw })
        }
        else {
          setSelectedMetadata(null)
        }
      })
      
      for (const modelUrl of modelUrls) {
        const urls = await UrlHelper.getResourceUrls(modelUrl)
        console.log("Resolved URLs:", urls);
        for (const url of urls) {
          const loader = new SpeckleLoader(viewer.getWorldTree(), url, "")
          await viewer.loadObject(loader, true)
        }
      }
    }

    animationFrameId = requestAnimationFrame(() => {
      if (viewerRef.current) initViewer()
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (viewerInstance.current) {
        viewerInstance.current.dispose()
        viewerInstance.current = null
      }
    }
  }, [])

  // const toggleMeasurements = () => {
  //   let extension
  //   try {
  //     extension = viewerInstance.current.getExtension(MeasurementsExtension)
  //   } catch {
  //     extension = viewerInstance.current.createExtension(MeasurementsExtension)
  //   }
  //   extension.enabled = !measurementActive
  //   setMeasurementActive(!measurementActive)
  // }

  const renderMetadata = (metadata) => {
    if (!metadata) return null
    return (
      <div className="metadata-section">
      <h4 className="metadata-title">Object ID: {metadata.id}</h4>
      <table className="metadata-table">
        <tbody>
          <tr>
            <th>Application ID</th>
            <td>{metadata.props.applicationId}</td>
          </tr>
          {/* <tr>
            <th>Area</th>
            <td>{metadata.props.area} {metadata.props.units}</td>
          </tr>
          <tr>
            <th>Volume</th>
            <td>{metadata.props.volume} {metadata.props.units}</td>
          </tr> */}
          <tr>
            <th>Units</th>
            <td>{metadata.props.units}</td>
          </tr>
          {metadata.props.definition ? <tr>
            <th>Name</th>
            <td>{metadata.props.definition.name.match(/\*(.*?)\{/)[1]}</td>
          </tr> : ""}
        </tbody>
      </table>
    </div>
    )
  }

  return (
    <div className="container">
      <div ref={viewerRef} className="viewer" />
      {selectedMetadata && (
        <div className="metadata">
          <h2>Selected Object</h2>
          {renderMetadata(selectedMetadata)}
        </div>
      )}
      {/* {viewerReady && (
        <div className="panel-wrapper">
          <MeasurementsUI viewer={viewerInstance.current} />
        </div>
      )} */}

      <div className="sidebar">
        <div>
          <h3>Tools</h3>

          <button style={{ backgroundColor: sectionActive ? "#56AE57" : ""}}  
          onClick={() => {
            sectionRef.current.toggle()
            setSectionActive(!sectionActive)
          }}>Section Box</button>

          {/* <button style={{ backgroundColor: measurementActive ? "#56AE57" : ""}}  
          onClick={() => {
            setMeasurementActive(!measurementActive)
            toggleMeasurements()
          }}>Measurement Tools</button> */}
        </div>
      </div>
    </div>
  )
}

export default App