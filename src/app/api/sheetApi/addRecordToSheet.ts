const headers = [
    "Place Name",
    "Place Location",
    "Date",
    "Starting Point KM",
    "Destination KM",
    "Total KM",
    "Current Petrol Price",
    "Vehicle Avg",
    "Total Cost"
];
const type = "insertRecord";
const sheetName = "KM-Master";
const api: any = process.env.SHEET_API || 'https://script.google.com/macros/s/AKfycbzKmJZr3b3Z4MiMK3KUOwUuMRCoKUP3lmxLgJej5VXLDCOGLMRq1ZNtyQDiZi2-ft3yCA/exec';

const addRecordSheet = async (sheetUrl: any, data: any) => {
    let totalKM = data.destination - data.startingPoint;
    let totalCost: any = (totalKM / data.vehicleAvg) * data.petrolPrice;
    const sheetData = {
        sheetUrl,
        sheetName,
        headers,
        type,
        values: [
            [
                data.placeName,
                data.placeLocation,
                `${data.date} ${data.time}`,
                parseInt(data.startingPoint),
                parseInt(data.destination),
                totalKM,
                parseInt(data.petrolPrice),
                parseInt(data.vehicleAvg),
                parseFloat(totalCost).toFixed(2)
            ]
        ]
    };
    console.log("SHEET DATA", JSON.stringify(sheetData))
    try {
        let res = await fetch(api, {
            redirect: 'follow',
            method: 'POST',
            body: JSON.stringify(sheetData),
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
        });
        let data = await res.json();
        return data;
    } catch (error) {
        console.log("ERROR WHILE CREATING SHEET", error);
    }
}

export { addRecordSheet };