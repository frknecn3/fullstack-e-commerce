import {
    useState,
    useContext,
    createContext,
    ReactNode,
    useEffect,
} from "react";

const GeneralContext = createContext("");

const GeneralProvider = ({ children }) => {
    const [TYProduct, setSearch] = useState({
        keyword: "",
        results: [],
    });

    useEffect(() => { }, []);

    return (
        <GeneralContext.Provider value={[search, setSearch]}>
            {children}
        </GeneralContext.Provider>
    );
};

const useSearch = () => useContext(SearchContext);

export { useSearch, GeneralProvider };
