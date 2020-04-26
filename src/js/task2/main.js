
import Scene from './scene'
import Grid from './grid'
import * as dat from 'dat.gui'

export default function(el) {

    const scene = new Scene

    el.appendChild(scene.renderer.domElement)
    scene.updateRendererSize()

    const grid = new Grid
    scene.add(grid)

    const gui = new dat.GUI()
    gui.add(grid.step, 'x', 1, 10, 1).name('Размер клетки X')
    gui.add(grid.step, 'y', 1, 10, 1).name('Размер клетки Y')
    gui.add(grid.step2, 'x', 1, 10, 1).name('Блок клеток Х')
    gui.add(grid.step2, 'y', 1, 10, 1).name('Блок клеток Y')

    gui.domElement.setAttribute('style', 'position: absolute; top: 0; right: 0;')
    el.appendChild(gui.domElement)

    return scene

}
