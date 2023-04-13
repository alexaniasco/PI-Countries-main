import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import * as actions from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

const itemsperpage = 10;

export const Home = () => {
  // ESTADOS LOCALES Y GLOBAL

  const dispatch = useDispatch();
  const countries = useSelector((state) => state.Countries);
  const [page, setPage] = useState(1);
  const pageNumber = [];
  const totalitems = countries.length;

  const onPreviusPage = () => {
    if (page == 1) {
      return;
    } else setPage(page - 1);
  };

  const onNextPage = () => {
    const itemsperpage = 10;
    const lasttindex = page * itemsperpage;
    const firstindex = lasttindex - itemsperpage;
    if (page == 25 || totalitems < lasttindex) {
      return;
    } else setPage(page + 1);
  };

  const onPage = (e) => {
    setPage(e);
  };
  const itemsperpage = 10;
  const lasttindex = page * itemsperpage;
  const firstindex = lasttindex - itemsperpage;

  useEffect(function () {
    if (countries.length < 1) {
      dispatch(actions.getCountries());
    }
  }, []);

  for (let i = 1; i <= Math.ceil(totalitems / itemsperpage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className="Home">
      <div className="Home_2 container">
        <nav className="pagination" role="navigation" aria-label="pagination">
          <ul className="pagination-list btn-group">
            <button className="pagination-btn" onClick={onPreviusPage}>
              Previous
            </button>
            {pageNumber.map((el) => (
              <button
                onClick={() => onPage(el)}
                className={el == page ? "selec btn btn-primary" : "normal btn btn-primary "}
              >
                {el}
              </button>
            ))}
            <button className="pagination-btn2" onClick={onNextPage}>
              Next
            </button>
          </ul>
        </nav>
        <div className="grid">
          {countries &&
            countries
              .map((e) => (
                <div className="countries" key={e.id}>
                  <Link to={`/countries/${e.id}`} className="title">
                    <p>{e.name.toUpperCase()}</p>
                  </Link>
               
                    <Link className="div_imagen" to={`/countries/${e.id}`}>
                      <img className="imagen" src={e.image} alt={e.name}></img>
                    </Link>
                
                  <h5>{e.continents}</h5>
                </div>
              ))
              .slice(firstindex, lasttindex)}
        </div>
      </div>
    </div>
  );
};
