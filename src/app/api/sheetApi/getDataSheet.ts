const sheetName = "KM-Master";
const api: any = process.env.SHEET_API || 'https://script.google.com/macros/s/AKfycbzKmJZr3b3Z4MiMK3KUOwUuMRCoKUP3lmxLgJej5VXLDCOGLMRq1ZNtyQDiZi2-ft3yCA/exec';
const getRecordsFromSheet = async (sheetUrl: any) => {
    try {
        const sheetData = {
            sheetUrl,
            sheetName,
            type: "getAllData"
        };
        let res = fetch(api, {
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
        console.log("ERROR GETTING DATA FROM SHEET", error);
    }
}
export { getRecordsFromSheet };