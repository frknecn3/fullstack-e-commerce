import {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";

const SearchContext: any = createContext("");

const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState({
    keyword: "",
    results: [],
  });

  useEffect(() => {}, []);

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {children}
    </SearchContext.Provider>
  );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
