export default class Validations {
    public static required() {
        return {
            isValid: (source: string) => source ? true : false,
            type: "required"
        }
    }

    public static minLength(num: number) {
        return {
            // tslint:disable-next-line:variable-name
            isValid: (source: string, _number: number = num) => source && source.length >= num ? true : false,
            type: 'minLength'
        }
    }

    public static maxLength = (num: number) => {
        return {
            // tslint:disable-next-line:variable-name
            isValid: (source: string, _number = num) => source && source.length <= _number ? true : false,
            type: 'maxLength'
        }
    };

    public static regexp = (pattern: RegExp | any) => {
        return {
            // tslint:disable-next-line:variable-name
            isValid: (source: string, _pattern = pattern) => {
                if (!source) {
                    return false;
                }
                const re = new RegExp(_pattern);
                return re.test(source);
            },
            type: 'regexp'
        }
    }
}
