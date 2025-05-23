
import { useEffect, useState } from 'react';
import './App.css';
import Router from './router/Router';
import publicRoutes from './router/routes/publicRoutes';
import { getRoutes } from './router/routes';

function App() {
    const [allRoutes, setAllRoutes] = useState([...publicRoutes])
    // console.log(allRoutes);

    useEffect(()=>{
        const routes = getRoutes()
        setAllRoutes([...allRoutes, routes])
    }, [])
    return <Router allRoutes={allRoutes} />
}

export default App;
