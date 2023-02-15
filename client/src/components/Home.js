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
  const numeropag = useSelector((state)=> state.Npage)

  const onPreviusPage = () => {
    if(numeropag == 1){return}
    else dispatch(actions.getNumberPage(numeropag - 1));
    
  };
  
  const onNextPage = () => {
    const itemsperpage = 10
    const lasttindex = numeropag * itemsperpage
    const firstindex = lasttindex - itemsperpage
    if(numeropag == countries.length / itemsperpage || totalitems < lasttindex){return}
   else dispatch(actions.getNumberPage(numeropag + 1));
  };
  
  const onPage = (e) => {

    dispatch(actions.getNumberPage(e));
  };
  const itemsperpage = 10
  const lasttindex = numeropag * itemsperpage
  const firstindex = lasttindex - itemsperpage
  
  useEffect(function () {
    if (countries.length < 1) {
      dispatch(actions.getCountries());
    }
    
  }, []);
  
  for (let i = 1; i <= Math.ceil(totalitems / itemsperpage); i++) {

    pageNumber.push(i);
  }

 
  // const handleclick = (data) => {
  //   const firstindex = data.selected * itemsperpage;
  //   console.log(firstindex);
  //   dispatch(
  //     actions.getCountriesFil([...countries].splice(firstindex, itemsperpage))
  //   );
  // };

  return (
    <div className="Home">
      
      <div className="Home_2">
      <nav className="pagination" role="navigation" aria-label="pagination">
          <ul className="pagination-list">
          <button className="pagination-btn" onClick={onPreviusPage}>
            Previous
          </button>
            {pageNumber.map((el) => (
              <button onClick={() => onPage(el)} className={el == numeropag ? "selec" : "normal"}>
                {el}
              </button>
            ))}
          <button className="pagination-btn" onClick={onNextPage}>
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
                  <div className="div_imagen">
                    <Link to={`/countries/${e.id}`}>
                      <img className="imagen" src={e.image} alt={e.name}></img>
                    </Link>
                  </div>
                  <h5>{e.continents}</h5>
                </div>
              )).slice(firstindex, lasttindex)
              }
        </div>
        
      </div>
     <div className="ref">
     <a target={"_blank"} className="refs" href="https://www.instagram.com/bendito.diablo"><img className="refsimg" src="https://eltallerdehector.com/wp-content/uploads/2022/06/cd939-logo-instagram-png.png"></img></a>
     <a href="https://github.com/alexaniasco" target={"_blank"}><img className="refsimg2" src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img></a>
     </div>
    </div>
  );
};
