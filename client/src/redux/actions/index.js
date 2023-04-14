import axios from "axios";



// Aca deben declarar las variables donde tengan el action types.
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIES_FIL = "GET_COUNTRIES_FIL";
export const GET_COUNTRIES_FIL2 = "GET_COUNTRIES_FIL2";
export const GET_COUNTRIES_DET = "GET_COUNTRIES_DET";
export const GET_COUNTRIES_FIL_POPU = "GET_COUNTRIES_FIL_POPU";
export const GET_COUNTRIES_FIL_POPU2 = "GET_COUNTRIES_FIL_POPU2";
export const GET_COUNTRIES_DET_RESET ="GET_COUNTRIES_DET_RESET"

export const getCountries = () => async (dispatch) => {
  const r = await axios.get('/countries');

  dispatch({ type: "GET_COUNTRIES", payload: r.data });
};

export const getCountriesDet = (id) => async (dispatch) => {
  if(!id){dispatch({ type: "GET_COUNTRIES_DET", payload: [] })}
  const r = await axios.get(`/countries/${id}`);

  dispatch({ type: "GET_COUNTRIES_DET", payload: r.data });
};

export const getCountriesReset = (e) => (dispatch) => {
  dispatch({ type: "GET_COUNTRIES_DET_RESET", payload: [] });
};

export const getCountriesFil = (e) => (dispatch) => {
  dispatch({ type: "GET_COUNTRIES_FIL", payload: e });
};

export const getCountriesFil2 = (e) => (dispatch) => {
  const jsonfilter = e.sort((a, b) => {
    if (a.name > b.name) {
      return -1;
    }
    if (a.name < b.name) {
      return 1;
    }
    return 0;
  });
  dispatch({ type: "GET_COUNTRIES_FIL2", payload: jsonfilter });
};

export const getCountriesFilPopu = (e) => (dispatch) => {
  const jsonfilter = e.sort((a, b) => {
    if (a.population > b.population) {
      return -1;
    }
    if (a.population < b.population) {
      return 1;
    }
    return 0;
  });
  dispatch({ type: "GET_COUNTRIES_FIL_POPU", payload: jsonfilter });
};

export const getCountriesFilPopu2 = (e) => (dispatch) => {
  const jsonfilter = e.sort((a, b) => {
    if (a.population < b.population) {
      return -1;
    }
    if (a.population > b.population) {
      return 1;
    }
    return 0;
  });
  dispatch({ type: "GET_COUNTRIES_FIL_POPU2", payload: jsonfilter });
};
