import React, { useMemo, useState, useEffect } from 'react';
import { useTable } from 'react-table';
import classnames from 'classnames'
import "./Table.scss";

export default function Table({ data, columnsTable, bgNone=false }) {

    const columns = useMemo(() => columnsTable, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data: data
    });

    return (
        <table className={classnames("w-full text-sm-md", {"bg-white border": !bgNone})} {...getTableProps()}>
            <thead className="text-left bg-[#62B4FF]">
                {headerGroups.map((headerGroup, i) => (
                    <tr {...headerGroup.getHeaderGroupProps()} key={i} className="tr-line">
                        {headerGroup.headers.map((column, index) => {
                            return (
                                <th
                                    key={index}
                                    scope="col"
                                    className="px-5 py-3 whitespace-nowrap"
                                    {...column.getHeaderProps()}
                                >
                                    {column.render('Header')}
                                </th>
                            );
                        })}
                    </tr>
                ))}
            </thead>
            <tbody className="text-right" {...getTableBodyProps()}>
                {
                    rows.map((row, index) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}
                                key={row?.original?._id || index}
                                className="text-md text-left tr-line"
                            >
                                {
                                    row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()} className="px-5 py-3 break-words">
                                            {cell.render('Cell')}
                                        </td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}
