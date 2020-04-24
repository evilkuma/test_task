
import Layer from './layer'
import smooth from './smooth'
import Scene from './scene'
//import { Group } from 'three'
import Curve from './curveLine'

export default class Drawing {

    constructor(el) {

        this.scene = new Scene()
        el.appendChild(this.scene.renderer.domElement)
        this.scene.renderer.domElement.setAttribute('style', 'position: absolute; left: 0; top: 0;')
            window.scene = this.scene
        this.history = []
        this.status = -1

        this.updateSize()

        let isDraw = false
        let lines = []//new Group

        const endDraw = (function() {

            if(!isDraw) return

            isDraw = false
            this.normalizeLines(lines)
            lines.splice(0)//= new Group

        }).bind(this)

        const normalizePos = (x, y) => [
            ( x/this.scene.renderer.domElement.width ) * 2 - 1,
            -(-( y/this.scene.renderer.domElement.height ) * 2 + 1)
        ]

        this.scene.renderer.domElement.addEventListener('mousedown', (function(e) {

            isDraw = true

            let pos = normalizePos(e.layerX, e.layerY)

            let line = new Curve
            line.c0.set(...pos)
            line.c1.set(...pos)
            line.start.set(...pos)
            line.end.set(...pos)
            lines.push(line)

            this.scene.add(line)

        }).bind(this), false)
        this.scene.renderer.domElement.addEventListener('mousemove', (function(e) {

            if(!isDraw) return

            var pos = normalizePos(e.layerX, e.layerY)
            if(
                lines.length === 1 && 
                lines[0].end.equals(lines[0].start)
            ) {

                lines[0].end.set(...pos)

            } else {

                let line = new Curve
                line.c0.set(...pos)
                line.c1.set(...pos)
                line.start.copy(
                    lines[lines.length - 1].end
                )
                line.end.set(...pos)
                lines.push(line)

                this.scene.add(line)

            }


        }).bind(this), false)
        this.scene.renderer.domElement.addEventListener('mouseup', endDraw, false)
        this.scene.renderer.domElement.addEventListener('mouseup', endDraw, false)

        // document.body.addEventListener('keyup', (function(e) {

        //     if(e.keyCode === 90 && e.ctrlKey) {

        //         if(e.shiftKey) {

        //             this.revert()

        //         } else {
                    
        //             this.cancel()

        //         }

        //     }

        // }).bind(this))

    }

    updateSize() {
        
        this.scene.updateRendererSize()

    }

    normalizeLines(lines) {

        const points = lines.map( line => line.start.toArray() )
        points.push( lines[lines.length - 1].end.toArray() )

        const commands = smooth(points)

        let i = 0
        for( ; i < commands.length; i++) {

            var command = commands[i]

            switch(command.splice(0, 1)[0]) {

                case 'mt':
                    lines[i].start.set(...command)
                    lines[i].c0.set(...command)
                    lines[i].c1.set(...command)
                    lines[i].end.set(commands[i+1][1], commands[i+1][2])
                    break
                case 'bqt':
                    var precommand = commands[i-1]
                    lines[i].start.set(
                        precommand[precommand.length - 2], 
                        precommand[precommand.length - 1]
                    )
                    lines[i].c0.set(command[0], command[1])
                    lines[i].c1.set(command[2], command[3])
                    lines[i].end.set(command[4], command[5])
                    break
                case 'lt':
                    var precommand = commands[i-1]
                    lines[i].end.set(...command)
                    lines[i].c0.set(...command)
                    lines[i].c1.set(...command)
                    lines[i].start.set(
                        precommand[precommand.length - 2], 
                        precommand[precommand.length - 1]
                    )
                    break
                default:
                    console.error('udefined command')

            }

        }

        for( ; i < lines.length; i++) {

            lines[i].parent.remove(lines[i])

        }

    }

    redraw() {

        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        
        // for(var i = 0; i <= this.status; i++) {

        //     this.setPoints(this.history[i], false)

        // }

    }

    cancel() {
        
        // if(this.status > -1) {

        //     this.status--
        //     this.redraw()

        // }

    }

    revert() {

        // if(this.status < (this.history.length-1)) {

        //     this.status++
        //     this.redraw()

        // }

    }

}
