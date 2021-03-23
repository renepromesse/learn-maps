import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {busParks} from './busPart';
import './App.css';

const path1 = `m12 0c-4.4183 2.3685e-15 -8 3.5817-8 8 0 1.421 0.3816 2.75 1.0312 3.906 0.1079 0.192 0.221 0.381 0.3438 0.563l6.625
  11.531 6.625-11.531c0.102-0.151 0.19-0.311 0.281-0.469l0.063-0.094c0.649-1.156 1.031-2.485 1.031-3.906 0-4.4183-3.582-8-8-8zm0 
  4c2.209 0 4 1.7909 4 4 0 2.209-1.791 4-4 4-2.2091 0-4-1.791-4-4 0-2.2091 1.7909-4 4-4z`;
const path2 = `m12 3c-2.7614 0-5 2.2386-5 5 0 2.761 2.2386 5 5 5 2.761 0 5-2.239 5-5 0-2.7614-2.239-5-5-5zm0 2c1.657 0 3 1.3431 3
  3s-1.343 3-3 3-3-1.3431-3-3 1.343-3 3-3z`;

const PopupInfo = (props) =>{
  const {location, image} = props.info;
  return (
    <div>
      {console.log('popup', props)}
      <h3>{location}</h3>
      <img src={image} alt={location} width={240}/>
    </div>
  )
}


function App() {
  const [Viewport, setViewport] = useState({
    latitude:-1.9347710147981079,
    longitude: 30.07865783015588,
    zoom:12,
    width:'100vw',
    height: '80vh'
  });
  const [selected, setSelected] = useState(null);
  console.log('slected', selected);
  
  return (
    <div className="App" style={{border:'1px solid red'}}>
      <ReactMapGL {...Viewport}
       onViewportChange={(viewport) => setViewport(viewport)} 
       mapStyle="mapbox://styles/mapbox/streets-v11"
       mapboxApiAccessToken='pk.eyJ1IjoicmVuZXByb21lc3NlIiwiYSI6ImNrbWtmazVjYjEwZDQyb3BmbG1ycmp0Y2wifQ.Fi3QGjp6cfHzC5zlrzrqEw'>
         {busParks.map(park => (
           <Marker key={`park-${park.id}-${park.location}`} latitude={park.coordinates[0]} longitude={park.coordinates[1]}>
             <svg
              height={24}
              width={24}
              viewBox="0 0 24 24"
              style={{
                cursor:'pointer',
                stroke:'none',
                transform:`translate(${-20/2}px, ${-20}px)`
              }}
              onClick={() => setSelected(park)}
              >
                <g transform="translate(0 -1028.4)">
                  <path d={path1} fill="#e74c3c" transform="translate(0 1028.4)"/>
                  <path d={path2} fill="#c0392b" transform="translate(0 1028.4)"/>
                </g>
             </svg>
           </Marker>
         ))}
         {selected && (
           <Popup
            tipSize={5}
            latitude={selected.coordinates[0]}
            longitude={selected.coordinates[1]}
           >
             <PopupInfo info={selected} />
           </Popup>
         )}
       </ReactMapGL>
    </div>
  );
}

export default App;
