import {observable, action, makeObservable} from "mobx";
import {Auth, Uploader} from "../models";


class ImageStore {
    constructor() {
        makeObservable(this);
    }

    @observable filename = "";
    @observable isUploading = false;
    @observable file = null;
    //服务器存储的文件
    @observable serverFile = null;

    @action setFilename(filename) {
        this.filename = filename;
    }

    @action setFile(file) {
        this.file = file;
    }

    @action upload() {
        this.isUploading = true;
        return new Promise((resolve, reject) => {
            Uploader.add(this.file, this.filename).then(
                serverFile => {
                    this.serverFile = serverFile;
                    this.isUploading = false;
                    resolve(serverFile);
                }).catch(err => {
                reject(err);
            }).finally(() => {
                this.isUploading = false;
            });
        });
    }

}

export default new ImageStore();