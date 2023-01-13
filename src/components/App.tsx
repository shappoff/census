import {default as React} from 'react';

import useDebounce from "./useDebounce";
import List from "./List";

const {
    applicationID, searchOnlyAPIKey, index_name
} = env;

const algoliasearch = require("algoliasearch");

const client = algoliasearch(applicationID, searchOnlyAPIKey);

const App = () => {
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    const [hits, setHits] = React.useState<Array<any>>([]);
    const [facets, setFacets] = React.useState<any>({});
    const [placeFilter, setPlaceFilter] = React.useState<any>([]);
    const [currentAlgoliaIndex, setCurrentAlgoliaIndex] = React.useState(client.initIndex(index_name));

    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const searchHandler = ({target}: any) => {
        setSearchTerm(target.value);
    }

    const keysHandler = (e: any) => {
        if (e.which == 27) {
            setSearchTerm('');
            setHits([]);
        }
    };

    React.useEffect(() => {
        currentAlgoliaIndex.search('', {
            hitsPerPage: 0,
            facets: ["*"]
        })
            .then(({facets}: any) => {
                setFacets(facets);
                setPlaceFilter(Object.keys(facets.place) as Array<string>);
            });
    }, []);

    React.useEffect(() => {
        if (debouncedSearchTerm) {
            currentAlgoliaIndex.search(debouncedSearchTerm, {
                facetFilters: [
                    [...placeFilter.map((place: string) => `place:${place}`)],
            ]
            })
                .then(({hits, facets}: any) => {
                    setHits(hits);
                });
        }
    }, [debouncedSearchTerm, placeFilter]);

    const placeClickHandler = (e: any) => {
        if (e.target.checked) {
            setPlaceFilter([...placeFilter, e.target.value])
        } else {
            setPlaceFilter(placeFilter.filter((item: any) => item !== e.target.value));
        }

    };

    return (
        <>
            <div className="years-facets">
                {
                    facets && facets.place && Object.keys(facets.place).map((place, index) =>
                        <div key={index + 'facet'} className="form-check form-check-inline">
                            <input
                                defaultChecked
                                onChange={placeClickHandler}
                                value={place} id={index + ''}
                                className="form-check-input" type="checkbox" />
                            <label className="form-check-label" htmlFor={index + ''}>{place}</label>
                        </div>
                    )
                }
            </div>
            <input autoFocus onInput={searchHandler} onChange={keysHandler} type="text" value={searchTerm} id="input"/>
            <List hits={hits}></List>
        </>
    );
};

export default App;