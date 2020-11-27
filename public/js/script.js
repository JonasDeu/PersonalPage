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
const hexGen = new HexagonGenerator(
	7,
	document.getElementsByClassName('hexagon-container')[0],
	document.getElementsByClassName('hexagon')
)
