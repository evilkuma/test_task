
import * as THREE from 'three'

var uniforms = () => ({
	// размер клетки
	step: { value: new THREE.Vector2(5.0, 5.0) },
	// количество клеток до доп отметки
	step2: { value: new THREE.Vector2(5.0, 5.0) },
	// толщина линии
	lw: { value: new THREE.Vector2(.2, .2) },
})

var vertexShader = `
varying vec3 vertex;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  vertex = position;
}
`
var fragmentShader = `
precision highp float;

uniform vec2 step;
uniform vec2 step2;
uniform vec2 lw;

varying vec3 vertex;

void main() {

	gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);

	vec2 minK = lw/2.0;
	vec2 m = step + minK;
	vec2 maxK = m - minK;

	vec2 k = mod(vertex.xy, m);

  	// oX line
  	if( vertex.x > -minK.x && vertex.x < minK.x ) {

		gl_FragColor = vec4(0.0, 1.0, 0.0, 0.5);

		return;

  	}

  	// oy line
  	if(vertex.y > -minK.y && vertex.y < minK.y) {

		gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);

		return;

  	} 

  	// xy lines
  	for(int i = 0; i < 2; i++)
	  	if(k[i] < minK[i] || k[i] > maxK[i]) {

			float c = floor(vertex[i]/m[i] + minK[i]);

			if(mod(c, step2[i]) == 0.0) {
	  			gl_FragColor = vec4(0.6, 0.6, 0.6, 0.5);
	  			return;
			} else {
	  			gl_FragColor = vec4(0.2, 0.2, 0.2, 0.5);
			}
		
	  	}


}
`

export default class Grid extends THREE.Mesh {

    constructor(width = 500, height = 500) {

        super(
            new THREE.PlaneGeometry(width, height),
            new THREE.ShaderMaterial({
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                uniforms: uniforms(),
                side: THREE.BackSide,
                transparent: true
            })
        )

        this.rotation.x = Math.PI/2

    }

    get step() {
        return this.material.uniforms.step.value
    }
    get step2() {
        return this.material.uniforms.step2.value
    }
    get lw() {
        return this.material.uniforms.lw.value
    }

}
