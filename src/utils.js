import JSZip from 'jszip';

/**
 *
 * @param {File} zipFile the zip file to unzip
 * @returns the JSZip object, which contains the files in the zipped file
 */
export const unzip = async (zipFile) => {
  const zip = new JSZip();
  const files = await zip.loadAsync(zipFile);
  return files;
};

/**
 *
 * @param {string} path the absolute path of the file, with the root being the root of the zip folder
 * @param {JSZIP} zip the JSZip object containing all the files in the zipped file
 * @returns a string of text representing the contents in the file specified in the path
 */
export const getTextContentOfFile = async (path, zip) => {
  return await zip.file(path).async('text');
};

export const createObjectURL = async (path, zip) => {
  let content = await zip.file(path).async('arraybuffer');
  let buffer = new Uint8Array(content);
  let blob = new Blob([buffer.buffer]);
  return URL.createObjectURL(blob);
};
