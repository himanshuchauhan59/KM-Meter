'use client';
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { addRecordSheet } from "@/app/api/sheetApi/addRecordToSheet";
import Swal from 'sweetalert2'
import { Bars } from "react-loader-spinner";
const SheetUrlForm = () => {
    const router = useRouter();
    let [placeName, setPlaceName] = useState("");
    let [placeLocation, setPlaceLocation] = useState("");
    let [date, setDate] = useState("");
    let [time, setTime] = useState("");
    let [startingPoint, setStartingPoint] = useState("");
    let [destination, setDestination] = useState("");
    let [petrolPrice, setPetrolPrice] = useState("");
    let [vehicleAvg, setVehicleAvg] = useState("");
    let [isLoading, setIsLoading] = useState(false);
    let sheetUrl = useRef("");

    useEffect(() => {
        sheetUrl.current = window.localStorage.getItem("sheetUrl") || "";
        let recordsInLocalStorage: any = window.localStorage.getItem("records") || null;
        recordsInLocalStorage = JSON.parse(recordsInLocalStorage);
        if (recordsInLocalStorage !== null) {
            setPlaceName(recordsInLocalStorage.placeName);
            setPlaceLocation(recordsInLocalStorage.placeLocation);
            setDate(recordsInLocalStorage.date);
            setTime(recordsInLocalStorage.time);
            setStartingPoint(recordsInLocalStorage.startingPoint);
            setDestination(recordsInLocalStorage.destination);
            setPetrolPrice(recordsInLocalStorage.petrolPrice);
            setVehicleAvg(recordsInLocalStorage.vehicleAvg);
        }
    }, []);

    const handleSheetData = async () => {
        let data = {
            placeName: placeName,
            placeLocation: placeLocation,
            date: date,
            time: time,
            startingPoint: startingPoint,
            destination: destination,
            petrolPrice: petrolPrice,
            vehicleAvg: vehicleAvg
        };
        setIsLoading(true);
        let response = await addRecordSheet(sheetUrl.current, data);
        if (response["success"]) {
            setIsLoading(false);
            Swal.fire({
                icon: "success",
                title: "Data Added Successfully",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.localStorage.removeItem("records");
                router.push('/Dashboard');
            })
        } else {
            setIsLoading(false);
            Swal.fire({
                icon: "error",
                title: "Try Again!",
                text: response["message"]
            });
        }
    }

    const saveDataInLocalStorage = async () => {
        let data: any = {
            placeName: placeName,
            placeLocation: placeLocation,
            date: date,
            time: time,
            startingPoint: startingPoint,
            destination: destination,
            petrolPrice: petrolPrice,
            vehicleAvg: vehicleAvg
        }
        window.localStorage.setItem("records", JSON.stringify(data))
        Swal.fire({
            icon: "success",
            title: "Data Saved Locally",
            showConfirmButton: false,
            timer: 1500
        })
    }

    return (
        <div className='flex flex-col items-center justify-center'>
            <div className="w-full max-w-[400px]">
                <form onSubmit={(e) => {
                    e.preventDefault();
                }} className="flex flex-col items-center justify-center px-2">
                    <input type='text'
                        placeholder="Place Name"
                        onChange={(e) => setPlaceName(e.target.value)}
                        defaultValue={placeName}
                        className="w-full border border-[#FF725E] my-2 rounded-[5px] p-2 text-sm" />

                    <textarea name="placeLocation" id="placeLocation" placeholder="Place Location" rows={4}
                        onChange={(e) => setPlaceLocation(e.target.value)}
                        defaultValue={placeLocation}
                        className="w-full border border-[#FF725E] my-2 rounded-[5px] p-2 text-sm"></textarea>

                    <input type='date'
                        onChange={(e) => setDate(e.target.value)}
                        defaultValue={date}
                        className="w-full border border-[#FF725E] my-2 rounded-[5px] p-2 text-sm" />

                    <input type='time'
                        onChange={(e) => setTime(e.target.value)}
                        defaultValue={time}
                        className="w-full border border-[#FF725E] my-2 rounded-[5px] p-2 text-sm" />

                    <input type='number'
                        placeholder="Starting Point KM"
                        onChange={(e) => setStartingPoint(e.target.value)}
                        defaultValue={startingPoint}
                        className="w-full border border-[#FF725E] my-2 rounded-[5px] p-2 text-sm" />

                    <input type='number'
                        placeholder="Destination KM"
                        onChange={(e) => setDestination(e.target.value)}
                        defaultValue={destination}
                        className="w-full border border-[#FF725E] my-2 rounded-[5px] p-2 text-sm" />

                    <input type='number'
                        placeholder="Current Petrol Price"
                        onChange={(e) => setPetrolPrice(e.target.value)}
                        defaultValue={petrolPrice}
                        className="w-full border border-[#FF725E] my-2 rounded-[5px] p-2 text-sm" />

                    <input type='number'
                        placeholder="Vehicle Avg"
                        onChange={(e) => setVehicleAvg(e.target.value)}
                        defaultValue={vehicleAvg}
                        className="w-full border border-[#FF725E] my-2 rounded-[5px] p-2 text-sm" />

                    <div className="flex items-center justify-between w-full">
                        <button type='submit' className="bg-white text-[#FF725E] border border-[#FF725E] focus:bg-[#FF725E] focus:text-white w-1/2 my-4 mr-1 p-2 rounded-xl"
                            onClick={() => saveDataInLocalStorage()}>Save Locally</button>
                        <button type='submit' className="bg-[#FF725E] text-white w-1/2 my-4 ml-1 p-2 rounded-xl" onClick={() => { handleSheetData() }}>Add To Sheet</button>
                    </div>

                    <a className="text-sm underline my-2" onClick={() => {
                        router.push('/Dashboard');
                    }}>Back To Dashboard</a>

                </form>
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
    )
}

export default SheetUrlForm;