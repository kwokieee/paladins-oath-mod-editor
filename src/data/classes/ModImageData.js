import { makeAutoObservable } from 'mobx';
import { getRawFileData, getObjectUrl } from '../../utils';

export class ModImageData {
  constructor() {
    this.fileName = null;
    this.rawData = null;
    makeAutoObservable(this);
  }

  static async Load(fileName, folder) {
    const data = new ModImageData();

    data.fileName = fileName;
    data.rawData = await getRawFileData(fileName, folder);

    return data;
  }

  isValid() {
    return !!this.fileName && !!this.rawData;
  }

  getObjectUrl() {
    return getObjectUrl(this.rawData);
  }
}
