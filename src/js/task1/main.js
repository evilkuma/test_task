
import Layer from './layer'
import smooth from './smooth'

export default class Drawing {

    constructor(canvas) {

        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.layer = new Layer(this.canvas, this)

        this.history = []
        this.status = -1

        this.updateSize()

        document.body.addEventListener('keyup', (function(e) {

            if(e.keyCode === 90 && e.ctrlKey) {

                if(e.shiftKey) {

                    this.revert()

                } else {
                    
                    this.cancel()

                }

            }

        }).bind(this))

    }

    updateSize() {
        
        this.canvas.setAttribute('width', this.canvas.parentNode.clientWidth)
        this.canvas.setAttribute('height', this.canvas.parentNode.clientHeight)

        this.layer.setSize(
            this.canvas.parentNode.clientWidth,
            this.canvas.parentNode.clientHeight
        )

        this.redraw()

    }

    setPoints(points, save) {

        let commands = points

        if(save) {

            commands = smooth(points)

            this.status++
            if(this.history.length < this.status) {

                this.history.push(commands)

            } else this.history[this.status] = commands

        }
        
        this.ctx.strokeStyle = "#f2a365";
        this.ctx.lineWidth = '6'
        this.ctx.beginPath()

        for(let command of commands) {

            // kill link
            command = [...command]

            switch(command.splice(0, 1)[0]) {

                case 'mt':
                    this.ctx.moveTo(...command)
                    break
                case 'bqt':
                    this.ctx.bezierCurveTo(...command)
                    this.ctx.stroke()
                    break
                case 'lt':
                    this.ctx.lineTo(...command)
                    this.ctx.stroke()
                    break
                default:
                    console.error('udefined command')

            }

        }

    }

    redraw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        
        for(var i = 0; i <= this.status; i++) {

            this.setPoints(this.history[i], false)

        }

    }

    cancel() {
        
        if(this.status > -1) {

            this.status--
            this.redraw()

        }

    }

    revert() {

        if(this.status < (this.history.length-1)) {

            this.status++
            this.redraw()

        }

    }

}
