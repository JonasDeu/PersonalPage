class HexagonGenerator {
	constructor(gridSize, hexagonContainer, hexagons) {
		this.gridSize = gridSize
		this.hexagonContainer = hexagonContainer
		this.hexagons = [...hexagons]
		this.hexagonsCopy = [...hexagons]
		this.hexHeight = this.hexagonContainer.offsetHeight / this.gridSize
		this.hexWidth = this.hexagonContainer.offsetWidth / this.gridSize
		this.hexGridXY = []

		while (this.hexagonsCopy.length)
			this.hexGridXY.push(this.hexagonsCopy.splice(0, this.gridSize))
		//Transpose
		this.hexGrid = this.hexGridXY[0].map((x, i) => this.hexGridXY.map((x) => x[i]))

		this.generate()
	}

	generate() {
		this.main()

		setInterval(() => {
			this.main()
		}, 1000)
	}

	main() {
		this.hexagons.forEach((hex) => {
			hex.classList.remove('activeHex')
		})

		//this.moveHexContainer()

		this.nextHex(this.hexGrid, 3, 3, [], 6)
	}

	nextHex(hexGrid, hexStartX, hexStartY, visitedHexagons, length) {
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
				if (
					hex[0] < 0 ||
					hex[0] > this.gridSize - 1 ||
					hex[1] < 0 ||
					hex[1] > this.gridSize - 1
				) {
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
			this.nextHex(hexGrid, startHex[0], startHex[1], visitedHexagons, length)
		} else {
			return
		}
	}

	moveHexContainer = () => {
		this.hexagonContainer.style.left =
			Math.floor(
				Math.floor(
					Math.random() * (window.innerWidth - this.hexagonContainer.offsetWidth + 1)
				) / this.hexWidth
			) *
				this.hexWidth +
			'px'

		this.hexagonContainer.style.top =
			Math.floor(
				Math.floor(
					Math.random() * (window.innerHeight - this.hexagonContainer.offsetHeight + 1)
				) /
					(this.hexHeight * 2)
			) *
				(this.hexHeight * 2) +
			'px'
	}
}
