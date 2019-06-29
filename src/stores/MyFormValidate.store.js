import {computed, observable} from "mobx";
import React from "react";

class _Validations {
    static required() {
        return {
            type: "required",
            isValid: (source) => source ? true : false
        }
    }

    static minLength(number) {
        return {
            type: 'minLength',
            isValid: (source, _number = number) => source && source.length >= _number ? true : false
        }
    }

    static maxLength = (number) => {
        return {
            type: 'maxLength',
            isValid: (source, _number = number) => source && source.length <= _number ? true : false
        }
    };
}

export const Validations = _Validations;

export default class MyFormControlValidateStore {
    @observable inValid = false;
    @observable errorFlag = {
        required: false,
        minLength: false,
        maxLength: false,
    };

    constructor(array_validate) {
        this.ref = new React.createRef();
        this.validates = array_validate;
    }

    @computed get error() {
        return this.errorFlag;
    }

    @computed get isInValid() {
        return this.inValid;
    }

    checkValidate = () => {
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
