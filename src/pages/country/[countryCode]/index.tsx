import { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { BorderCountryBox } from "@/components";
import { searchCountryByCode } from "@/server/actions";
import { ThemeContext } from "@/context/context";
import { CircularProgress } from "@mui/joy";
import { formatCapitalsDisplay } from "@/components/CountryCard";

function DetailPage() {
  const router = useRouter();
  const countryCode = router.query.countryCode;
  const { data, isLoading } = useQuery({
    queryKey: ["countries", countryCode],
    queryFn: () => searchCountryByCode(countryCode?.toString()!),
  });
  let currentTheme = useContext(ThemeContext);
  return (
    <div
      className={`app__detail ${
        currentTheme == "Dark Mode"
          ? "section_dark dark"
          : "section_light light"
      }`}
    >
      <Link href="/">
        <div
          className={`app__detail-back ${
            currentTheme == "Dark Mode" ? "container_dark" : "container_light"
          }`}
        >
          <i className="fa-solid fa-arrow-left"></i>
          <p>Back</p>
        </div>
      </Link>

      {isLoading ? (
        <div className="app__section-loading-countries">
          <CircularProgress size="lg" variant="plain" />
        </div>
      ) : data && data[0] && data[0].languages ? (
        <div className="app__detail-country-infos">
          <div className="app__detail-country-image">
            <img src={data[0].flags["png"]} alt="Country Image" />
          </div>
          <div className="app__detail-country-details">
            <p className="app__detail-country-name">{data[0].name["common"]}</p>
            <div className="app__detail-info-box">
              <div className="app__detail-info">
                <p>
                  <span>Native Name: </span>
                  {
                    data[0].name.nativeName[
                      Object.keys(data[0].name.nativeName)[0]
                    ].official
                  }
                </p>
                <p>
                  <span>Population: </span>
                  {data[0].population}
                </p>
                <p>
                  <span>Region: </span>
                  {data[0].region}
                </p>
                <p>
                  <span>Sub Region: </span>
                  {data[0].subregion}
                </p>
                <p>
                  <span>Capital: </span>
                  {formatCapitalsDisplay(data[0].capital)}
                </p>
              </div>
              <div className="app__detail-info">
                <p>
                  <span>Top Level Domain: </span>
                  {formatCapitalsDisplay(data[0].tld)}
                </p>
                <p>
                  <span>Currencies: </span>
                  {data[0].currencies[Object.keys(data[0].currencies)[0]].name}
                </p>
                <p>
                  <span>Languages: </span>
                  {data[0] && data[0].languages ? (
                    <>
                      {Object.entries(data[0].languages).map(
                        ([key, value], index) => (
                          <em
                            className="app__detail-country-languages"
                            key={key}
                          >
                            {index <
                            Object.keys(data[0].languages).length - 1 ? (
                              <>{value as string}, </> // Assert value as string
                            ) : (
                              (value as string)
                            )}
                          </em>
                        )
                      )}
                    </>
                  ) : (
                    <span>No Languages Available</span>
                  )}
                </p>
              </div>
            </div>
            {data[0].borders ? (
              <div className="app__detail-borders">
                <p>
                  <span>Border Countries: </span>
                </p>
                <div className={`app__detail_border_countries`}>
                  {data[0].borders.map((border: string) => {
                    return (
                      <Link href={border}>
                        <BorderCountryBox borderCode={border} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div className="app__section-error">
          <p>Something went wrong</p>
        </div>
      )}
    </div>
  );
}
export default DetailPage;
