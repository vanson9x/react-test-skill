import {computed, observable} from 'mobx';

class LoginStore {
    @observable public validated = false;
    @observable public redirect = false;

    @computed get getValidated() {
        return this.validated;
    }

    @computed get getRediretc() {
        return this.redirect;
    }
}

const store = new LoginStore();
export default store;
