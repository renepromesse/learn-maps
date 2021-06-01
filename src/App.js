import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {busParks} from './busPart';
// import {Asynchronous} from './searchPlace';
import './App.css';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import GoogleMaps from './searchLocation';
import SearchBox from "@seanhouli/react-mapbox-search";
import { Asynchronous } from './searchPlace';
const mapBoxApiToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

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
  const handleDateChange = () =>{
    return console.log('date changed');
  }
  return (
    <div className="App" style={{border:'1px solid red'}}>
      <div className="pickDate">
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker 
                disableToolbar
                variant="dialog"
                inputVariant="filled"
                format="MM/dd/yyyy"
                onChange={handleDateChange}
            />
        </MuiPickersUtilsProvider> */}
        {/* <GoogleMaps/> */}
        {/* <SearchBox
            token={mapBoxApiToken}
            country="US"
            // callback={({ location, event }) => console.log('found', location, event) }
            selectColor="#ef4836"
        /> */}
        <Asynchronous/>
        {/* <Asynchronous/> */}

      </div>
      <ReactMapGL {...Viewport}
       onViewportChange={(viewport) => setViewport(viewport)} 
       mapStyle="mapbox://styles/mapbox/streets-v11"
       mapboxApiAccessToken='pk.eyJ1IjoicmVuZXByb21lc3NlIiwiYSI6ImNrbWtmazVjYjEwZDQyb3BmbG1ycmp0Y2wifQ.Fi3QGjp6cfHzC5zlrzrqEw'>
         {busParks.map(park => (
           <Marker key={`park-${park.id}-${park.location}`} latitude={park.coordinates[0]} longitude={park.coordinates[1]}>
             <svg
              width="5.6444445mm"
              height="9.847393mm"
              viewBox="0 0 20 34.892337"
              onClick={() => setSelected(park)}
              >
              <g
                id="outsideG"
                transform="translate(-814.59595,-274.38623)">
                <g
                  id="innerG"
                  transform="matrix(1.1855854,0,0,1.1855854,-151.17715,-57.3976)">
                  <path
                    d="m 817.11249,282.97118 c -1.25816,1.34277 -2.04623,3.29881 -2.01563,5.13867 0.0639,3.84476 1.79693,5.3002 4.56836,10.59179 0.99832,2.32851 2.04027,4.79237 3.03125,8.87305 0.13772,0.60193 0.27203,1.16104 0.33416,1.20948 0.0621,0.0485 0.19644,-0.51262 0.33416,-1.11455 0.99098,-4.08068 2.03293,-6.54258 3.03125,-8.87109 2.77143,-5.29159 4.50444,-6.74704 4.56836,-10.5918 0.0306,-1.83986 -0.75942,-3.79785 -2.01758,-5.14062 -1.43724,-1.53389 -3.60504,-2.66908 -5.91619,-2.71655 -2.31115,-0.0475 -4.4809,1.08773 -5.91814,2.62162 z"
                    style={{ cursor:"pointer",display:"inline",opacity:1,fill:"#ff4646",
                    fillOpacity:1,stroke:"#d73534",strokeWidth:1,strokeMiterlimit:4,
                    strokeDasharray:"none",strokeOpacity:1}} />
                  <circle
                    r="3.0355"
                    cy="288.25278"
                    cx="823.03064"
                    id="path3049"
                    style={{ cursor:"pointer",display:"inline",opacity:1,
                    fill:"#590000",fillOpacity:1,strokeWidth:0}} />
                </g>
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
