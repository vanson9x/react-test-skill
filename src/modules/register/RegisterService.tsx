import axios from "axios";
import {URL_API} from "../../AppStore";

export default class RegisterService {
    // tslint:disable-next-line:variable-name
    public static register(_username: string, _password: string, _fullname: string, _email: string) {
        return axios.post(URL_API + '/register', {
            password: _password.trim(),
            username: _username.trim(),
            // tslint:disable-next-line:object-literal-sort-keys
            fullname: _fullname.trim(),
            email: _email.trim()
        })
    }
}
