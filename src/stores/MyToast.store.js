import {computed, observable, action} from "mobx";

class MyToastStore {
    @observable _show = false;
    @observable _delay = 0;
    @observable _message = "Nội dung thông báo";

    @computed get show() {
        return this._show;
    }

    @computed get delay() {
        return this._delay;
    }

    @computed get message() {
        return this._message;
    }

    push(message, delay = 5000) {
        this._message = message;
        this._delay = delay;
        this._show = true;
    }

    @action.bound
    pop() {
        this._show = false;
    }
}

const MyToast = new MyToastStore();
export default MyToast;
