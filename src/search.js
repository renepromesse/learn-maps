const buildQuery = (query, token, country = undefined) => {
    const base_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
    const no_country = `${base_url}${query}.json?access_token=${token}`;
    const with_country = `${base_url}${query}.json?country=${country}&access_token=${token}`;
    return country ? with_country : no_country;
  };
  
  export const getResults = async function(query, token, country = undefined) {
    if (query === "") {
      return {
        response: {
          features: []
        }
      };
    }
  
    try {
      const path = buildQuery(query, token, country);
      // Mapbox API returns an object which comes
      // with a .json() method which asynchronously
      // executes the query
      const testPath = await fetch(path, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      // Handle error if response is bad
      if (!testPath.ok) throw Error(testPath.statusText);
  
      // Execute query
      const queryResults = await testPath.json();
      return {
        response: queryResults
      };
    } catch (error) {
      return { error };
    }
  };
  