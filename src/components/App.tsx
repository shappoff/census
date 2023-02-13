import {default as React} from 'react';

import useDebounce from "./useDebounce";
import List from "./List";
import IconInfo from "../icons/info-tooltip.svg";
import {DropDownComponent} from "./DropDownComponent";
import {InitInfo} from "./InitInfo";

const {
    applicationID, searchOnlyAPIKey, index_name
} = env;

const algoliasearch = require("algoliasearch");

const client = algoliasearch(applicationID, searchOnlyAPIKey);

const App: React.FC<any> = () => {
    const [searchTerm, setSearchTerm] = React.useState<string>('');

    const [hits, setHits] = React.useState<Array<any>>([]);
    const [facets, setFacets] = React.useState<any>({});
    const [defaultFacets, setdefaultFacets] = React.useState<any>({});
    const [nbHits, setNbHits] = React.useState<number>(0);

    const [regionFilter, setRegionFilter] = React.useState<any>([]);
    const [areaFilter, setAreaFilter] = React.useState<any>([]);
    const [selsovetFilter, setSelsovetFilter] = React.useState<any>([]);
    const [placeFilter, setPlaceFilter] = React.useState<any>([]);

    const [currentAlgoliaIndex, setCurrentAlgoliaIndex] = React.useState(client.initIndex(index_name));

    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    const searchHandler = ({target}: any) => {
        setSearchTerm(target.value);
    }

    const regionFilterHanfler = (selectedItems: any) => {
        setRegionFilter(selectedItems.map(({value}: any) => value));
    }

    const areaFilterHanfler = (selectedItems: any) => {
        setAreaFilter(selectedItems.map(({value}: any) => value));
    }

    const selsovetFilterHanfler = (selectedItems: any) => {
        setSelsovetFilter(selectedItems.map(({value}: any) => value));
    }

    const placeFilterHanfler = (selectedItems: any) => {
        setPlaceFilter(selectedItems.map(({value}: any) => value));
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
            .then(({facets, nbHits}: any) => {
                setFacets(facets);
                setdefaultFacets(facets);
                setNbHits(nbHits);
            });
    }, []);

    React.useEffect(() => {
        currentAlgoliaIndex.search(debouncedSearchTerm, {
            facets: ["*"],
            facetFilters: [
                [...placeFilter.map((place: string) => `place:${place}`)],
                [...regionFilter.map((region: string) => `region:${region}`)],
                [...areaFilter.map((area: string) => `area:${area}`)],
                [...selsovetFilter.map((selsovet: string) => `selsovet:${selsovet}`)],
            ]
        })
            .then(({hits, facets}: any) => {
                debouncedSearchTerm.length > 1 && setHits(hits);
                setFacets(facets);
            });
    }, [debouncedSearchTerm.length, placeFilter.length, regionFilter.length, areaFilter.length, selsovetFilter.length]);

    return (
        <>
            <div className="filter-panel">
                <DropDownComponent
                    placeholder="Округ"
                    items={facets && facets.region ? Object.keys(facets.region).sort().map((facet) => ({value: facet, label: facet})) : []}
                    changeHandler={regionFilterHanfler}
                />
                {
                    regionFilter.length ?
                        <DropDownComponent
                            placeholder="Район"
                            items={facets && facets.area ? Object.keys(facets.area).sort().map((facet) => ({
                                value: facet,
                                label: facet
                            })) : []}
                            changeHandler={areaFilterHanfler}
                        /> : null
                }
                {
                    areaFilter.length ?
                        <DropDownComponent
                            placeholder="Сельсовет"
                            items={facets && facets.selsovet ? Object.keys(facets.selsovet).sort().map((facet) => ({
                                value: facet,
                                label: facet
                            })) : []}
                            changeHandler={selsovetFilterHanfler}
                        /> : null
                }
                {
                    selsovetFilter.length ?
                        <DropDownComponent
                            placeholder="Населенный пункт"
                            items={facets && facets.place ? Object.keys(facets.place).sort().map((facet) => ({
                                value: facet,
                                label: facet
                            })) : []}
                            changeHandler={placeFilterHanfler}
                        /> : null
                }
            </div>
            <input autoFocus onInput={searchHandler} onChange={keysHandler} type="text" value={searchTerm} id="input"/>
            {
                hits.length ?
                    <List hits={hits} nbHits={nbHits}></List> :
                    <InitInfo facets={defaultFacets} nbHits={nbHits} />
            }
        </>
    );
};

export default App;