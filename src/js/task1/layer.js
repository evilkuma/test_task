
export default class Layer {

    constructor(canvas, parent) {

        this.el = document.createElement('canvas')
        this.el.setAttribute('style', 'position: absolute; left: 0; top: 0;')
        this.ctx = this.el.getContext('2d')

        canvas.parentNode.appendChild(this.el)

        this.enabled = true

        var points = []
        var isDraw = false

        this.el.addEventListener('mousedown', (function(e) {

            isDraw = true
            points.push([e.layerX, e.layerY])
            this.ctx.strokeStyle = "#f2a365";
            this.ctx.lineWidth = '6'
            this.ctx.beginPath()
            this.ctx.moveTo(e.layerX, e.layerY)

        }).bind(this), false)

        this.el.addEventListener('mousemove', (function(e) {

            if(isDraw) {

                points.push([e.layerX, e.layerY])
                this.ctx.lineTo(e.layerX, e.layerY)
                this.ctx.stroke()
    
            }

        }).bind(this), false)

        const endDraw = (function() {

            if(!isDraw) return

            isDraw = false
            parent.setPoints(points, true)
            points.splice(0)
            this.ctx.clearRect(0, 0, this.el.width, this.el.height)

        }).bind(this)

        this.el.addEventListener('mouseup', endDraw, false)

        this.el.addEventListener('mouseout', endDraw, false)

    }

    setSize(width, height) {

        this.el.setAttribute('width', width)
        this.el.setAttribute('height', height)

    }

}
