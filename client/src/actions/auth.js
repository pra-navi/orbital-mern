import { AUTH, FETCH_USER, START_LOADING, END_LOADING, SAVE_POST } from '../constants/actionTypes';
import * as api from '../api';

export const savePost = (postId) => async (dispatch) => {
    try {
        const { data } = await api.savePost(postId); //now data changed to learning list
        dispatch({ type: SAVE_POST, data });
    } catch (error) {
        console.log(error.message);
    }
};

export const getUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchUser(id);
        
        dispatch({ type: FETCH_USER, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
};

export const login = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.logIn(formData);

        dispatch({ type: AUTH, data });

        history.push('/');
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        history.push('/');
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}