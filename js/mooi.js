///////////////////////////////////////////////////----START-SCRIPT----//////////////////////////////////////////////////
var button = document.querySelector('button');
window.ImageBitmap = window.ImageBitmap || function () {
    return null
}
var geel = document.querySelector('body ul li');

var modelSrc = 'models/f500-man-tshirt';
var situatie = 1;
// de model veravngen
button.addEventListener('click', function changeSrc() {
    if (modelSrc == 'models/f500-man-tshirt') {
        scene.remove(tshirt);
        modelSrc = modelSrc + '1';
        loader.load(modelSrc + '.glb', handle_load);
        situatie = 2;
        return situatie;
    } else {
        scene.remove(tshirt);
        modelSrc = 'models/f500-man-tshirt';
        loader.load(modelSrc + '.glb', handle_load);
        situatie = 2;
        return situatie;
    }
});

// scene en camera en renderer maken 
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 15;

var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setClearColor('#e5e5e5');
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

//responsief canvas maken
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

//control opties  
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactore = 0.25;
controls.enableZoom = false;

// texture toevoegen 
var textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load('models/nike-logo-x.jpg');
texture.flipY = false;
texture.offset.x = 0.1; // 0.0 - 1.0
texture.offset.y = 0.1; // 0.0 - 1.0
texture.repeat.set(0.7, 0.7);

//licht toevoegen
var light = new THREE.PointLight(0xFFFFFF, 2, 1000);
light.position.set(10, 0, 25);
scene.add(light);

// 3d model laten loaden  
var loader = new THREE.GLTFLoader();
var tshirt;
loader.load(modelSrc + '.glb', handle_load);

function handle_load(gltf) {
    tshirt = gltf.scene;
    tshirt.traverse((o) => {
        if (o.isMesh) {
            // note: for a multi-material mesh, `o.material` may be an array,
            // in which case you'd need to set `.map` on each value.
            o.material.map = texture;
        }
    });
    scene.add(tshirt);

    if (situatie == 1) {
        render();
    }
}

// de model laten draaien
var render = function () {
    requestAnimationFrame(render);

    tshirt.rotation.y += 0.01;

    renderer.render(scene, camera);
}

//de kleur of iets anders veranderen als je op de object zelf iets doet bv mousemove click etc...

// var raycaster = new THREE.Raycaster();
// var mouse = new THREE.Vector2();

// function omMouseDown(event) {
//     event.preventDefault();
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     raycaster.setFromCamera(mouse, camera);

//     var intersects = raycaster.intersectObjects(scene.children, true);
//     for (var i = 0; i < intersects.length; i++) {
//         intersects[i].object[0].material.color.set(0xffcc00);
//     }
// }
// window.addEventListener('click', omMouseDown);

//kleur veranderen
function color(event) {
    tshirt.children[0].children[0].material.color.set(0xffcc00);
}
geel.addEventListener('click', color);