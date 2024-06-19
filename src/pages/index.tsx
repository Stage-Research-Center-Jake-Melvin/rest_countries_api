import React, { useState } from "react";
import { MainSection } from "@/components";
import useDebounce from "@/hooks/useDebounce";

/*Types*/
export type Theme = "Dark Mode" | "Light Mode";
export type Region =
  | "All"
  | "Africa"
  | "Americas"
  | "Asia"
  | "Europe"
  | "Oceania";

export default function Home() {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedRegion, setSelectedRegion] = useState<Region>();
  const [search, setSearch] = useState<string>("");
  const debouncedSearchTerm = useDebounce(search, 200);
  return (
    <div>
      <MainSection
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        selectedContinent={selectedRegion}
        changeContinent={setSelectedRegion}
        searchValue={search}
        changeSearchValue={setSearch}
        debouncedSearchTerm={debouncedSearchTerm}
      />
    </div>
  );
}
