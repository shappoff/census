import {default as React} from 'react';
import IconInfo from '../icons/info-tooltip.svg';

const List = ({hits}: any) => {

    return (
        <>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Нас.пункт</th>
                    <th>год</th>
                    <th>Заметки</th>
                </tr>
                </thead>
                <tbody id="list-of-res">
                {
                    hits.map((hits: any, index: number) => {
                        const {place, year, notes, _highlightResult} = hits;
                        return (
                            <tr key={index}>
                                <td className="born-name-tr" dangerouslySetInnerHTML={{__html: _highlightResult?.fio?.value}}></td>
                                <td>{place}</td>
                                <td>{year}</td>
                                <td className="note-info">{
                                    notes ? <img src={IconInfo} alt={notes} title={notes} data-bs-toggle="tooltip" /> : null
                                }</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </>
    );

};

export default List;