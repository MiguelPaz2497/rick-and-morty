import { useEffect, useState } from 'react'
import './App.css'
import UseFetch from './hooks/UseFetch'
import getRandomNumber from './services/getRandomNumber'
import LocationInfo from './components/LocationInfo'
import ResidentCard from './components/ResidentCard'
import FormSearch from './components/FormSearch'

function App() {
 
  const randomLocation   = getRandomNumber(126)
  const [ locationSelected, SetLocationSelected ] = useState(randomLocation)

  const url = `https://rickandmortyapi.com/api/location/${locationSelected||getRandomNumber(126)}`;
 const [ location, getLocation, hasErr ] = UseFetch(url)

 useEffect(() => {
  getLocation()
 }, [locationSelected])
  
  return (
    <div className='app'>
      <h1 className='app__title'>Rick and Morty</h1> 
      <FormSearch 
      SetLocationSelected={SetLocationSelected}
      />
      { hasErr ? (
        <h2 className='app__error'>hey!!! You must provide an id from 1 to 126</h2>
      ) : (
        <>
        <LocationInfo location = {location} />
      <div className='container-resident'>
        {location?.residents.map(url =>(
            <ResidentCard 
             key={url}
             url={url}
             />
          ))
        }
      </div>
      </>
      )
      }
      
      </div>
    )
}

export default App
