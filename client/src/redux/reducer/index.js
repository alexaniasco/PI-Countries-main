// Importa las action types acá
import {
  GET_COUNTRIES,
  GET_COUNTRIES_DET,
  GET_COUNTRIES_DET_RESET,
  GET_COUNTRIES_FIL,
  GET_COUNTRIES_FIL2,
  GET_COUNTRIES_FIL_POPU,
  GET_COUNTRIES_FIL_POPU2
  

} from "../actions/index";
const initialState = {
  Countries: [],
  Countries2: [],
  CountriesDetail: [],
  
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_COUNTRIES:
      return { ...state,Countries: payload , Countries2: payload};
    case GET_COUNTRIES_DET:
      return { ...state, CountriesDetail: payload};
      case GET_COUNTRIES_DET_RESET:
      return { ...state, CountriesDetail: payload};
      case GET_COUNTRIES_FIL:
        return {...state, Countries: payload };
        case GET_COUNTRIES_FIL2:
          return {...state,Countries: payload };
          case GET_COUNTRIES_FIL_POPU:
            return {...state, Countries: payload };
            case GET_COUNTRIES_FIL_POPU2:
              return {...state,Countries: payload };
    default:
      return initialState;
    // Acá va tu código:
  }
};

export default rootReducer;
