import {CSSProperties, default as React} from 'react';

export const InitInfo = ({nbHits, facets}: any) => {
    return <div className="alert alert-dark" role="alert">
        Всего в базе:<br/>
        Персон - {nbHits}<br/>
        Деревень - {facets && facets.place ? Object.keys(facets.place).length : 0}<br/>
        Сельсоветов - {facets && facets.selsovet ? Object.keys(facets.selsovet).length : 0}
    </div>;
};