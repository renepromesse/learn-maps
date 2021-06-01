// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getResults } from './search';

const token='pk.eyJ1IjoicmVuZXByb21lc3NlIiwiYSI6ImNrbWtmazVjYjEwZDQyb3BmbG1ycmp0Y2wifQ.Fi3QGjp6cfHzC5zlrzrqEw';
const country='RW';

export const Asynchronous =()  =>{
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [value, setValue] = React.useState('');
  const loading = open && options.length === 0;

    const handleSearch = async (event)=>{
        console.log('changin...', event.target.value);
        const query = event.target.value;
        // async sendSearchQuery() {
            // const { token, country } = this.props;
            try {
              const queryResults = await getResults(query, token, country);
              if (queryResults.error) throw Error(queryResults.error);
              setOptions( queryResults.response.features);
              console.log('results...',queryResults.response.features);
            } catch (e) {
              console.log("Error connecting to MapBox api, check internet / api token");
            }
        //   }
    }
    const handleSelection =  (event, newValue)=>{
        setValue(newValue);
        return console.log('newVALUE', newValue);
    }
  return (
      <Fragment>

          <Autocomplete
            id="asynchronous-demo"
            style={{ width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}
            value={value}
            onChange={handleSelection}
            // getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.place_name}
            
            options={options}
            loading={loading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Asynchronous"
                variant="outlined"
                onChange={handleSearch}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
      </Fragment>
  );
}
