import {default as React} from 'react';
import IconInfo from '../icons/info-tooltip.svg';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const List: React.FC<any> = ({hits, nbHits}: any) => {

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
                            hits.sort((a: any, b: any) => a.fio.localeCompare(b.fio)).map((hits: any, index: number) => {
                                const {place, year, total, notes, male, female, literate, absent, nationality, region, selsovet, area, _highlightResult} = hits;
                                const placeTooltipDescription = `${selsovet} сельсовет, ${area} район, ${region} округ`;
                                return (
                                    <tr key={index}>
                                        <td className="born-name-tr"
                                            dangerouslySetInnerHTML={{__html: _highlightResult?.fio?.value}}></td>
                                        <td className="td-place-location">

                                            <OverlayTrigger
                                                placement={'right'}
                                                overlay={<Tooltip id={`tooltip-rigth`}>{placeTooltipDescription}</Tooltip>}
                                            >
                                                <span>
                                                    <span>{place}</span>
                                                    <svg id="Layer_1"
                                                         data-name="Layer 1"
                                                         style={{width: '2px', marginLeft: '5px'}}
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.96 122.88">
                                                        <path className="cls-1"
                                                              d="M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z"/>
                                                    </svg>
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