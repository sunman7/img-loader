import {observable, action, makeObservable} from "mobx";
import {Auth, Uploader} from "../models";
import {message} from "antd";


class ImageStore {
    constructor() {
        makeObservable(this);
    }

    @observable filename = "";
    @observable isUploading = false;
    @observable file = null;
    //服务器存储的文件 展示的
    @observable serverFile = null;

    @action setFilename(filename) {
        this.filename = filename;
    }

    @action setFile(file) {
        this.file = file;
    }

    @action upload() {
        this.isUploading = true;
        this.serverFile = null;
        return new Promise((resolve, reject) => {
            Uploader.add(this.file, this.filename).then(
                serverFile => {
                    this.serverFile = serverFile;
                    this.isUploading = false;
                    resolve(serverFile);
                }).catch(err => {
                message.error("上传失败！");
                reject(err);
            }).finally(() => {
                this.isUploading = false;
            });
        });
    }

    @action reset() {
        this.isUploading = false;
        this.serverFile = null;
    }

}

export default new ImageStore();