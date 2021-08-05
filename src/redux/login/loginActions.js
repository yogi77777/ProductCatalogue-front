import {
    UPDATE_EMAIL_TOKEN_STATE
} from './loginTypes';


export const updateEmailTokenState = (email,token) => {
    return ({
        type: UPDATE_EMAIL_TOKEN_STATE,
        payload: {
            email,
            token
        },
    });
}



