import { combineReducers } from "redux";
import UpdateSearch from './updatesearch';
import AddRemoveFavs from './addremovefavs';

const rootReducer = combineReducers({
    UpdateSearch,
    AddRemoveFavs
  });

  export default rootReducer;