import React from 'react';
import { useState } from 'react';

function Pagination({pageNo, goAhead, goBack}) {

  // const [page, setPage] = useState(1);
  // //This is like variable declaration and initialization
  // //useState gives you a variable and function to change the variable

  // function goAhead(){
  //   setPage(page+1);
  // }

  // function goBack(){
  //   if(page>1) setPage(page-1);
  // }

  return <>
    <div className="
    w-full 
    flex justify-center 
    mb-8">

      <button className="
      p-2 
      border-2
      border-indigo-500
      text-indigo-500
      border-r-0
      rounded-l-xl" 
      onClick={goBack}
      > Previous</button>

      <button className="
        p-2 
        border-2
        border-indigo-500
        text-indigo-500
        bg-gray-300"
      >
          {pageNo}
      </button>

      <button className="
        p-2 
        border-2
        border-indigo-500
        text-indigo-500
        border-l-0
        rounded-r-xl" 
        onClick={goAhead} 
      >
        Next
      </button>

    </div>
  </>
}

export default Pagination