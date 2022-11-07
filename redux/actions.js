import axios from 'axios';

import { BASE_URL } from '../config';

import database from '@react-native-firebase/database';
import * as firebase from '@react-native-firebase/database';



// Define action types

export const ADD_TO_faveMARK_LIST = 'ADD_TO_faveMARK_LIST';
export const REMOVE_FROM_faveMARK_LIST = 'REMOVE_FROM_faveMARK_LIST';





export const addfavemark = spot => dispatch => {
  dispatch({
    type: ADD_TO_faveMARK_LIST,
    payload: spot
  });
};

export const removefavemark = spot => dispatch => {
  dispatch({
    type: REMOVE_FROM_faveMARK_LIST,
    payload: spot
  });
};


