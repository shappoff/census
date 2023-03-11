import {default as React} from 'react';

import firebase from "firebase";

const {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    telegramBotToken,
    telegramChatId
} = env;

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
};

import FindComponent from "./FindComponent";

const app = firebase.initializeApp(firebaseConfig);

const App = () => {
    const [isAuthed, setIsAuthed] = React.useState(false);

    const authWithGoogle = () => {

        var provider = new firebase.auth.GoogleAuthProvider();
        const auth = firebase.app().auth();
        auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                auth
                    .signInWithPopup(provider)
                    .then((result: any) => {
                        const {isNewUser} = result.additionalUserInfo;
                        if (isNewUser) {
                            //delete the created user
                            result.user.delete();
                            setIsAuthed(false);
                            console.info('There no access!');
                        } else {
                            // your sign in flow
                            // console.log('user ' + result.user.email + ' does exist!');
                            // console.log(result);
                            setIsAuthed(true);
                        }

                        if (telegramBotToken && telegramChatId) {
                            const {displayName, email, photoURL} = result.user;
                            const text = encodeURI(`CENSUS\n*${displayName}*\n[${email}](mailto:${email})\n[photoURL](${photoURL})`);
                            const parse_mode = 'Markdown';
                            const disable_web_page_preview = true;
                            fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&parse_mode=${parse_mode}&disable_web_page_preview=${disable_web_page_preview}&text=${text}`);
                        }
                    }).catch((error: any) => {
                    console.error(error);
                });

            });


    };

    return isAuthed ? <FindComponent /> : <button className="btn btn-primary type-table" onClick={authWithGoogle}>Google</button>
};

export default App;