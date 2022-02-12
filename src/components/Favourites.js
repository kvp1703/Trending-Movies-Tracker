import React from 'react';
import Pagination from './Pagination';
import {useState, useEffect} from 'react';
import up from '../resources/upp.png';
import down from '../resources/downn.png';

function Favourites() {

  let genresId = {
    28 : "Action",          
    12 : "Adventure"  ,     
    16 : "Animation" ,      
    35 : "Comedy"  ,        
    80 : "Crime"  ,         
    99 : "Documentary"    , 
    18 : "Drama"  ,         
    10751: "Family"   ,       
    14 : "Fantasy"         ,
    36 : "History"         ,
    27 : "Horror"          ,
    10402 : "Music"           ,
    9648 : "Mystery"         ,
    10749 : "Romance"         ,
    878 : "Science Fiction" ,
    10770 : "TV Movie"        ,
    53 : "Thriller"        ,
    10752 : "War"             ,
    37 : "Western"         
  } 

  const [curGenre, setCurGenre] = useState('All Genres');
  const [favourites, setFavourites] = useState([]);
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState(0);
  const [popularity, setPopularity] = useState(0);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);
  const [curPage, setCurPage] = useState(1);

  //for local storage
  useEffect(() => {
    let oldFav = localStorage.getItem("imdb");
    oldFav = JSON.parse(oldFav) || [];
    setFavourites([...oldFav]);
  },[])

  //for genres , to make buttons in top dynamic
  useEffect(() => {
    let temp = favourites.map((movie) => genresId[movie.genre_ids[0]]); 
    temp = new Set(temp); //For unique values only
    setGenres(["All Genres", ...temp]);
  },[favourites]) 

  let del = (movie) => {
    let newArray = favourites.filter((m) => m.id!=movie.id);
    setFavourites([...newArray]);
    localStorage.setItem("imdb", JSON.stringify(newArray)); 
  }

  let filteredMovies = []; 
  filteredMovies = curGenre == "All Genres" ? favourites:
  favourites.filter((movie) => genresId[movie.genre_ids[0]] == curGenre);

  //Searching
  filteredMovies = filteredMovies.filter((movie) => 
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  //Pagination
  let maxPage = Math.ceil(filteredMovies.length / rows);
  let startInd = (curPage - 1) * rows;
  let endInd = Number(startInd) + Number(rows);

  filteredMovies = filteredMovies.slice(startInd, endInd);

  let goBack = () => {
    if(curPage > 1){
      setCurPage(curPage-1);
    }
  }

  let goAhead = () => {
    if(curPage < maxPage){
      setCurPage(curPage+1);
    }
  }

  //Sorting

  //For rating
  // console.log(rating + " " + popularity);
  if(rating == 1){
    filteredMovies = filteredMovies.sort(function(objA, objB){
      return objA.vote_average - objB.vote_average;
    })
    //if objA.vote_average - objB.vote_average is negative, objA comes before objB
  }else if(rating == -1){
    filteredMovies = filteredMovies.sort(function(objA, objB){
      return objB.vote_average - objA.vote_average;
    })
  }

  //Popularity
  if(popularity == 1){
    filteredMovies = filteredMovies.sort(function(objA, objB){
      return objA.popularity - objB.popularity;
    })
    //if objA.vote_average - objB.vote_average is negative, objA comes before objB
  }else if(popularity == -1){
    filteredMovies = filteredMovies.sort(function(objA, objB){
      return objB.popularity - objA.popularity;
    })
  }

  return <>
    <div className="
      mt-4 px-2 flex justify-center 
      flex-wrap space-x-2
    ">

      {
        genres.map((genre) => 

          <button className={
            curGenre == genre ?
            "m-2 text-lg p-1 px-2 bg-blue-400 text-white rounded-xl font-bold"
            :
            "m-2 text-lg p-1 px-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold"
          }
          // onClick={() => setCurGenre(genre)}
          onClick={() => {
            setCurGenre(genre);
            setCurPage(1);
          }}
          >
           {genre}
          </button>

        )
      }

    </div>

    <div className="text-center">
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} 
        placeholder='Search' className="border border-2 text-center p-1 m-2" />

      <input type="number" value={rows} onChange={(e) => setRows(e.target.value)}
        placeholder='Rows' className="border border-2 text-center p-1 m-2" />
    </div>

    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                    <div className="flex">
                      <img src={up} className="
                        mr-2 cursor-pointer
                      "
                      onClick={() => {
                        setPopularity(0);
                        setRating(-1);
                      }}
                      />
                      Rating
                      <img src={down} className="
                        ml-2 cursor-pointer
                      "
                      onClick={() => {
                        setPopularity(0);
                        setRating(1);
                      }}
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex">
                      <img src={up} className="
                        mr-2 cursor-pointer
                      "
                      onClick={() => {
                        setRating(0);
                        setPopularity(-1);
                      }}
                      />
                      Popularity
                      <img src={down} className="
                        ml-2 cursor-pointer
                      "
                      onClick={() => {
                        setRating(0);
                        setPopularity(1)
                      }}
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Genre
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Action
                  </th>
                  
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMovies.map((movie) => (
                  <tr key={movie.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-20 w-20">
                          <div className={`
                          bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] 
                          h-20 w-20 rounded-xl
                          bg-center bg-cover
                          `}>

                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{movie.title}</div>
                          {/* <div className="text-sm text-gray-500">{person.email}</div> */}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{movie.vote_average}</div>
                      {/* <div className="text-sm text-gray-500">{person.department}</div> */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{movie.popularity}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {/* {
                        (movie.genre_ids).map((genre) => (
                          <span className="px-2 m-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {genresId[genre]}
                          </span>
                        ))
                      } */}
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {genresId[movie.genre_ids[0]]}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-xl bg-gray-100 text-red-800 cursor-pointer " onClick={() => del(movie)}>
                        Remove
                      </span>
                    </td>
                
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>


    <div className='mt-4'>
      <Pagination pageNo={curPage} goAhead={goAhead} goBack={goBack} />
    </div>
  </>
}

export default Favourites