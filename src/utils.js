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

/**
 *
 * @param {string} path the path of the file to load relative to the zip object's root
 * @param {JSZip} zip
 * @returns a Blob representation of the file's contents
 */
export const getRawFileData = async (path, zip) => {
  return await zip.file(path).async('blob');
};

/**
 *
 * @param {Blob} blob
 * @returns a URL string representing the file
 */
export const getObjectUrl = (blob) => {
  return URL.createObjectURL(blob);
};

/**
 *
 * @param {Array} resources
 * @returns an object of each resource with an additional property 'count' representing the number of times the resource appears in the array
 */
export const getResourceWithCounts = (resources) => {
  return resources.reduce((acc, currResource) => {
    if (!acc[currResource.id]) {
      acc[currResource.id] = { ...currResource, count: 1 };
    } else {
      acc[currResource.id].count++;
    }
    return acc;
  }, {});
};
