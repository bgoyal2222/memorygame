
import _ from 'lodash';

const initialState = {
  grid: [],
  timer: 120,
  flipCount: 0,
  timer: 120,
  duration: 120,
  row: 3,
  column: 2,
  lastFlipped: 0,
  score: 0,
  level: 1,
  winCount: 0,
};
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
export default function gameReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case "SET_TIMER":
      let timer = action.timer;
      return {
        ...state,
        timer,
      };
    case "CREATE_GRID":
      let { val } = action;
      let grid = [];
      for (let i = 0; i < val / 2; i++) {
        grid.push({
          val: i + 1,
          isFlipped: false,
          show: true
        });
        grid.push({
          val: i + 1,
          isFlipped: false,
          show: true
        });
      }
      shuffleArray(grid);
      return {
        ...state,
        grid,
      };
    case "FLIP_GRID":
      let index = action.index;
      let grid1 = state.grid;
      if (state.lastFlipped === grid1[index].val) {
        for (let i = 0; i < grid1.length; i++) {
          if (grid1[i].val === state.lastFlipped) {
            grid1[i].show = false;
            grid1[i].isFlipped = false;
          }
        }
        state.winCount = state.winCount + 1;
        state.score = state.score + 10;
        state.flipCount = 0;
        state.lastFlipped = 0;
        if (state.winCount === grid1.length / 2) {
          state.winCount = 0;
          state.timer = 120;
          state.level = state.level + 1;
          state.column = state.column + 1;
          state.row = state.row + 1;
          val = state.row * state.column;
          grid1 = [];
          for (let i = 0; i < val / 2; i++) {
            grid1.push({
              val: i + 1,
              isFlipped: false,
              show: true
            });
            grid1.push({
              val: i + 1,
              isFlipped: false,
              show: true
            });
          }
          shuffleArray(grid1);
        }
      }
      else {
        if (state.flipCount == 1) {
          for (let i = 0; i < grid1.length; i++) {
            grid1[i].isFlipped = false;
          }
          state.flipCount = 0;
          state.lastFlipped = 0;
        }
        else {
          state.flipCount = 1;
          grid1[index].isFlipped = true;
          state.lastFlipped = grid1[index].val;
        }
      }
      return {
        ...state,
        grid: grid1
      };
    default:
      return state;
  }
}
