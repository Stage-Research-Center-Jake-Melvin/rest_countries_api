/*Get all the countries using */
export const fetchAllCountries = async (): Promise<any> => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error(
        "Unable to Fetch Data, Please check your internet connection"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error };
  }
};
