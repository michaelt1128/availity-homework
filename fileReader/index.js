const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const stringify = require('csv-stringify');

const records = parse(fs.readFileSync(process.cwd() + '/Book1.csv').toString());
// 0 : id
// 1 : name
// 2 : version
// 3 : insurance company
const carriers = {};
records.forEach(record => {
	try {
		if (carriers[record[3]]) {
			// search for duplicate ids
			let index = carriers[record[3]].findIndex(v => v[0] === record[0]);
			if (index != -1) {
				// compare version with existing record
				if (record[2] > carriers[record[3]][index][2]) {
					carriers[record[3]].splice(index, 1);
					carriers[record[3]].push(record);
				} else {
				}
			} else {
				carriers[record[3]].push(record);
			}
		} else {
			carriers[record[3]] = [record];
		}
	} catch (e) {
		// ignore bad rows
	}
});
// sort by name
Object.keys(carriers).forEach(key => {
	carriers[key].sort((a, b) => a[1].localeCompare(b[1]));
});

// Write output to separate files
Object.keys(carriers).forEach(key => {
  fs.writeFileSync(process.cwd() + `/output/${key}.csv`, carriers[key].map(m=>m.join(',')).join('\n'), { flag: 'w' })
});