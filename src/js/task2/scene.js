
import * as THREE from 'three'
import OrbitControls from './OrbitControls'

export default class Scene extends THREE.Scene {

    constructor() {
        
        super()

        this.background = new THREE.Color(0x222222)
        this.camera = new THREE.PerspectiveCamera( 45, 1, 1, 100000 )
        this.camera.position.set(0, 100, 0)
        this.camera.lookAt(this.position)
        this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        new OrbitControls(this.camera, this.renderer.domElement)

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
            const aspect = width/height

            this.renderer.setSize(width, height)

            this.camera.aspect = aspect
            this.camera.updateProjectionMatrix()

        }      

    }

}
