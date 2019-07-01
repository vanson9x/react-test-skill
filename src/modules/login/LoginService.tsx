import axios from "axios";
import {URL_API} from "../../AppStore";

export default class LoginService {
    // tslint:disable-next-line:variable-name
    public static login(_username: string, _password: string, _remember: boolean) {
        return axios.post(URL_API + '/login', {
            password: _password.trim(),
            username: _username.trim(),
            // tslint:disable-next-line:object-literal-sort-keys
            remember: _remember
        })
    }
}
