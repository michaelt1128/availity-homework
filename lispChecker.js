function lispChecker(input) {
	if (input == null || typeof input !== 'string') {
		return false;
	}
	let count = 0;
	const chars = input.split('');
	for (let i = 0; i < chars.length; i++) {
		if (chars[i] === '(') count++;
		if (chars[i] === ')') count--;
		if (count < 0) {
			return false;
		}
	}
	if (count != 0) {
		return false;
	}
	return true;
}

const input = '(lambda () "Hello World")';
console.log(lispChecker(input));

module.exports = lispChecker;