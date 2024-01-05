import './App.css'
import { useRef } from "react";
import JSZip from 'jszip';

function App() {
  const fileInput = useRef();
  const onButtonClick = () => {
    fileInput.current.click();
  };
  const handleFileSelected = async () => {
    const zipFile = fileInput.current.files[0]; // File object
    console.log(zipFile);
    const files = await JSZip.loadAsync(zipFile);
    let modJsonFilePath;
    const hasModJsonAtRoot = Object.keys(files.files).some(path => {
      const isValidModJson = path.endsWith('/mod.json') && path.includes("/") && path.lastIndexOf("/") == path.indexOf("/");
      if (isValidModJson) {
        modJsonFilePath = path;
      }
      return isValidModJson;
    });

    if (hasModJsonAtRoot) {
      console.log('has mod.json at root');
      console.log(modJsonFilePath);
    } else {
      console.error('No mod.json found in mod\'s root directory');
    }

    // console.log(files.files["com.firebiscuit.wolfhide/mod.json"]);
    const textContent = await files.files[modJsonFilePath].async('text');
    const modDescriptor = JSON.parse(textContent);
    console.log(modDescriptor);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vh', height: '100%' }}>
      {/* Editor */}
      <div style={{ display: 'flex', flex: 8}}>
        <p>Editor</p>
      </div>
      <div style={{ display: 'flex', flex: 2 }}>
        <input type='file' id='file' ref={fileInput} style={{display: 'none'}} onChange={handleFileSelected} accept='.zip'/>
        <button onClick={onButtonClick}>
          Open
        </button>
        <button>
          Save
        </button>
      </div>
    </div>
  )
}

export default App
