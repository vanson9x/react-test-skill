import {computed, observable} from "mobx";

class RegisterStore {
    @observable public validated = false;

    @computed
    get getValidated() {
        return this.validated;
    }
}

const store = new RegisterStore();
export default store;
