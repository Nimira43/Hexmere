import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { Timer } from 'three'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

const gui = new GUI()
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshStandardMaterial({
    roughness: 0.7
  })
)
scene.add(sphere)

const ambientLight = new THREE.AmbientLight('#ffffff, 0.5')
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true