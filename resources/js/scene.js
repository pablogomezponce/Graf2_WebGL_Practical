var renderer;
var scene;
var camera;

function createRenderer() {
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000,1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
}

function createCamera(){
    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1, 1000);
        
    camera.position.x = 15;
    camera.position.y = 16;
    camera.position.z = 13;
    camera.lookAt(scene.position);
    
}

function init() {
    scene = new THREE.Scene();
    createCamera();
    createRenderer();
    current_time = performance.now();

    render();
}

function render() {
    renderer.render(scene,camera);
    requestAnimationFrame(render);
}

init();


