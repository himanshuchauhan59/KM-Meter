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
const type = "insertSubSheet";
const sheetName = "KM-Master";
const api: any = process.env.SHEET_API || 'https://script.google.com/macros/s/AKfycbzKmJZr3b3Z4MiMK3KUOwUuMRCoKUP3lmxLgJej5VXLDCOGLMRq1ZNtyQDiZi2-ft3yCA/exec';

const createSheetApi = async (sheetUrl: any) => {
    try {
        const sheetData = {
            sheetUrl,
            sheetName,
            headers,
            type
        };
        let res =  fetch(api, {
            redirect: 'follow',
            method: 'POST',
            body: JSON.stringify(sheetData),
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            },
        });
        let data = (await res).json();
        return data;
    } catch (error) {
        console.log("ERROR WHILE CREATING SHEET", error);
    }
}

export { createSheetApi };