import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { ThemeContext } from "@/context/context";
import { searchCountryByCode } from "@/server/actions";
import { CircularProgress } from "@mui/joy";

interface BorderCountryProps {
  borderCode: string;
}

function BorderCountryBox({ borderCode }: BorderCountryProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["country", borderCode],
    queryFn: () => searchCountryByCode(borderCode?.toString()!),
  });
  let currentTheme = useContext(ThemeContext);
  return (
    <>
      {isLoading ? (
        <div className="app__section-loading-countries">
          <CircularProgress size="lg" variant="plain" />
        </div>
      ) : data && data.name ? (
        <div
          className={`app__border-country-box ${
            currentTheme == "Dark Mode"
              ? "container_dark dark"
              : "container_light light"
          }`}
        >
          <p>{data.name.common}</p>
        </div>
      ) : (
        <div className="app__section-error">
          <p>Something went wrong</p>
        </div>
      )}
    </>
  );
}
export default BorderCountryBox;
