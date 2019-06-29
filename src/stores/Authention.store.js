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
        this.token = "";
    }

    // login(username) {
    //     this.username = this.token = "hehe";
    //     this.fullname = this.token = "Phạm Văn Sơn";
    // }
}

const store = new AuthentionStore();
export default store;

