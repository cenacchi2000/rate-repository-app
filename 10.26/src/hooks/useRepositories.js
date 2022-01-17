import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import { GET_ALL_REPOSITORIES, GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
    const [repositories, setRepositories] = useState();
    const [loading, setLoading] = useState(false);
    const { data, error } = useQuery(GET_ALL_REPOSITORIES, {
        variables: {first: 2},
        fetchPolicy: 'cache-and-network',
    });
    const fetchRepositories = async () => {
        
        setLoading(true);

        // Replace the IP address part with your own IP address!
        // const response = await fetch('http://192.168.100.16:5000/api/repositories');
        // const json = await response.json();
        // console.log(json);
       
        console.log(JSON.stringify(data))
        setLoading(false);
        setRepositories([...repositories, data]);
    };

    useEffect(() => {
        fetchRepositories();
    }, []);

    return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
