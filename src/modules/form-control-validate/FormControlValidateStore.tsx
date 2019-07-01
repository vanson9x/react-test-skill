import {action, computed, observable} from "mobx";
import * as React from "react";

export default class FormControlValidateStore {
    // @ts-ignore
    // tslint:disable-next-line:variable-name
    @observable public _ref = new React.createRef();
    public validates: Array<{ type: string, isValid: any }>;
    @observable public inValid = false;
    @observable public errorFlag = {
        maxLength: false,
        minLength: false,
        regexp: false,
        required: false
    };

    constructor(arrayValidate: Array<{ type: string, isValid: any }>) {
        this.validates = arrayValidate;
    }

    @computed get ref() {
        return this._ref;
    }

    @computed get error() {
        return this.errorFlag;
    }

    @computed get isInValid() {
        return this.inValid;
    }

    @action.bound
    public reCheckValidate() {
        this.checkValidate();
    }

    public checkValidate = () => {
        const el = this.ref.current;
        this.inValid = false;
        this.validates.map(validate => {
            this.errorFlag[validate.type] = false;
            if (!this.inValid) {
                const temp = !validate.isValid(el.value);
                this.errorFlag[validate.type] = temp;
                this.inValid = temp;
                el.setCustomValidity(temp ? '.' : '');
                if (temp) {
                    this.inValid = true;
                }
            }
        });
        return !this.inValid;
    }
}
