import {computed, observable, action} from "mobx";

class AuthentionStore {
    @observable username = "";
    @observable email = "";
    @observable fullname = "";
    @observable token = "";

    @computed get isLogin() {
        return this.username && this.token;
    }

    @action.bound
    logout() {
        this.token = this.fullname = this.email = "";
    }

    setUsername = (username) => this.username = username;
    setToken = (token) => this.token = token;
    setFullName = (name) => this.fullname = name;
}

const store = new AuthentionStore();
export default store;

