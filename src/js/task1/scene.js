
import * as THREE from 'three'

export default class Scene extends THREE.Scene {

    constructor() {
        
        super()

        this.background = new THREE.Color(0x222222)
        this.camera = new THREE.OrthographicCamera( 2 / - 2, 2 / 2, 2 / 2, 2 / - 2, 1, 10 )
        this.camera.position.set(0, 1, 0)
        this.camera.lookAt(this.position)
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

        var animate = (function() {

            requestAnimationFrame( animate )
        
            this.renderer.render( this, this.camera );
    
        }).bind(this)
      
        animate()

    }

    updateRendererSize() {

        if(!this.renderer.domElement.parentElement) {

            console.error('cant calc size without parent dom element')
            return
    
        }

        if(this.camera) {

            const parentElement = this.renderer.domElement.parentElement
            const width = parentElement.clientWidth
            const height = parentElement.clientHeight

            // размеры камеры о обьектов указываем в нормализированов виде, 
            // потому не менеям параметры камеры при изменении размера канваса
            this.renderer.setSize(width, height)
            this.camera.updateProjectionMatrix()

        }      

    }

}
