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
import { useFetchProducts, useProducts, useFetchAllProductType} from '../../../store/product/hook'
import {Chart} from 'chart.js';


export default function Dashboard() {
  useFetchListInvoice()
  useFetchReport()
  const listInvoice = useListInvoice()

  //
  // listInvoice?.data.forEach(list => {
  //     console.log(list.product)
  // })
  
  const products = useProducts()
    // products?.data.forEach(product => {
    //   console.log(product._id)
    // })
    // console.log("===== sp: ", products?.data[0].nameProduct);
  useFetchProducts()
  useFetchAllProductType()
  //



  const total = useTotal()
  const cost = useCost()
  const [reportCost, setReportCost] = useState()
  const [reportTotal, setReportTotal] = useState()
  // const labels = ['Đô Inox', 'Đồ gỗ', 'Đồ sứ', 'Đồ thủy tinh', 'Đồ điện']
  const labels = ['Nike', 'Converse', 'Ananas']

  // const dataDoughnutChart = [15, 15, 20, 25, 25]

  useEffect(() => {
    setReportCost(arrayToObject(cost?.data, "_id", "total"))
    setReportTotal(arrayToObject(total?.data, "_id", "count"))
  }, [total, cost])

  // useEffect(() => {
  //   if (listInvoice?.data) {
  //     const productsByDay = listInvoice.data.reduce((acc, curr) => {
  //       const date = new Date(curr.time).toLocaleDateString();
  //       const productQuantities = curr.product.reduce((acc, productId) => {
  //         acc[productId] = (acc[productId] || 0) + 1;
  //         return acc;
  //       }, {});
  //       const totalProducts = Object.values(productQuantities).reduce((acc, curr) => acc + curr, 0);
  //       if (!acc[date]) {
  //         acc[date] = 0;
  //       }
  //       acc[date] += totalProducts;
  //       return acc;
  //     }, {});
  //     console.log(productsByDay);
  //   }
  // }, [listInvoice]);
  

  const columnsTable = [
    {
      Header: 'Id',
      accessor: '_id',
      Cell: data => {
          return <span>
              {data?.row?.original?._id?.slice(0, 2)}{data?.row?.original?._id?.slice(data?.row?.original?._id?.length - 2, data?.row?.original?._id?.length)}
          </span>
      }
    },
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
      Header: 'PHONE',
      accessor: 'phone',
    },
    {
      Header: 'DELIVERY ADDRESS',
      accessor: 'address',
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
  
  // BarChart hiện thị doanh thu sản phẩm bán trong tuần
  const [costByDay, setCostByDay] = useState({});
  useEffect(() => {
    if (listInvoice?.data) {
      const costByDay = daysOfWeek.reduce((acc, dayOfWeek) => {
        acc[dayOfWeek] = 0;
        return acc;
      }, {});
      listInvoice.data.forEach((invoice) => {
        const dayOfWeek = new Date(invoice.time).toLocaleDateString('en-US', { weekday: 'long' });
        const totalCost = invoice.product.reduce((acc, productId) => {
          const product = products?.data.find((p) => p._id === productId);
          return acc + product?.price || 0;
        }, 0);
        costByDay[dayOfWeek] += totalCost;
      });
      setCostByDay(costByDay);
    }
  }, [listInvoice, products]);
  useEffect(() => {
    const chartData = {
      labels: Object.keys(costByDay),
      datasets: [
        {
          label: 'Cost of Products Sold',
          data: Object.values(costByDay),
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
        },
      ],
    };
  
    const chartOptions = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    let chartStatus = Chart.getChart("productChart1"); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    const ctx = document.getElementById('productChart1').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });
  }, [costByDay]);


  // BarChart hiện thị số lượng sản phẩm bán trong tuần
  const [productsByDay, setProductsByDay] = useState({});
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  useEffect(() => {
    if (listInvoice?.data) {
      const productsByDay = daysOfWeek.reduce((acc, dayOfWeek) => {
        acc[dayOfWeek] = 0;
        return acc;
      }, {});
      listInvoice.data.forEach((invoice) => {
        const dayOfWeek = new Date(invoice.time).toLocaleDateString('en-US', { weekday: 'long' });
        const productQuantities = invoice.product.reduce((acc, productId) => {
          acc[productId] = (acc[productId] || 0) + 1;
          return acc;
        }, {});
        const totalProducts = Object.values(productQuantities).reduce((acc, curr) => acc + curr, 0);
        productsByDay[dayOfWeek] += totalProducts;
      });
      setProductsByDay(productsByDay);
    }
  }, [listInvoice]);

  useEffect(() => {
    const chartData = {
      labels: Object.keys(productsByDay),
      datasets: [
        {
          label: 'Number of Products Sold',
          data: Object.values(productsByDay),
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
          ],
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 2,
        },
      ],
    };

    const chartOptions = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
    let chartStatus = Chart.getChart("productChart"); // <canvas> id
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }
    const ctx = document.getElementById('productChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions,
    });
  }, [productsByDay]);

// BarChart hiện thị doanh thu sản phẩm bán trong tháng
const [costByMonth, setCostByMonth] = useState({});
useEffect(() => {
  if (listInvoice?.data) {
    const costByMonth = Array.from({ length: 12 }, () => 0);
    listInvoice.data.forEach((invoice) => {
      const month = new Date(invoice.time).getMonth();
      const totalCost = invoice.product.reduce((acc, productId) => {
        const product = products?.data.find((p) => p._id === productId);
        return acc + product?.price || 0;
      }, 0);
      costByMonth[month] += totalCost;
    });
    setCostByMonth(costByMonth);
  }
}, [listInvoice, products]);

// Modify this useEffect hook to use the costByMonth state variable
useEffect(() => {
  const chartData = {
    labels: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    datasets: [
      {
        label: 'Cost of Products Sold',
        data: costByMonth,
        backgroundColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 205, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  let chartStatus = Chart.getChart("productChart2");
  if (chartStatus != undefined) {
    chartStatus.destroy();
  }
  const ctx = document.getElementById('productChart2').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: chartOptions,
  });
}, [costByMonth]);

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
      <div className="p-4 mb-8 rounded-lg shadow-xs bg-white border shadow-lg">
        <p className="uppercase font-bold">Products sold this week</p>
        <div className="flex w-full justify-center">
          <div className="flex justify-center items-center h-auto w-[780px]">
            <canvas id="productChart" className="w-full h-full"></canvas>
          </div>
        </div>
      </div>
      {/* <div className="px-16 py-8 mb-12 rounded-lg shadow-xs bg-white border shadow-lg">
        <p className="uppercase font-bold">product revenue for this week</p>
        <canvas id="productChart1"></canvas>
      </div> */}
    
      <div className="grid grid-cols-2 my-8 gap-x-5">
        <div className="p-4 rounded-lg shadow-xs bg-[#F2F2F2] border shadow-lg">
          <p className="opacity-80 font-medium text-lg mb-5">Product revenue this week</p>
          <div className="flex flex-cols items-end">
            <canvas id="productChart1"></canvas>
          </div>
        </div>
        <div className="p-4 rounded-lg shadow-xs bg-[#F2F2F2] border shadow-lg">
          <p className="opacity-80 font-medium text-lg mb-5">Revenue this month</p>
          <div className="flex flex-cols items-end">
            <canvas id="productChart2"></canvas>
          </div>
        </div>
      </div>

      {
        listInvoice?.data && <Table columnsTable={columnsTable} data={listInvoice?.data} />
      }
    </AdminContainer>
  )
}
