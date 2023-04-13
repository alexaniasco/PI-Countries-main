import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as actions from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "./CountrieDet.css";

export const CountrieDet = () => {
  const { id } = useParams();
  const [loader, setLoader] = useState("Cargando...");
  const dispatch = useDispatch();

  React.useEffect(() => {
    setLoader("cargando");
    if (id == undefined) {
      return;
    }
    dispatch(actions.getCountriesDet(id));
    setLoader(false);
  }, [dispatch, id]);

  const detalles = useSelector((state) => state.CountriesDetail);
// asdasdasdasdasdasd
  return (
    <div>
         <Link to={"/home"}>
        <button className="btn_home submitear btn btn-primary" onClick={() => dispatch(actions.getCountriesReset())}>
          HOME
        </button>
      </Link>
    <div className="cont container">
   

      {detalles.length > 0 ? (
        detalles.map((e) => (
          <div className="Detalles" key={e.name}>
            <div>
              {" "}
              <img className="image" src={e.image}></img>
            </div>
            <div className="text">
              <h1 className="titulo_front">{e.name}</h1>
              <h2>Continent: {e.continents}</h2>
              <h2>Capital: {e.capital}</h2>
              <h3>Sub-region: {e.subregion}</h3>
              <h3>Population: {e.population} P</h3>
              <h3>Area: {e.area} km</h3>
              <h4>{e.id}</h4>
            </div>
          </div>
        ))
      ) : (
        <h1>Cargando...</h1>
      )}
      <div className="ACTIVIDADES">
        {detalles.length > 0 ? (
          <div className="actt">
            {" "}
            {detalles[0].activities.map((e) => (
              <div className="act">
                <h2 className="titulo">{e.name}</h2>
                <h3 className="act_text">Dificult: {e.dificult}</h3>
                <h3 className="act_text">Duration: {e.duration}</h3>
                <h3 className="act_text">Season: {e.station}</h3>
                <div className="countriess">
                  <h4>Countries:</h4>
                  <div className="flex_c">
                    {e.countriess &&
                      e.countriess.map((e) => (
                        <Link to={`/countries/${e}`} className="countri_link"> {e} </Link>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          console.log("no funcaaa")
        )}
      </div>
    </div>
    </div>
  );
};
