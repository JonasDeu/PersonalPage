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

function hexagonGenerator() {
	const gridSize = 7
	const hexagons = Array.from(document.getElementsByClassName('hexagon'))
	hexagons.forEach((hex) => {
		hex.classList.remove('activeHex')
	})

	const hexGridYX = []
	while (hexagons.length) hexGridYX.push(hexagons.splice(0, gridSize))
	//Transpose
	const hexGrid = hexGridYX[0].map((x, i) => hexGridYX.map((x) => x[i]))

	function nextHex(hexGrid, hexStartX, hexStartY, visitedHexagons, length) {
		visitedHexagons.push([hexStartX, hexStartY])
		hexGrid[hexStartX][hexStartY].classList.add('activeHex')

		if (length > 0) {
			let neighbourHexagons = []

			if (hexStartY % 2 == 0) {
				neighbourHexagons = [
					[hexStartX - 1, hexStartY - 1],
					[hexStartX, hexStartY - 1],
					[hexStartX - 1, hexStartY],
					[hexStartX + 1, hexStartY],
					[hexStartX - 1, hexStartY + 1],
					[hexStartX, hexStartY + 1],
				]
			} else {
				neighbourHexagons = [
					[hexStartX, hexStartY - 1],
					[hexStartX + 1, hexStartY - 1],
					[hexStartX - 1, hexStartY],
					[hexStartX + 1, hexStartY],
					[hexStartX, hexStartY + 1],
					[hexStartX + 1, hexStartY + 1],
				]
			}

			//remove hexes outside of grid
			let neighbourHexagonsFiltered = [...neighbourHexagons]
			let invalidHexagons = []
			neighbourHexagons.forEach((hex, i) => {
				if (hex[0] < 0 || hex[0] > gridSize - 1 || hex[1] < 0 || hex[1] > gridSize - 1) {
					invalidHexagons.push(i)
				}
			})
			while (invalidHexagons.length) {
				neighbourHexagonsFiltered.splice(invalidHexagons.pop(), 1)
			}

			//pick a non-visited hex
			let startHex = []
			do {
				startHex =
					neighbourHexagonsFiltered[
						Math.floor(Math.random() * neighbourHexagonsFiltered.length)
					]
			} while (
				visitedHexagons.some((hex) => {
					return startHex.every((value, index) => value === hex[index])
				})
			)

			length -= 1
			nextHex(hexGrid, startHex[0], startHex[1], visitedHexagons, length)
		} else {
			return
		}
	}

	nextHex(hexGrid, 3, 3, [], 5)
}

setInterval(() => {
	hexagonGenerator()
}, 1000)
