import {
    UPDATE_EMAIL_TOKEN_STATE
} from './loginTypes';

const initialState = {
    email: '',
    token: ''
}

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_EMAIL_TOKEN_STATE: {
            const { email } = action.payload;
            const { token } = action.payload;
            return {
                ...state,
                email: email,
                token:token
            }
        }
      
        default: return { ...state };
    }
}

export default loginReducer;