const fs = require('fs');

function generateCuData(startDate, endDate, oneDay) {
	let data = [];
	let cu_base = Math.random() * 400;

	for (let date = new Date(startDate); date <= new Date(endDate); date = new Date(date.getTime() + oneDay)) {
		let dateStr = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-');
		cu_base = Math.round((Math.random() - 0.5) * 20 + cu_base);
		cu_base <= 0 && (cu_base = Math.random() * 300);
		data.push([dateStr, cu_base]);
	}

	return data;
}

function generateCuFctData(startDate, endDate, oneDay) {
	let data = [];
	let cu_forecast = Math.random() * 300;

	for (let date = new Date(startDate); date <= new Date(endDate); date = new Date(date.getTime() + oneDay)) {
		let dayStr2 = [date.getFullYear() + 3, date.getMonth() + 1, date.getDate()].join('-');
		cu_forecast = Math.round((Math.random() - 0.5) * 20 + cu_forecast);
		cu_forecast <= 0 && (cu_forecast = Math.random() * 200);
		data.push([dayStr2, cu_forecast]);
	}

	return data;
}

function generateCuRanData(startDate, endDate, oneDay) {
	let data = [];
	let cu_range_base = Math.random() * 300;

	for (let date = new Date(startDate); date <= new Date(endDate); date = new Date(date.getTime() + oneDay)) {
		let dayStr2 = [date.getFullYear() + 3, date.getMonth() + 1, date.getDate()].join('-');
		let cu_range = Math.round((Math.random() - 3) * 20 + cu_range_base);
		cu_range <= 0 && (cu_range = Math.random() * 200);
		data.push([dayStr2, cu_range]);
	}

	return data;
}
function saveObjectAsJson(exportObj, exportName) {
	fs.writeFile(`${exportName}.json`, JSON.stringify(exportObj, null, 2), 'utf8', (err) => {
		if (err) {
			console.error('An error occurred:', err);
			return;
		}
		console.log('Data saved to file:', `${exportName}.json`);
	});
}

// Example usage:
let oneDay = 24 * 3600 * 1000; // milliseconds in one day
let cuData = generateCuData("2021-02-01", "2024-02-02", oneDay);
let cuFctData = generateCuFctData("2021-02-01", "2024-02-02", oneDay);
let cuRanData = generateCuRanData("2021-02-01", "2024-02-02", oneDay);

// Combine the generated data
let combinedData = { cu: cuData, cuFct: cuFctData, cuRan: cuRanData };
// Save the combined data to a JSON file
saveObjectAsJson(combinedData, 'data');
