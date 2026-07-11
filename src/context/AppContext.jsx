import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";


export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const { user } = useUser()
    const { getToken } = useAuth()

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    })

    const [isSearched, SetisSearched] = useState(false)

    const [jobs, setJobs] = useState([]);

    const [showRecruiterLogin, SetShowRecruiterLogin] = useState(false);

    const [companyToken, setCompanyToken] = useState(null);
    const [companyData, setCompanyData] = useState(null);

    const [userData, setUserData] = useState(null)
    const [userApplications, setUserApplications] = useState([])

    //function to fetch jobs
    const fetchJobs = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/jobs');

            if (data.success) {
                setJobs(data.jobs);
                console.log("API Jobs:", data.jobs);
            } else {
                toast.error(data.message);
                setJobs(jobsData);
            }
        } catch (error) {
            toast.error(error.message);
            setJobs(jobsData);
        }
    };


    //function to fetch company details
    const fetchCompanyData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/company/company', { headers: { token: companyToken } })

            if (data.success) {
                setCompanyData(data.company)
                console.log(data);
            } else {
                toast.error(data.message)
            }

        } catch (error) {

            toast.error(error.message)
        }


    }

    //function to fetch user data
    const fetchUserData = async () => {
        try {

            const token = await getToken();

            const { data } = await axios.get(backendUrl + '/api/users/user',
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //function to fetch user's applied application data
    const fetchUserApplications = async () => {

        try {


            const token = await getToken()
            const { data } = await axios.get(backendUrl + '/api/users/applications',
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if(data.success){
                setUserApplications(data.applications)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('companyToken')

        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken)
        }


    }, [])

    useEffect(() => {
        if (companyToken) {
            fetchCompanyData()
        }
    }, [companyToken])

    useEffect(() => {

        if (user) {
            fetchUserData()
            fetchUserApplications()
        }
    }, [user])

    const value = {
        searchFilter, setSearchFilter,
        isSearched, SetisSearched,
        jobs, setJobs,
        showRecruiterLogin, SetShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl,
        userData, setUserData,
        userApplications, setUserApplications,
        fetchUserData,
        fetchUserApplications,
    }



    return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}