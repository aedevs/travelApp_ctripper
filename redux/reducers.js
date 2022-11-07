import {
    GET_faveS,
    ADD_TO_faveMARK_LIST,
    REMOVE_FROM_faveMARK_LIST
  } from './actions';
  
  const initialState = {
    zzzz: [],
    favemarks: []
  };
  
  function favesReducer(state = initialState, action) {
    switch (action.type) {
     
      case ADD_TO_faveMARK_LIST:
        return { ...state, favemarks: [...state.favemarks, action.payload] };
        
      case REMOVE_FROM_faveMARK_LIST:
        return {
          ...state,
          favemarks: state.favemarks.filter(spot => spot.name !== action.payload)
        };
      default:
        return state;
    }
  }
  
  export default favesReducer;