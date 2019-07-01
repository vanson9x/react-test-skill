import {action, computed, observable} from "mobx";

interface IAccountValue {
    email: undefined | string;
    fullname: undefined | string;
    token: undefined | string;
    username: undefined | string;
}

export const URL_API = "http://207.148.100.47:3000";

class AppStore {
    @observable public account: IAccountValue = {
        email: undefined,
        fullname: undefined,
        token: undefined,
        username: undefined
    };

    @computed get isLogin() {
        return this.account.username && this.account.token;
    }

    @action.bound
    public logout() {
        this.account.fullname = this.account.email = this.account.token = undefined;
    }

    public setUsername = (username: string) => this.account.username = username;
    public setToken = (token: string) => this.account.token = token;
    public setFullName = (name: string) => this.account.fullname = name;
}

const appStore = new AppStore();
export default appStore;
