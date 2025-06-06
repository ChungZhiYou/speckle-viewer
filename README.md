# Speckle Viewer Clone with Section Tool + Metadata Viewer

This project replicates and extends the functionality of the [Speckle Viewer](https://speckle.systems), integrating model loading, object metadata extraction, and an interactive Section Box tool via a custom React-based UI.

---

## 🚀 Live Demo

> 🔗 https://speckle-viewer-two.vercel.app/

---

## ✅ Features

- Load multiple Speckle models from public stream/model URLs
- Click objects in the 3D scene to display metadata (application ID, units, and parsed name)
- Interactive Section Box toggle with visual feedback (green button highlight)
- Side panel for tool controls and metadata display
- Optimized for performance and clarity using Vite + React

---

## 💡 Design Approach & Highlights

### 1. **Viewer Setup**
- Viewer is initialized with `CameraController`, `SelectionExtension`, and `SectionTool` extensions
- Section box is positioned programmatically using `Box3` from Three.js to bound a specific region of the model

### 2. **Model Loading**
- Four Speckle models are loaded via `UrlHelper.getResourceUrls`
- Each model is merged into the scene using `SpeckleLoader`

### 3. **Metadata Extraction**
- On `ViewerEvent.ObjectClicked`, metadata is extracted from the clicked object's `.raw` data
- If available, a name is parsed from the `definition.name` string using regex: `*Name{UUID}` → extracts `Name`

### 4. **Sidebar UI**
- Tools are displayed vertically in a right-fixed sidebar
- Active buttons (like Section Box) are highlighted using `backgroundColor: #56AE57`
- Sidebar is separated from metadata to improve usability

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 16 or higher

### 1. Clone the Repo
```bash
git clone https://github.com/ChungZhiYou/speckle-viewer-clone.git
cd speckle-viewer-clone
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🌍 Deployment

### ✅ Deploy to Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Set build settings:
   - Framework: **Vite**
   - Build Command: `vite build`
   - Output Directory: `dist`
4. Deploy and share the live URL 🎉

---

## 📌 Assumptions & Limitations

- Uses public Speckle stream/model URLs — no auth/token handling implemented
- Only object-level metadata is shown; full property tree is not explored
- Measurement UI exists in the codebase but is currently commented out due to rendering edge cases in some viewer versions
- Visibility toggling and more advanced scene interaction (e.g., multi-model management) not yet implemented

---

## 📂 Project Structure
```
├── public/
├── src/
│   ├── App.jsx               # Main app with viewer + section box + metadata
│   ├── App.css              # Styling for viewer, sidebar, metadata panel
│   └── (MeasurementsUI.jsx) # Optional measurement UI (commented out)
├── vite.config.js
└── README.md
```

---

## 📃 License
MIT

---

## ✨ Credits
Built with React, Vite, and [Speckle Viewer](https://github.com/specklesystems/speckle-server/tree/main/packages/viewer).

Special thanks to the Speckle open-source community.
