'use client';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getRecordsFromSheet } from "../api/sheetApi/getDataSheet";
import { Bars } from "react-loader-spinner";
const Dashboard = () => {
    const router = useRouter();
    const [sheetUrl, setSheetUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sheetData, setSheetData] = useState([]);
    const [fuelCost, setFuelCost] = useState(0);
    const [totalKm, setTotalKm] = useState(0);
    const [totalVisits, setTotalVisits] = useState(0);

    useEffect(() => {
        let localStorageSheetUrl = window.localStorage.getItem('sheetUrl');
        if (localStorageSheetUrl) {
            setSheetUrl(localStorageSheetUrl);
        } else {
            router.push('/Dashboard/SheetUrlForm');
        }
        getDataFromSheet(localStorageSheetUrl);
    }, [router]);


    const getDataFromSheet = async (sheetUrl: any) => {
        setIsLoading(true);
        await getRecordsFromSheet(sheetUrl).then((data) => {
            setIsLoading(false);
            let sheetData = data.data;
            setSheetData(sheetData);
            let totalCost = 0;
            let totalKm = 0;
            sheetData.forEach((record: any) => {
                totalCost += record["Total Cost"];
                totalKm += record["Total KM"];
            });
            setFuelCost(totalCost);
            setTotalKm(totalKm);
            setTotalVisits(sheetData.length);
        });
    }

    return (
        <>
            <div className='flex flex-col items-center justify-center'>
                <div className="w-[95%] flex items-center justify-between px-3 py-5 m-2 shadow-md rounded-md">
                    <div>
                        <h1 className="font-medium text-lg my-1">Fuel Cost</h1>
                        <p className="text-sm font-normal">Total fuel cost in current month.</p>
                    </div>
                    <h1 className="text-xl text-[#FF725E] font-semibold">{fuelCost}</h1>
                </div>
                <div className="w-[95%] flex items-center justify-between px-3 py-5 m-2 shadow-md rounded-md">
                    <div>
                        <h1 className="font-medium text-lg my-1">Total KM</h1>
                        <p className="text-sm font-normal">Total km in current month.</p>
                    </div>
                    <h1 className="text-xl text-[#FF725E] font-semibold">{totalKm}</h1>
                </div>
                <div className="w-[95%] flex items-center justify-between px-3 py-5 m-2 shadow-md rounded-md">
                    <div>
                        <h1 className="font-medium text-lg my-1">Total Visits</h1>
                        <p className="text-sm font-normal">Total visits in current month.</p>
                    </div>
                    <h1 className="text-xl text-[#FF725E] font-semibold">{totalVisits}</h1>
                </div>

                <div className="px-3">
                    <button className="bg-[#FF725E] text-white w-full my-3 p-3 rounded-xl"
                        onClick={() => {
                            router.push('/Dashboard/AddRecord');
                        }}>Add Record</button>
                    <button className="bg-[#FF725E] text-white w-full my-3 p-3 rounded-xl"
                        onClick={() => {
                            window.location.href = sheetUrl;
                        }}>Show All Logs In Sheet</button>
                    <button className="bg-[#FF725E] text-white w-full my-3 p-3 rounded-xl"
                        onClick={() => {
                            router.push('/Dashboard/SheetUrlForm');
                        }}>Manage Sheet Url</button>
                </div>
                {
                    isLoading &&
                    <div className="bg-[#FFFFFF70] w-screen h-screen absolute top-0 left-0 flex items-center justify-center">
                        <Bars
                            height="80"
                            width="80"
                            color="#FF725E"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    </div>
                }
            </div>
        </>
    )
}

export default Dashboard;