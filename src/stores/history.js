import {observable, action, makeObservable} from "mobx";
import {Uploader} from "../models";
import {message} from "antd";


class HistoryStore {
    constructor() {
        makeObservable(this);
    }

    @observable list = [];
    @observable isLoading = false;
    @observable hasMore = true;
    @observable page = 0;
    limit = 10;

    @action append(newList) {
        this.list = this.list.concat(newList);
    }

    @action find() {
        Uploader.find({page: this.page, limit: this.limit})
            .then(newList => {
                this.isLoading = true;
                this.append(newList);
                this.page++;
                if (newList.length < this.limit) {
                    this.hasMore = false;
                }
            }).catch(error => {
            message.error("加载数据失败~");
        }).finally(() => {
            this.isLoading = false;
        });
    }

    @action reset() {
        this.list = [];
        this.isLoading = false;
        this.hasMore = true;
        this.page = 0;
    }

}

export default new HistoryStore();
