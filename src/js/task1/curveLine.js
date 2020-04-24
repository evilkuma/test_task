
import * as THREE from 'three'

const vertexShader = `
uniform float subdivisions;
uniform float thickness;
uniform vec2 start;
uniform vec2 end;
uniform vec2 c0;
uniform vec2 c1;
varying vec2 vCoord;

#define PI 3.14

vec3 sample (float t) {
  float volume = 1.0;

  float tn = 1.0 - t;

  return vec3(tn * tn * tn * start + 3.0 * tn * tn * t * c0 + 3.0 * tn * t * t * c1 + t * t * t * end, volume);
}

void main () {
  // Get the "arc length" in 0..1 space
  float arclen = (position.x * 0.5 + 0.5);

  // How far to offset the line thickness for this vertex in -1..1 space
  float extrusion = position.y;

  // Find next sample along curve
  float nextArclen = arclen + (1.0 / subdivisions);

  // Sample the curve in two places
  // XY is the 2D position, and the Z component is the thickness at that vertex
  vec3 current = sample(arclen);
  vec3 next = sample(nextArclen);

  // Now find the 2D perpendicular to form our line segment
  vec2 direction = normalize(next.xy - current.xy);
  vec2 perpendicular = vec2(-direction.y, direction.x);

  // Extrude
  float computedExtrusion = extrusion * (thickness / 2.0) * current.z;
  vec3 offset = current.xyz + vec3(perpendicular.xy, 0.0) * computedExtrusion;

  // Compute final position
  gl_Position = projectionMatrix * modelViewMatrix * vec4(offset.xyz, 1.0);

  // Pass along the coordinates for texturing/effects
  vCoord = position.xy;
}
`
const fragmentShader = `
void main () {
  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
}
`

export default class CubicBezierCurve extends THREE.Mesh {

    constructor() {

        super(
            new THREE.PlaneGeometry(2, 2, 64, 1),
            new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                side: THREE.BackSide,
                extensions: { derivatives: true },
                uniforms: {
                    subdivisions: { value: 64 },
                    start: { value: new THREE.Vector2 },
                    end: { value: new THREE.Vector2 },
                    c0: { value: new THREE.Vector2 },
                    c1: { value: new THREE.Vector2 },
                    thickness: { value: 0.0025 }
                }
            })
        )

        this.rotation.x = Math.PI/2

    }

    get start() {
        return this.material.uniforms.start.value
    }
    get end() {
        return this.material.uniforms.end.value
    }
    get c0() {
        return this.material.uniforms.c0.value
    }
    get c1() {
        return this.material.uniforms.c1.value
    }

}
