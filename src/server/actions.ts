/*Get all the countries using */
export async function fetchCountries(searchTerm: string): Promise<any> {
  try {
    if (searchTerm == "") {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) {
        throw new Error(
          "Unable to Fetch Data, Please check your internet connection"
        );
      }

      const data = await response.json();
      return data;
    } else {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${searchTerm}`
      );
      if (!response.ok) {
        throw new Error(
          "Unable to fetch data, PLease check your internet connection"
        );
      }
      const data = await response.json();
      return data;
    }
  } catch (error) {
    return { error: error };
  }
}

export async function searchCountryByCode(code: string): Promise<any> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    if (!response.ok) {
      throw new Error(
        "Unable to fetch data, please check your internet connection"
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error };
  }
}
