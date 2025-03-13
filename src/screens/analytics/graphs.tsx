import { useEffect, useState } from "react";
import axiosInterceptor from "../../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { client } from "../../constants/urlPath";
import DropdownSearch from "../../components/dropdownSearch";
import { getCurrentMonthRange } from "../../utils/time";
import { formatNumberWithCommas } from "../../utils/numberManipulation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

import { graphTabStructure, graphDataStructure, userFiltrationStructure } from "../../constants/interfaces";
import { convertUserArrayIntoSearchStream } from "../../utils/converArrayIntoSearchStream";

    const graphs: graphTabStructure[] = [ 
            { 
                label: "Hourly",
                graphData: "hourWise",
            }, { 
                label: "Weekly",
                graphData: "weekDayWise",
            }, { 
                label: "Daily",
                graphData: "dayWise",
            }, {
                label: "Monthly",
                graphData: "monthWise",
            }
    ]
    const graphTypes:string[] = ["bar", "area"] 
    const valueTypes:string[] = ["frequency", "amount"] 
  
  const AnalyticalGraphs: React.FC = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false)
    const [data, setData] = useState<graphDataStructure[]>([])
    const [totalData, setTotalData] = useState<graphDataStructure|null>(null)
    const [users, setUsers] = useState<userFiltrationStructure[]>([])
    const [selectedUsers, setSelectedUsers] = useState<userFiltrationStructure | null>(null)

    const {start: monthStartDate, end:monthEndDate} = getCurrentMonthRange()

    const [fromDate, setFromDate]= useState<string>(monthStartDate)
    const [toDate, setToDate]= useState<string>(monthEndDate)

    const [selectedGraphType, setSelectedGraphType] = useState<string>("area")
    const [selectedValueType, setSelectedValueType] = useState<string>("amount")

    const [selectedGraph, setSelectedGraph] = useState<graphTabStructure>({ 
        label: "Hourly",
        graphData: "hourWise",
    })

    const fetchTotalData = ():void => {
        
        setLoading(true)
        axiosInterceptor({
            url: "/analytics/get-total-data",
            method: "post",
            data: { 
                    userEmail:selectedUsers?.userEmail ?? "" ,
                    from:fromDate , 
                    to:toDate, 
                    graphData:"N/A" 
                },
        }).then((res) => {
            setTotalData(res?.data ?? null)
        }).catch((err) => {
            toast.error("Something went Wrong")
        })

    }

    const fetchGraphData = (item: graphTabStructure):void => {

        setLoading(true)
        axiosInterceptor({
            url: "/analytics/get-graphical-data",
            method: "post",
            data: { 
                    userEmail:selectedUsers?.userEmail ?? "" ,
                    from:fromDate , 
                    to:toDate, 
                    graphData:item.graphData 
                },
        }).then((res) => {

            const modifiedData:graphDataStructure[] = (res?.data?.map((elem:graphDataStructure)=>{
                return {
                    label: elem.label,
                    frequency: elem.frequency || 0,
                    amount:elem.amount || 0,
                }
            })) ?? []

            setData(modifiedData)

        }).catch((err) => {
            toast.error("Something went Wrong")

        }).finally(()=>{
            setLoading(false)
            setSelectedGraph(item)
        });

    }

    useEffect(()=>{
        
        setLoading(true)
        axiosInterceptor({
            url: "/analytics/get-all-users-filtration",
            method: "get"
        }).then((res) => {
            setUsers(res?.data ?? [])
        }).catch((err) => {
            toast.error("Something went Wrong")
        })
        
        fetchGraphData(selectedGraph)
        fetchTotalData()

    }, [])

    const handleReportChange = (item:graphTabStructure , index:number): void =>{
        fetchGraphData(item)
    }

    const handleSearch = (): void =>{
        fetchGraphData(selectedGraph)
        fetchTotalData()
    }
  
  return (
    <>
    <div className="w-full max-h-screen">
        <div className="px-1 py-2 flex justify-between items-center font-bold text-lg bg-transparent"> 
            <span className="flex items-inline">
              <IoArrowBack
                className="text-2xl me-8 z-10"
                onClick={() => navigate(client.dashboard, { replace: true })}
              />
              <span className="text-xl">Analytics</span>
            </span>
        </div>
    </div>

    <div className="w-full flex justify-around mt-4">
        <div className="w-6/12 px-2">
            <div className="text-lg font-medium charterBlueText">
                From Date
            </div>
            <input
                type="date"
                className="w-full p-2 border rounded-lg shadow-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
            />
        </div>

        <div className="w-6/12 px-2">

            <div className="text-lg font-medium charterBlueText">
                To Date
            </div>
            <input
                type="date"
                className="w-full rounded-lg shadow-md p-2 border bg-white text-gray-700 focus:ring-2 focus:ring-blue-500"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
            />
        </div>
    </div>

    <div className="w-full flex justify-around mt-4">
        <div className="w-6/12 px-2">
            <div className="text-lg font-medium charterBlueText">
                User
            </div>
            
            <DropdownSearch
                key={"SelectUser"}
                options={convertUserArrayIntoSearchStream(users)}
                placeholder={selectedUsers?.userName || "Select User"}
                onSelect={(data)=>{
                    const user:userFiltrationStructure | null = users.filter(elem=>elem.userEmail===data.value)?.[0] ?? null
                    setSelectedUsers(user)
                }}
            />
           
        </div>

        <div className="w-6/12 px-2">

            <div className="text-lg font-medium text-transparent">
                To Date
            </div>
            <button
                className="w-full p-2.5 border rounded-lg shadow-md font-bold text-white focus:ring-2 focus:ring-blue-500 charterBlueBackground"
                onClick={handleSearch}
            >Search</button>
        </div>
    </div>
    
    { Boolean(totalData) && (
        <div className="flex justify-center items-center bg-white rounded-md mt-5">
            <div className="w-1/2 text-center">
                <h2 className="text-lg font-medium text-gray-600">Total Frequency</h2>
                <p className="text-4xl font-bold charterBlueText">{totalData?.frequency ?? ""}</p>
            </div>
            <div className="w-1/2 text-center">
                <h2 className="text-lg font-medium text-gray-600">Total Amount</h2>
                <p className="text-4xl font-bold charterBlueText">{formatNumberWithCommas(totalData?.amount) ?? ""}</p>
            </div>
        </div>
    )}
    
    <div className="w-full flex justify-around mt-4">
        <div className="w-6/12 px-2">
            <div className="text-lg font-medium charterBlueText">
                Graph Type
            </div>
            <select
                className="w-full p-2 border rounded-lg shadow-md  bg-white text-gray-700 focus:ring-2 focus:ring-blue-500"
                value={selectedGraphType}
                onChange={(e) => setSelectedGraphType(e.target.value)}
            >
                {graphTypes.map((option) => (
                <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>

        <div className="w-6/12 px-2">

            <div className="text-lg font-medium charterBlueText">
                Value Type
            </div>
            <select
                className="w-full p-2 border rounded-lg shadow-md bg-white text-gray-700 focus:ring-2 focus:ring-blue-500"
                value={selectedValueType}
                onChange={(e) => setSelectedValueType(e.target.value)}
            >
                {valueTypes.map((option) => (
                <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    </div>
            
    <div className="w-full h-full p-4 mt-4">

        <div className="mb-4 ps-5 w-full flex justify-center border-gray-200 overflow-x-auto">
            {graphs.map((item, index) => (
            <div
                key={index}
                className={`pointers px-4 pt-1.5 pb-2.5 text-md font-medium min-w-max ${
                selectedGraph.graphData === item.graphData
                    ? "bg-white border-t-2 border-x-2"
                    : "border-2 charterBlueBackground text-white"
                }`}
                onClick={() => handleReportChange(item, index)}
            >
                {item.label}
            </div>
            ))}
        </div>

        { loading ? (
            <div className="w-full text-center pt-4">
                <div className="spinner-border spinner-border-xl charterBlueText"></div>
            </div>
        ):(
        <div className="w-full h-full">
            <div className="text-xl font-bold text-center mt-3 mb-5 charterBlueText">{selectedGraph.label} Analytics</div>
            
            {selectedGraphType === "area" && (
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey={selectedValueType} stroke="#1E3A8A" fill="#1E3A8A" />
                    </AreaChart>
                </ResponsiveContainer>
            )}

            {selectedGraphType === "bar" && (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <XAxis dataKey="label" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey={selectedValueType} fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            )}

            
        </div>
        )}
    
    </div>
    </>
  );
};

export default AnalyticalGraphs;
