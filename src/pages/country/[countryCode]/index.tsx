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
      <div
        onClick={() => router.back()}
        className={`app__detail-back ${
          currentTheme == "Dark Mode" ? "container_dark" : "container_light"
        }`}
      >
        <i className="fa-solid fa-arrow-left"></i>
        <p>Back</p>
      </div>

      {isLoading ? (
        <div className="app__section-loading-countries">
          <CircularProgress size="lg" variant="plain" />
        </div>
      ) : data && data.languages ? (
        <div className="app__detail-country-infos">
          <div className="app__detail-country-image">
            <img src={data.flags["png"]} alt="Country Image" />
          </div>
          <div className="app__detail-country-details">
            <p className="app__detail-country-name">{data.name["common"]}</p>
            <div className="app__detail-info-box">
              <div className="app__detail-info">
                <p>
                  <span>Native Name: </span>
                  {
                    data.name.nativeName[
                      Object.keys(
                        data.name.nativeName
                      )[0] as keyof typeof data.name.nativeName
                    ].official
                  }
                </p>
                <p>
                  <span>Population: </span>
                  {data.population}
                </p>
                <p>
                  <span>Region: </span>
                  {data.region}
                </p>
                <p>
                  <span>Sub Region: </span>
                  {data.subregion}
                </p>
                <p>
                  <span>Capital: </span>
                  {formatCapitalsDisplay(data.capital)}
                </p>
              </div>
              <div className="app__detail-info">
                <p>
                  <span>Top Level Domain: </span>
                  {formatCapitalsDisplay(data.tld)}
                </p>
                <p>
                  <span>Currencies: </span>
                  {
                    data.currencies[
                      Object.keys(
                        data.currencies
                      )[0] as keyof typeof data.currencies
                    ].name
                  }
                </p>
                <p>
                  <span>Languages: </span>
                  {data && data.languages ? (
                    <>
                      {Object.entries(data.languages).map(
                        ([key, value], index) => (
                          <em
                            className="app__detail-country-languages"
                            key={key}
                          >
                            {index < Object.keys(data.languages).length - 1 ? (
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
            {data.borders ? (
              <div className="app__detail-borders">
                <p>
                  <span>Border Countries: </span>
                </p>
                <div className={`app__detail_border_countries`}>
                  {data.borders.map((border: string) => {
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
