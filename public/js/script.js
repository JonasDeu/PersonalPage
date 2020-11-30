//Display
const url = 'https://jonasdeuchler.me/display'
document.getElementById('sendButton').addEventListener('click', displayMsg)

function displayMsg() {
	fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			msg: document.getElementById('displayMsgInput').value,
		}),
	})

	alert('Thanks for your message!')

	document.getElementById('displayMsgInput').value = ''
}

//HexagonGenerator
/*
const hexGen = new HexagonGenerator(
	7,
	document.getElementsByClassName('hexagon-container')[0],
	document.getElementsByClassName('hexagon')
)
*/

const cellSize = 7

const gol1 = new GoL(
	cellSize,
	'#bbbbbf',
	0.2,
	8,
	Math.floor(300),
	Math.floor(80),
	1,
	document.getElementById('golCanvas1').getContext('2d')
)

gol1.main()

const gol2 = new GoL(
	cellSize,
	'#bbbbbf',
	0.2,
	8,
	Math.floor(300),
	Math.floor(80),
	1,
	document.getElementById('golCanvas2').getContext('2d')
)

gol2.main()
