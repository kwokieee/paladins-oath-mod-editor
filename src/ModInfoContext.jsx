import { createContext, useState } from 'react';
import { unzip, getTextContentOfFile, createObjectURL } from './utils';

export const ModInfoContext = createContext(null);

export function ModInfoProvider({ children }) {
  const [pathRoot, setPathRoot] = useState('');
  const [moduleFiles, setModuleFiles] = useState(null);
  const [modDescriptor, setModDescriptor] = useState(null);
  const [selectedModule, setSelectedModule] = useState('');
  const [selectedModuleType, setSelectedModuleType] = useState('');
  const [selectedModuleDescriptor, setSelectedModuleDescriptor] = useState(null);
  const [isSwitchingModule, setIsSwitchingModule] = useState(false);
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

  const getModuleDescriptor = async (name) => {
    if (!name) {
      return null;
    }
    const textContent = await getTextContentOfFile(`${pathRoot}/${name}/mod.json`, moduleFiles);
    const moduleDescriptor = JSON.parse(textContent);
    return moduleDescriptor;
  };

  const getUrlForFile = async (filePath) => {
    return await createObjectURL(filePath, moduleFiles);
  };

  const switchSelectedModuleTo = async (name, type) => {
    setIsSwitchingModule(true);
    const moduleDescriptor = await getModuleDescriptor(name);
    setSelectedModuleDescriptor(moduleDescriptor);
    setSelectedModule(name);
    setSelectedModuleType(type);
    setIsSwitchingModule(false);
  };

  const value = {
    loadModFromZipFile,
    getUrlForFile,
    switchSelectedModuleTo,
    modDescriptor,
    pathRoot,
    isSwitchingModule,
    selectedModule,
    setSelectedModule,
    selectedModuleType,
    setSelectedModuleType,
    selectedModuleDescriptor,
  };

  return <ModInfoContext.Provider value={value}>{children}</ModInfoContext.Provider>;
}
