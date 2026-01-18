import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Sky } from 'three/examples/jsm/Addons.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

const gui = new GUI()
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()
const textureLoader = new THREE.TextureLoader()

const floorAlphaTexture = textureLoader.load('./floor/alpha.webp')
const floorColourTexture = textureLoader.load('./floor/coast-sand-rocks/csr-diff.webp') 
const floorARMTexture = textureLoader.load('./floor/coast-sand-rocks/csr-arm.webp')  
const floorNormalTexture = textureLoader.load('./floor/coast-sand-rocks/csr-nor-gl.webp')  
const floorDisplacementTexture = textureLoader.load('./floor/coast-sand-rocks/csr-disp.webp')  

floorColourTexture.colorSpace = THREE.SRGBColorSpace

floorColourTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

floorColourTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColourTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

const wallColourTexture = textureLoader.load('./wall/castle-brick-broken/cbb-diff.webp')  
const wallARMTexture = textureLoader.load('./wall/castle-brick-broken/cbb-arm.webp') 
const wallNormalTexture = textureLoader.load('./wall/castle-brick-broken/cbb-nor-gl.webp') 

wallColourTexture.colorSpace = THREE.SRGBColorSpace

const roofSlatesColourTexture = textureLoader.load('./roof/roof-slates/roof-slates-diff.webp') 
const roofSlatesARMTexture = textureLoader.load('./roof/roof-slates/roof-slates-arm.webp')  
const roofSlatesNormalTexture = textureLoader.load('./roof/roof-slates/roof-slates-nor-gl.webp') 

roofSlatesColourTexture.colorSpace = THREE.SRGBColorSpace

roofSlatesColourTexture.repeat.set(3, 1)
roofSlatesARMTexture.repeat.set(3, 1)
roofSlatesNormalTexture.repeat.set(3, 1)

roofSlatesColourTexture.wrapS = THREE.RepeatWrapping
roofSlatesARMTexture.wrapS = THREE.RepeatWrapping
roofSlatesNormalTexture.wrapS = THREE.RepeatWrapping

const bushColourTexture = textureLoader.load('./bush/leaves-forest-ground/lfg-diff.webp') 
const bushARMTexture = textureLoader.load('./bush/leaves-forest-ground/lfg-arm.webp')  
const bushNormalTexture = textureLoader.load('./bush/leaves-forest-ground/lfg-nor-gl.webp') 

bushColourTexture.colorSpace = THREE.SRGBColorSpace

bushColourTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColourTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping

const graveColourTexture = textureLoader.load('./grave/plastered-stone-wall/psw-diff.webp') 
const graveARMTexture = textureLoader.load('./grave/plastered-stone-wall/psw-arm.webp') 
const graveNormalTexture = textureLoader.load('./grave/plastered-stone-wall/psw-nor-gl.webp') 

graveColourTexture.colorSpace = THREE.SRGBColorSpace

graveColourTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

const doorAlphaTexture = textureLoader.load('./door/alpha.webp')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.webp')
const doorColourTexture = textureLoader.load('./door/colour.webp') 
const doorHeightTexture = textureLoader.load('./door/height.webp') 
const doorMetalnessTexture = textureLoader.load('./door/metalness.webp') 
const doorNormalTexture = textureLoader.load('./door/normal.webp') 
const doorRoughnessTexture = textureLoader.load('./door/roughness.webp') 

doorColourTexture.colorSpace = THREE.SRGBColorSpace

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColourTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.3,
    displacementBias: -0.2
  })
)

floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('Floor Displacement Scale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('Floor Displacement Bias')

const house = new THREE.Group()
scene.add(house)

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallColourTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    normalMap: wallNormalTexture
  })
)
walls.position.y = 1.25
house.add(walls)

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial({
    map: roofSlatesColourTexture,
    aoMap: roofSlatesARMTexture,
    roughnessMap: roofSlatesARMTexture,
    metalnessMap: roofSlatesARMTexture,
    normalMap: roofSlatesNormalTexture
  })
)
roof.position.y = 2.5 + 0.75
roof.rotation.y = Math.PI * 0.25
house.add(roof)

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial({
    
    map: doorColourTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: - 0.04,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalnessTexture,
    roughnessMap: doorRoughnessTexture
  })
)
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
  color: '#ccffcc',
  map: bushColourTexture,
  aoMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  normalMap: bushNormalTexture
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = - 0.75
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)
bush2.rotation.x = - 0.75
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = - 0.75
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = - 0.75
house.add(bush1, bush2, bush3, bush4)

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
  map: graveColourTexture,
  aoMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  normalMap: graveNormalTexture
})

const graves = new THREE.Group()
scene.add(graves)

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2
  const radius = 3 + Math.random() * 4
  const x = Math.sin(angle) * radius
  const z = Math.cos(angle) * radius

  const grave = new THREE.Mesh(graveGeometry, graveMaterial)
  grave.position.x = x
  grave.position.y = Math.random() * 0.4
  grave.position.z = z
  grave.rotation.x = (Math.random() - 0.5) * 0.4
  grave.rotation.y = (Math.random() - 0.5) * 0.4
  grave.rotation.z = (Math.random() - 0.5) * 0.4
  
  graves.add(grave)
}

const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)

const ghost1 =new THREE.PointLight('#8800ff', 6)
const ghost2 =new THREE.PointLight('#ff0088', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

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

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShaodw = true
walls.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for (const grave of graves.children) {
  grave.castShadow = true
  grave.receiveShadow = true
}

directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = -8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10
ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10
ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10

const sky = new Sky()
sky.scale.set(100, 100, 100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

scene.fog = new THREE.FogExp2('#01343f', 0.1)

const timer = new Timer()
const tick = () => {
  timer.update()
  const elapsedTime = timer.getElapsed()

  const ghost1Angle = elapsedTime * 0.5
  ghost1.position.x = Math.cos(ghost1Angle) * 4
  ghost1.position.z = Math.sin(ghost1Angle) * 4
  ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) *  Math.sin(ghost1Angle * 3.45)  
  const ghost2Angle = -elapsedTime * 0.38
  ghost2.position.x = Math.cos(ghost2Angle) * 5
  ghost2.position.z = Math.sin(ghost2Angle) * 5
  ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) *  Math.sin(ghost2Angle * 3.45)  
  const ghost3Angle = elapsedTime * 0.23
  ghost3.position.x = Math.cos(ghost3Angle) * 6
  ghost3.position.z = Math.sin(ghost3Angle) * 6
  ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) *  Math.sin(ghost3Angle * 3.45)   

  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(tick)
}

tick()