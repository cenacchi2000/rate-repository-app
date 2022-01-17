import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
    const [repositories, setRepositories] = useState();
    const [loading, setLoading] = useState(false);
    const { data } = useQuery(GET_REPOSITORIES, {
        variables: { id: "jaredpalmer.formik" },
    });
    const fetchRepositories = async () => {
        setLoading(true);

        // Replace the IP address part with your own IP address!
        // const response = await fetch('http://192.168.100.16:5000/api/repositories');
        // const json = await response.json();
        // console.log(json);
       
        console.log(JSON.stringify(data))
        setLoading(false);
        // setRepositories(JSON.stringify(data));
    };

    useEffect(() => {
        fetchRepositories();
    }, []);

    return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
