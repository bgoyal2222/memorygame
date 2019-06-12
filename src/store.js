import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';




export default function configureStore() {
  // const persistConfig = {
  //   key: 'root',
  //   storage: storage,
  //   stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
  // };

  // const pReducer = persistReducer(persistConfig, rootReducer);
  return createStore(
    rootReducer,
    applyMiddleware(thunk)
  );
}
