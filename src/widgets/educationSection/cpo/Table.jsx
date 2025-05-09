import './table.scss';

export const Table = ({ data }) => {
    if (!data?.length) return null;

    return (

        <section className="education__container-table">

            <table className="education__container-table__table">
                <thead className="education__container-table__table-head">
                    <tr className="education__container-table__table-row">
                        <th className="education__container-table__table-header static" scope="col"></th>
                        <th className="education__container-table__table-header" scope="col">Название <br /> спети</th>
                        <th className="education__container-table__table-header" scope="col">Статус</th>
                        <th className="education__container-table__table-header" scope="col">Форма обучения</th>
                        <th className="education__container-table__table-header" scope="col">Период обучения</th>
                    </tr>
                </thead>
                <tbody className="education__container-table__table-body">
                    {data.map((item) => (
                        <tr className="education__container-table__table-row" key={item.id}>
                            <th className="education__container-table__table-cell static"></th>
                            <td className="education__container-table__table-cell">{item.name}</td>
                            <td className="education__container-table__table-cell">{item.status}</td>
                            <td className="education__container-table__table-cell">{item.form}</td>
                            <td className="education__container-table__table-cell">{item.period}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>

    );
};
