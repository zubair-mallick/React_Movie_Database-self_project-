import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "../../utils/axios";

function Topnav(props) {
    const truncateOverview = (overview) => {
  if (overview && overview.length > 80) {
    return overview.slice(0, 80) + '...'; // Truncate overview to 80 characters and add ellipsis
  }
  return overview; // Return the original overview if it's not longer than 80 characters
};
  
    const [query,setQuery] = useState([])
    const [searches,setSearches] = useState(null)
    
    const getSearches = async () => {
        try {
            const {data} = await axios.get(`/search/multi?query=${query}`)
            setSearches(data.results);
           
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
      getSearches()
    }, [query])
    
    return (
        <div className=' h-[10vh] relative pl-4  ml-[20%] z-50'> 
            <i className="text-3xl relative text-zinc-400 ri-search-line"></i>

            <input onChange={(e)=>setQuery(e.target.value)} value={query} className=" text-center w-[50%] p-2 text-xl mx-10 outline-none border-none bg-transparent text-zinc-200 " type="text" placeholder='Search Anything' />

           {query.length > 0 &&  
            <i onClick={()=>setQuery("")} className="text-3xl text-zinc-400 ri-close-fill"></i>
           }

            <div className='absolute w-[66%] max-h-[50vh] bg-zinc-200 top-[90%] overflow-auto rounded-lg'>
              {searches && searches.map((s,i) =>(
                <Link key={i} className='hover:text-zinc-100 duration-300 hover:bg-zinc-600 text-zinc-600 font-semibold w-[100%] px-6 py-2 flex justify-start items-center border-b-2 border-zinc-100'>
                    <img className='shadow-lg w-[8vw] h-[12vh] rounded mr-2 object-cover' src={(s.backdrop_path||s.profile_path ||s.poster_path ) && `https://image.tmdb.org/t/p/original${s.backdrop_path || s.profile_path || s.poster_path }` || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} alt="" />
                    <span>
                        { s.title && s.original_title? s.original_title +`(${s.title})`: s.original_title && s.original_title || s.name|| s.original_name ||  s.title}
                    </span>
                </Link>
            ))}
            </div>
        </div>
    );
}

export default Topnav;
