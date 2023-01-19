import {default as React} from 'react';
import IconInfo from '../icons/info-tooltip.svg';
import MoreIcon from '../icons/3-vertical-dots-icon.svg';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const List = ({hits, nbHits}: any) => {

    return (
        <>
            {
                hits.length ? <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Нас.пункт</th>
                            <th>Всего душ</th>
                            <th>Мужчин</th>
                            <th>Женщин</th>
                            <th>Грамотных</th>
                            <th>Отсутствует более месяца</th>
                            <th>Нацианальность</th>
                            <th>год</th>
                            <th>Заметки</th>
                        </tr>
                        </thead>
                        <tbody id="list-of-res">
                        {
                            hits.map((hits: any, index: number) => {
                                const {place, year, total, notes, male, female, literate, absent, nationality, selsovet, area, _highlightResult} = hits;
                                return (
                                    <tr key={index}>
                                        <td className="born-name-tr"
                                            dangerouslySetInnerHTML={{__html: _highlightResult?.fio?.value}}></td>
                                        <td className="td-place-location">

                                            <OverlayTrigger
                                                placement={'right'}
                                                overlay={<Tooltip id={`tooltip-rigth`}>{`${selsovet} сельсовет, ${area} район`}</Tooltip>}
                                            >
                                                <span>
                                                    <span>{place}</span>
                                                    <img src={MoreIcon}
                                                         title={`${selsovet} сельсовет, ${area} район`}
                                                         alt={`${selsovet} сельсовет, ${area} район`}
                                                         style={{width: '2px', marginLeft: '5px'}}/>
                                                </span>
                                            </OverlayTrigger>

                                        </td>
                                        <td>{total}</td>
                                        <td>{male}</td>
                                        <td>{female}</td>
                                        <td>{literate}</td>
                                        <td>{absent}</td>
                                        <td>{nationality}</td>
                                        <td>{year}</td>
                                        <td className="note-info">{
                                            notes ?
                                                <OverlayTrigger
                                                    placement={'left'}
                                                    overlay={<Tooltip id={`tooltip-left`}>{notes}</Tooltip>}
                                                >
                                                    <img title={notes} alt={notes} src={IconInfo}/>
                                                </OverlayTrigger>
                                                : null
                                        }</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                    : null
            }

        </>
    );

};

export default List;