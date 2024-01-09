import { createContext, useState } from 'react';
import { unzip, getTextContentOfFile } from './utils';

export const ModInfoContext = createContext(null);

export function ModInfoProvider({ children }) {
  const [pathRoot, setPathRoot] = useState('');
  const [moduleFiles, setModuleFiles] = useState(null);
  const [modDescriptor, setModDescriptor] = useState(null);
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedModuleType, setSelectedModuleType] = useState('');
  const loadModFromZipFile = async (zipFile) => {
    const files = await unzip(zipFile);

    let pathRoot;
    let modJsonFilePath;
    const hasModJsonAtRoot = Object.keys(files.files).some((path) => {
      const isValidModJson =
        path.endsWith('/mod.json') &&
        path.includes('/') &&
        path.lastIndexOf('/') == path.indexOf('/');
      if (isValidModJson) {
        modJsonFilePath = path;
      }
      return isValidModJson;
    });

    if (hasModJsonAtRoot) {
      pathRoot = modJsonFilePath.substring(0, modJsonFilePath.indexOf('/'));
      setPathRoot(pathRoot);
      setModuleFiles(files);
      setSelectedModule('');
      setSelectedModuleType('');
    } else {
      console.error("No mod.json found in mod's root directory");
    }

    const textContent = await getTextContentOfFile(modJsonFilePath, files);
    const modDescriptor = JSON.parse(textContent);
    setModDescriptor(modDescriptor);
  };

  const getModuleDescriptor = async () => {
    if (!selectedModule) {
      return null;
    }
    const textContent = await getTextContentOfFile(
      `${pathRoot}/${selectedModule}/mod.json`,
      moduleFiles,
    );
    const moduleDescriptor = JSON.parse(textContent);
    return moduleDescriptor;
  };

  const value = {
    loadModFromZipFile,
    getModuleDescriptor,
    modDescriptor,
    pathRoot,
    selectedModule,
    setSelectedModule,
    selectedModuleType,
    setSelectedModuleType,
  };

  return <ModInfoContext.Provider value={value}>{children}</ModInfoContext.Provider>;
}
