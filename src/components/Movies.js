import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import Pagination from './Pagination';

function Movies() {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hover, setHover] = useState('');
  const [favourites, setFavourites] = useState([]);
  //This is like variable declaration and initialization
  //useState gives you a variable and function to change the variable

  function goAhead(){
    setPage(page+1);
  }

  function goBack(){
    if(page>1) setPage(page-1);
  }


  useEffect(function(){
    axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=5a51869470ac45b3958c06eb3a757382&page=${page}`
    ).then((res) => {
      // console.table(res.data.results);
      setMovies(res.data.results);
      let oldFav = localStorage.getItem("imdb");
      oldFav = JSON.parse(oldFav);
      setFavourites([...oldFav]);
    })
  },[page])
  
  let add = (movie) => {
    let newArray = [...favourites, movie];
    setFavourites([...newArray]);
    localStorage.setItem("imdb", JSON.stringify(newArray));
  }
  
  let del = (movie) => {
    let newArray = favourites.filter((m) => m.id!=movie.id);
    setFavourites([...newArray]);
    localStorage.setItem("imdb", JSON.stringify(newArray)); 
  }

  return <>
    <div className="mb-8" >
      <div className="mt-10 mb-10 font-bold text-2xl text-center" > Trending Movie </div>

      {
        movies.length == 0 ?
        <div className="flex justify-center">
          <Oval
            heigth="100"
            width="100"
            color='grey'
            secondaryColor = 'grey'
            ariaLabel='loading'
          />
        </div> :

        <div className = " flex flex-wrap justify-center hover:scale-105 ease-out duration-300">

          {
            movies.map((movie) => (
              <div className={`
                bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] 
                h-[25vh] w-[150px]
                md:h-[30vh] md:w-[250px]
                bg-center bg-cover 
                rounded-xl
                flex items-end
                m-4
                hover:scale-110
                ease-out duration-300
                relative
                `}
                onMouseEnter={()=>setHover(movie.id)}
                onMouseLeave={()=>setHover("")}
                >
                  {
                    hover == movie.id && 
                    <>

                      {
                        favourites.find((m) => m.id == movie.id) ?

                        <div className="absolute
                          top-2 right-2
                          p-2
                          bg-gray-800
                          rounded-xl text-xl
                          cursor-pointer
                          "
                          onClick={() => del(movie)}
                          >
                            ❌
                        </div> 

                        :

                        <div className="absolute
                          top-2 right-2
                          p-2
                          bg-gray-800
                          rounded-xl text-xl
                          cursor-pointer
                          "
                          onClick={() => add(movie)}
                          >
                            ❤️
                        </div>

                      }

                    </>
                  }

                  <div className="bg-gray-900 w-full text-white 
                    py-2 text-center rounded-b-xl font-bold text-2xl" > {movie.title} </div>

              </div>

            ))
          }


        </div>
      }

    </div>

    <Pagination pageNo={page}
      goAhead = {goAhead}
      goBack = {goBack}
    >
    </Pagination>

  </>
}

export default Movies;
