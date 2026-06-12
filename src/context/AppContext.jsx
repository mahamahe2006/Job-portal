import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";


export const AppContext=createContext()

export const AppContextProvider=(props)=>{
    const[searchFilter,setSearchFilter]=useState({
        title:'',
        location:''
    })

    const[isSearched,SetisSearched]=useState(false)

    const[jobs,setJobs]=useState([]);

    const value={
        searchFilter,setSearchFilter,
        isSearched,SetisSearched,
        jobs,setJobs
    }

    //function to fetch jobs
    const fetchJobs = async()=>{
        setJobs(jobsData)
    }
    useEffect(()=>{
        fetchJobs()
    },[])

    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}