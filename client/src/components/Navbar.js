import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";
import * as actions from "../redux/actions";

export const Navbar = () => {
  useEffect(() => {
    fetch("http://localhost:3001/tabla")
      .then((r) => r.json())
      .then((r) => r.map((e) => e.name))
      .then((r) => setAct(r));
  }, []);

  const dispatch = useDispatch();
  const [act, setAct] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState({
    error: "",
  });

  const func = (e) => {
    if (e.target.value === "1") {
      const estado = countries.map((e) => e);
      const jsonfilter = estado.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      return dispatch(actions.getCountriesFil([...jsonfilter]));
    }
    if (e.target.value === "2") {
      const estado = countries.map((e) => e);
      const jsonfilter = estado.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      });
      return dispatch(actions.getCountriesFil([...jsonfilter]));
    }
    if (e.target.value === "3") {
      const estado = countries.map((e) => e);
      return dispatch(actions.getCountriesFilPopu([...estado]));
    }
    if (e.target.value === "4") {
      const estado = countries.map((e) => e);
      return dispatch(actions.getCountriesFilPopu2([...estado]));
    }
    return console.log(e);
  };

  const functionfil = (json, prop) => {
    const todos = []
    const result = json.map(function(e){
      
      if(e.continents == prop){
      todos.push(e)
      }
      
    })
    if(todos.length == 0){return}
    dispatch(actions.getNumberPage(1))
    return dispatch(actions.getCountriesFil([...todos]));
  };

  const functionfilter = (e) => {
    dispatch(actions.getNumberPage(1))
    const res = [];
    const valor = e.target.value;
    const map = countries3.map(function (e, index) {
      if (e.activities.length > 0) {
        res.push(e);
      } else return "asdasd1";
    });

    const arr = [];
    const total = res.map(function (e) {
      for (let i = 0; i < e.activities.length; i++) {
        const act = e.activities[i];
        if (act.name == valor) {
          return e;
        }
      }
    });

    const ultimun = total.filter((e) => e !== undefined);
    return dispatch(actions.getCountriesFil(ultimun));
  };

  const inputsave = (e) => {
    setError({});
    var regex = /^[a-zA-Z ]+$/;
    const valor = e.target.value.toLowerCase();
    if (valor.length > 30) {
      return setError({ error: "Máximo 30 caracteres" });
    }
    if (regex.test(valor) || valor.length == 0 || valor == " ") {
      return setInput(valor);
    }
    if (valor.length == 0) {
      setError({ error: "No se puede " });
    } else setError({ error: "No se puede ingresar simbolos y/o números" });
  };

  // BUSCADOR DE PAISES
  const buscar = (e) => {
    e.preventDefault();

    const mapeado = countries3.filter((e) => e.name == input);
    console.log(mapeado);
    if (mapeado.length == 1) {
      setError({});
      dispatch(actions.getNumberPage(1))
      return dispatch(actions.getCountriesFil(mapeado));
    }
    if (input.length === 0) {
      return setError({ error: "Tiene que ingresar texto" });
    } else if (mapeado.length < 1) {
      setError({ error: `No existe ${input} en la base de datos` });
    }
    return console.log("");
  };

  // BOTON PARA RESETEAR TODO COMO ESTABA AL INICIO
  const reset = () => {
    dispatch(actions.getNumberPage(1))
    return dispatch(actions.getCountriesFil([...countries3]));
  };

  const countries = useSelector((state) => state.Countries);
  const countries3 = useSelector((state) => state.Countries2);
  const countries2 = useSelector((state) => state.Countries.sort());

  return (
    <div className="navbar">
      <div className="navbar_form">
        <form className="navbar_form_group">
          <input
            value={input}
            onChange={(e) => inputsave(e)}
            className="search_input"
            placeholder="Search Countries"
          ></input>
          <button onClick={buscar} className="search_input">
            Buscar
          </button>
        </form>
        {error && <h2 className="error_search">{error.error}</h2>}
        

        <h2
         className="cfound"
       
          
        >Countries found: {countries.length}</h2>
      </div>
      <div className="navbar_butons">
        <Link to={"/CreateAct"}>
          <button className="buton">Create Act</button>
        </Link>
        <button className="reset" onClick={() => reset()}>Reset</button>
      </div>

      <div className="navbar_filters">
        <select className="navbar_filters"  onChange={(e) => func(e)}>
          <option selected disabled>
            Order
          </option>
          <option value="1">A-z</option>
          <option value="2">Z-a</option>
        </select>
        <select className="navbar_filters"  onChange={(e) => func(e)}>
          <option selected disabled>
            Population
          </option>
          <option value="3">Max Population</option>
          <option value="4">Min Population</option>
        </select>
        <select className="navbar_filters" onChange={(e) => functionfil(countries3, e.target.value)}>
          <option selected disabled>
            Continent
          </option>
          <option value={"Asia"}>Asia</option>
          <option value={"Antarctica"}>Antarctica</option>
          <option value={"Europe"}>Europe</option>
          <option value={"Africa"}>Africa</option>
          <option value={"Oceania"}>Oceania</option>
          <option value={"North America"}>North America</option>
          <option value={"South America"}>South America</option>
        </select>
        <select className="navbar_filters"  onChange={(e) => functionfilter(e)}>
          <option selected disabled>
            Activity
          </option>
          {act.length > 0 && act.map((e) => <option value={e}>{e}</option>)}
        </select>
      </div>
    </div>
  );
};
