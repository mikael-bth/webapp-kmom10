import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/user';
import AuthFields from './Authfields';
import { showMessage } from "react-native-flash-message";


export default function Login({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);
            if (typeof result.detail !== 'undefined') {
                showMessage({
                    message: result.title,
                    description: result.detail,
                    type: "warning",
                });
            }else {
                showMessage({
                    message: "Logged in",
                    description: result.message,
                    type: result.type,
                });
                setIsLoggedIn(true);
            }   
        } else {
            showMessage({
                message: "Missing fields",
                description: "E-mail or password is missing",
                type: "warning",
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doLogin}
            title="Logga in"
            navigation={navigation}
        />
    );
};