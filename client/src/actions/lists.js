import { CREATE_LIST } from '../constants/actionTypes';
import * as api from '../api';

export const createList = (newList) => async (dispatch) => {
    try {
        const { data } = await api.createList(newList);
        dispatch({ type: CREATE_LIST, data });
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            console.log(error.response.data.message); // Print the error message to the console
          } else {
            console.log(error);
            console.log('An error occurred. Please try again.');
          } 
    }
};