class GoL {
	constructor(cellSize, color, decay, fps, gridWidth, gridHeight, gridMargin, ctx) {
		this.cellSize = cellSize
		this.gridHeight = Math.floor(gridHeight / this.cellSize)
		this.gridWidth = Math.floor(gridWidth / this.cellSize)
		this.gridMargin = gridMargin
		this.color = color
		this.decay = decay //min 0.1
		this.fps = fps

		this.ctx = ctx
		this.ctx.canvas.width = gridWidth
		this.ctx.canvas.height = gridHeight

		this.theGrid = this.createArray(this.gridWidth)
		this.mirrorGrid = this.createArray(this.gridWidth)

		this.initRandom()
	}

	main = () => {
		this.draw()
		this.update()

		setTimeout(() => {
			requestAnimationFrame(this.main)
		}, 1000 / this.fps)
	}

	createArray = (gridWidth) => {
		let arr = []
		for (let i = 0; i < this.gridWidth; i++) {
			arr[i] = []
		}
		return arr
	}

	initRandom = () => {
		for (let j = this.gridMargin; j < this.gridWidth - this.gridMargin; j++) {
			for (let k = this.gridMargin; k < this.gridHeight - this.gridMargin; k++) {
				this.theGrid[j][k] = Math.round(Math.random())
			}
		}
	}

	draw = () => {
		this.ctx.clearRect(0, 0, this.gridWidth * this.cellSize, this.gridHeight * this.cellSize)
		for (let j = 1; j < this.gridHeight; j++) {
			for (let k = 1; k < this.gridWidth; k++) {
				if (this.theGrid[k][j] > 0) {
					this.ctx.fillStyle =
						this.color + Math.floor(this.theGrid[k][j] * 255).toString(16)
					this.ctx.beginPath()
					this.ctx.arc(
						k * this.cellSize,
						j * this.cellSize,
						this.cellSize / 2 - 1,
						0,
						2 * Math.PI,
						false
					)
					this.ctx.fill()
				}
			}
		}
	}

	update = () => {
		for (let j = 1; j < this.gridHeight - 1; j++) {
			for (let k = 1; k < this.gridWidth - 1; k++) {
				let totalCells = 0
				totalCells += this.theGrid[k - 1][j - 1]
					? Math.floor(this.theGrid[k - 1][j - 1])
					: 0
				totalCells += this.theGrid[k - 1][j] ? Math.floor(this.theGrid[k - 1][j]) : 0
				totalCells += this.theGrid[k - 1][j + 1]
					? Math.floor(this.theGrid[k - 1][j + 1])
					: 0
				totalCells += this.theGrid[k][j - 1] ? Math.floor(this.theGrid[k][j - 1]) : 0
				totalCells += this.theGrid[k][j + 1] ? Math.floor(this.theGrid[k][j + 1]) : 0
				totalCells += this.theGrid[k + 1][j - 1]
					? Math.floor(this.theGrid[k + 1][j - 1])
					: 0
				totalCells += this.theGrid[k + 1][j] ? Math.floor(this.theGrid[k + 1][j]) : 0
				totalCells += this.theGrid[k + 1][j + 1]
					? Math.floor(this.theGrid[k + 1][j + 1])
					: 0

				switch (Math.round(totalCells)) {
					case 2:
						if (this.theGrid[k][j] < 1) {
							let decayedCell = this.theGrid[k][j] - this.decay
							decayedCell <= 0
								? (this.mirrorGrid[k][j] = 0)
								: (this.mirrorGrid[k][j] = decayedCell)
						} else {
							this.mirrorGrid[k][j] = this.theGrid[k][j]
						}

						break
					case 3:
						this.mirrorGrid[k][j] = 1

						break
					default:
						let decayedCell = this.theGrid[k][j] - this.decay
						decayedCell <= 0
							? (this.mirrorGrid[k][j] = 0)
							: (this.mirrorGrid[k][j] = decayedCell)
				}
			}
		}

		//mirror edges
		for (let l = 1; l < this.gridWidth - 1; l++) {
			//vertical
			this.mirrorGrid[l][0] = this.mirrorGrid[l][this.gridHeight - 3]
			this.mirrorGrid[l][this.gridHeight - 2] = this.mirrorGrid[l][1]
			//horizontal
			this.mirrorGrid[0][l] = this.mirrorGrid[this.gridWidth - 3][l]
			this.mirrorGrid[this.gridWidth - 2][l] = this.mirrorGrid[1][l]
		}

		let temp = this.theGrid
		this.theGrid = this.mirrorGrid
		this.mirrorGrid = temp
	}
}
