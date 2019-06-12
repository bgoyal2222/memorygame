import APIGET from '../assets/api';

export const setTimer = (timer) => dispatch => {
  dispatch({
      type: "SET_TIMER",
      timer,
    });
};

export const createGrid = (val) => dispatch => {
  dispatch({
      type: "CREATE_GRID",
      val,
    });
};
  
export const flipCard = (index) => dispatch => {
  dispatch({
      type: "FLIP_GRID",
      index,
    });
};