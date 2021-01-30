import {observable, action, makeObservable} from "mobx";
import Auth from "../models";


class AuthStore {
    constructor() {
        makeObservable(this);
    }

    @observable currentUser = null;

    @action setUser() {
        this.currentUser = Auth.getCurrentUser();
    }


}

export {AuthStore};