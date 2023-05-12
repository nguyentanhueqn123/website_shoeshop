import React, { useEffect, useState } from 'react'
import AdminContainer from '../../../components/AdminContainer/AdminContainer'
// import Dropdown from '../../../components/Dropdown/Dropdown'
import DoughnutChart from '../../../components/DoughnutChart/DoughnutChart'
import BarChart from '../../../components/BarChart/BarChart'
import Table from '../../../components/Table/Table'
import { useFetchListInvoice, useListInvoice, useFetchReport, useTotal, useCost } from '../../../store/invoice/hook'
import { PRODUCT_STATUS_COLOR, PRODUCT_STATUS } from '../../../constants/index'
import Badge from '../../../components/Badge/Badge'
import classnames from 'classnames'
// import LoadingPage from '../../../components/LoadingPage/Loading'
import { formatDDMMYYYYHHmm } from '../../../utils/formatDatetime'
import arrayToObject from '../../../utils/arrayToObject'
import { formatPrice } from './../../../utils/formatPrice';

export default function Dashboard() {
  useFetchListInvoice()
  useFetchReport()
  const listInvoice = useListInvoice()
  const total = useTotal()
  const cost = useCost()
  const [reportCost, setReportCost] = useState()
  const [reportTotal, setReportTotal] = useState()
  // const labels = ['Đô Inox', 'Đồ gỗ', 'Đồ sứ', 'Đồ thủy tinh', 'Đồ điện']
  const labels = ['Nike', 'Converse', 'Ananas']

  const dataDoughnutChart = [15, 15, 20, 25, 25]

  useEffect(() => {
    setReportCost(arrayToObject(cost?.data, "_id", "total"))
    setReportTotal(arrayToObject(total?.data, "_id", "count"))
  }, [total, cost])

  const columnsTable = [
    {
      Header: 'ORDER TIME',
      accessor: 'time',
      Cell: data => {
        return <span>
          {formatDDMMYYYYHHmm(data?.row.original.time)}
        </span>
      }
    },
    {
      Header: 'DELIVERY ADDRESS',
      accessor: 'address',
    },
    {
      Header: 'PHONE',
      accessor: 'phone',
    },
    {
      Header: 'PAYMENT METHOD',
      accessor: 'paymentMethod',
    },
    {
      Header: 'ORDER AMOUNT',
      accessor: 'cost',
    },
    {
      Header: 'STATUS',
      accessor: 'status',
      Cell: data => {
        return <Badge 
        style={{
            backgroundColor: PRODUCT_STATUS_COLOR?.[data?.row.original.status.toLowerCase()]
        }}
        className={classnames("text-sm-md px-2 font-medium")}>{PRODUCT_STATUS?.[data.row.original.status?.toLowerCase()]?.label}</Badge>
      }
    },
  ]


  return (
    <AdminContainer>
      <p className="text-lg font-medium mb-6">
        Dashboard Overview
      </p>

      <div className="grid grid-cols-3 gap-x-5">
        <div className="bg-green-2 rounded-lg flex flex-col items-center justify-center py-5 shadow-lg">
          <i className='bx bx-layer text-4xl text-white'></i>
          <p className="text-lg mt-1 text-white">Total Processing</p>
          <p className="text-3xl font-bold mt-2 text-white">{formatPrice(reportCost?.PROCESSING) || 0} VND</p>
        </div>
        <div className="bg-blue-1 rounded-lg flex flex-col items-center justify-center py-5 shadow-lg">
          <i className='bx bx-cart text-4xl text-white'></i>
          <p className="text-lg mt-1 text-white">Total Pending</p>
          <p className="text-3xl font-bold mt-2 text-white">{formatPrice(reportCost?.PENDING) || 0} VND</p>
        </div>
        <div className="bg-green-1 rounded-lg flex flex-col items-center justify-center py-5 shadow-lg">
          <i className='bx bxs-credit-card text-4xl text-white'></i>
          <p className="text-lg mt-1 text-white">Total Delivered</p>
          <p className="text-3xl font-bold mt-2 text-white">{formatPrice(reportCost?.DELIVERED) || 0} VND</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-5 my-8">
        <div className="px-5 rounded-lg bg-[#F2F2F2] border py-5 flex items-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-orange-1 flex items-center justify-center text-2xl mr-4">
            <i className='bx bx-cart'></i>
          </div>
          <div>
            <p className="text-md opacity-50">
              Total Cancel
            </p>
            <p className="font-bold text-2xl">
              {reportTotal?.CANCEL || 0}
            </p>
          </div>
        </div>
        <div className="px-5 rounded-lg bg-[#F2F2F2] border py-5 flex items-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-blue-1 flex items-center justify-center text-2xl mr-4">
            <i className='bx bx-refresh' ></i>
          </div>
          <div>
            <p className="text-md opacity-50">
              Order Pending
            </p>
            <p className="font-bold text-2xl">
              {reportTotal?.PENDING || 0}
            </p>
          </div>
        </div>

        <div className="px-5 rounded-lg bg-[#F2F2F2] border py-5 flex items-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-green-2 flex items-center justify-center text-2xl mr-4">
            <i className='bx bxs-truck' ></i>
          </div>
          <div>
            <p className="text-md opacity-50">
              Order Processing
            </p>
            <p className="font-bold text-2xl">
              {reportTotal?.PROCESSING || 0}
            </p>
          </div>
        </div>

        <div className="px-5 rounded-lg bg-[#F2F2F2] border py-5 flex items-center shadow-lg">
          <div className="w-12 h-12 rounded-full bg-green-1 flex items-center justify-center text-2xl mr-4">
            <i className='bx bx-check' ></i>
          </div>
          <div>
            <p className="text-md opacity-50">
              Order Delivered
            </p>
            <p className="font-bold text-2xl">
              {reportTotal?.DELIVERED || 0}
            </p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-2 my-8 gap-x-5">
        <div className="p-4 rounded-lg shadow-xs bg-[#F2F2F2] border shadow-lg">
          <p className="opacity-80 font-medium text-lg mb-5">Conversions This Year</p>
          <div className="h-[400px] flex flex-cols items-end">
            <BarChart />
          </div>
        </div>
        <div className="p-4 rounded-lg shadow-xs bg-[#F2F2F2] border shadow-lg">
          <p className="opacity-80 font-medium text-lg mb-5">Top Revenue Product</p>
          <div className="h-[400px] flex flex-cols items-end">
            <DoughnutChart
              labels={labels}
              dataChart={dataDoughnutChart}
            />
          </div>
        </div>
      </div>
      {
        listInvoice?.data && <Table columnsTable={columnsTable} data={listInvoice?.data} />
      }
    </AdminContainer>
  )
}
