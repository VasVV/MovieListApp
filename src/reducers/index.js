import { combineReducers } from "redux";
import UpdateSearch from './updatesearch';
import AddRemoveFavs from './addremovefavs';
import CurrMovie from './currmovie'

const rootReducer = combineReducers({
    UpdateSearch,
    AddRemoveFavs,
    CurrMovie
  });

  export default rootReducer;