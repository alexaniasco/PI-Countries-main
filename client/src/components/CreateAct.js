import React, { useEffect, useState } from "react";
import "./CreateAct.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const CreateAct = () => {
  // SETEO LAS OPCIONES DE PAISES ORDENADO --------------------------------
  useEffect(() => {
    fetch("http://localhost:3001/countries")
      .then((r) => r.json())
      .then((r) =>
        r.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
      )
      .then((r) => setCountries(r));
  }, []);
  //  TODOS LOS ESTADOS: LOCALES Y GLOBAL-----------------------------------
  const paises = useSelector((state) => state.Countries2);
  const [scountrie, setScountrie] = useState([]);
  const [countries, setCountries] = useState([]);
  const [inputt, setInput] = useState("");
  // SETEO LA ACTIVIDAD QUE VOY A ENVIAR A LA DATABASE -------------------
  const [activity, setActivity] = useState({
    Activity: "",
    Difficult: "",
    Time: "",
    Season: "",
    Countries: [],
  });
  const [error, setError] = useState({});

  const [db, setDb] = useState([]);



  // ME GUARDO EL TEXTO------------------------------------------------
  const handletext = (e) => {
    setError({});
    var regex = /^[a-zA-Z ]+$/;
    const valor = e.target.value;
    if(valor.length >20){return setError({error:"Máximo 20 caracteres"})}
    if (regex.test(valor) || valor.length == 0 || valor == " " ) {
      setActivity({ ...activity, [e.target.name]: e.target.value });
      return setInput(valor);
    }
    if (valor.length == 0) {
      setError({ error: "No se puede " });
    } else setError({ error: "No se puede ingresar simbolos y/o números" });
  };
   
  

  // SETEO LA DIFICULTAD-----------------------------------------
  const handleopt = (e) => {
    setError({});
    console.log(e.target.value);
    return setActivity({ ...activity, Difficult: e.target.value });
  };
  // INSERTO SEASON------------------------------------------------
  const handleseason = (e) => {
    setError({});
    console.log(e.target.value);
    return setActivity({ ...activity, Season: e.target.value });
  };
  // INSERTO TIEMPO---------------------------------------------------
  const handletime = (e) => {
    setError({});
    console.log(e.target.value);
    return setActivity({ ...activity, Time: e.target.value });
  };

  // INSERTO LOS PAISES---------------------------------------------

  const handlecountries = (e) => {
    setError({});
    const res = e.target.value;
    if (activity.Countries.includes(e.target.value)) {
      return setError({ error: "No se puede seleccionar el mismo pais" });
    } else if (activity.Countries.length > 4) {
      return setError({ error: "Maximo 5 paises" });
    }
    return (
      setScountrie([...scountrie, e.target.value]),
      setActivity({
        ...activity,
        Countries: [...activity.Countries, e.target.value],
      })
    );
  };

  // FUNCION QUE HACE CUANDO SUBMITEAS----------------------------------
  const submitear = (e) => {
    e.preventDefault();
    var regex = /^[a-zA-Z ]+$/;
    const valor = activity.Activity;
    console.log(valor);
    if (
      activity.Activity.length > 5 &&
      activity.Difficult &&
      activity.Season &&
      activity.Time &&
      activity.Countries.length < 6 &&
      activity.Countries.length !== 0 &&
      regex.test(valor)
    ) {
      return enviarFetch();
    } else
      return setError({
        error:
          "Los campos no pueden estar vacios o contener simbolos y/o numeros",
      });
  };

  const enviarFetch = async () => {
    setDb(activity);
    console.log(JSON.stringify(activity));
    fetch("http://localhost:3001/activity", {
      method: "POST",

      body: JSON.stringify(activity),
      headers: { "Content-Type": "application/json" },
    });

    return alert("Actividad creada con exito");
  };

  // ELIMINO LOS PAISES SELECCIONADOS
  const menoscountries = (elem) => {
    setError({});
    const arr = scountrie;

    const valor = elem.target.name;
    const filter = arr.slice(0, valor);
    console.log(filter);

    return setActivity({ ...activity, Countries: filter });
  };
  return (
    <div className="formularioss container-fluid">
     
      <div className={db.Activity ? "contenedor" : "contenedor2"}>
        <div className="cont_formulario container">
          <h1 className="form_h1">Formulario de creacion de actividad</h1>
          <form className="formulario" onSubmit={(e) => submitear(e)}>
            <div className="miform">
            <label>Actividad</label>
            <input
              name="Activity"
              value={inputt}
              className={
                activity.Activity.length < 6 ? "input_error" : "Activity form-control"
              }
              onChange={(e) => handletext(e)}
            ></input>

            <label>Dificultad</label>
            <select onChange={(e) => handleopt(e)}>
              <option selected disabled>
                Difficult
              </option>
              <option name="1" value="1">
                1
              </option>
              <option name="2" value="2">
                2
              </option>
              <option name="3" value="3">
                3
              </option>
              <option name="4" value="4">
                4
              </option>
              <option name="5" value="5">
                5
              </option>
            </select>
            <label>Duracion</label>
            <select onChange={(e) => handletime(e)}>
              <option selected disabled>
                Duración
              </option>
              <option name="1" value="1 Day">
                1 Day
              </option>
              <option name="2" value="12 Hours">
                12 Hours
              </option>
              <option name="3" value="6 Hours">
                6 Hours
              </option>
              <option name="4" value="1 Week">
                1 Week
              </option>
              <option name="5" value="1 Month">
                1 Month
              </option>
            </select>
            <label>Season</label>
            <select onChange={(e) => handleseason(e)}>
              <option selected disabled>
                Season
              </option>
              <option value="summer">Summer</option>
              <option value="spring">Spring</option>
              <option value="winter">Winter</option>
              <option value="autumn">Autumn</option>
            </select>
            <label>Pick Countries</label>
            <select onChange={(e) => handlecountries(e)}>
              <option disabled selected>
                Countries
              </option>
              {countries
                ? countries.map((e) => <option value={e.id}>{e.name}</option>)
                : paises.map((e) => <option value={e.name}>{e.name}</option>)}
            </select>
            {scountrie.length > 0 && (
              <div className="countrie_selected">
                {activity.Countries.map((e, index) => (
                  <button
                    className="buton_contr"
                    name={index}
                    onClick={(el) => menoscountries(el)}
                  >
                    {e} x
                  </button>
                ))}
              </div>
            )}

            {error && <h5 className="error_submit">{error.error}</h5>}
            <button className="submitear btn btn-primary">Crear</button>
            </div>
          </form>
        </div>
  
    {db.Activity && (
      <div className="activity">
        <h1 className="succes"> Actividad creada con Exito:</h1>
            <h1>{db.Activity}</h1>
            <h2>Difficultad: {db.Difficult}</h2>
            <h2>Tiempo: {db.Time}</h2>
            <h2>Season: {db.Season.toUpperCase()}</h2>
            <h2>Paises:</h2>
          
            <div className="ides">
              {db.Countries.map((e) => (
               <Link to={`/countries/${e}`}><button className="ides_btn">{e}</button></Link>
              ))}
            </div>
          </div>
        )}
 
      </div>
      <Link  to={"/Home"}>
        <button className="too submitear btn btn-primary">Home</button>
      </Link>
    </div>
  );
};
