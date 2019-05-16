var renderer;
var scene;
var model;
var camera;

var cameraControl;

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
        
    camera.position.x = 0.00046926030096069483;
    camera.position.y = 469.3340579543901;
    camera.position.z = 0;
    camera.lookAt(scene.position);
    
    cameraControl = new THREE.OrbitControls(camera);
}

function init() {
    scene = new THREE.Scene();
    
    createCamera();
    createRenderer();
    
    createPlane();

    createLight();
    createEnviroment();
    
    document.body.appendChild(renderer.domElement);
    
    // function from gameMechanics.js in order to prepare the gameplay
    gameVarsInit();
    chivatoBoard();

    render();
}

function render() {
    // ------------------------------ MECHANICS --------------------------------//
    if (nextTurnAble && !noTokenLeft) {
        nextTurn();
        gameover = isBoardFull();
        chivatoBoard(); // CHIVATO.................... ***
        nextTurnAble = !nextTurnAble;

        if (gameover) {
            checkWinner();
            console.log("GAMEOVER. Press 'R' to restart!");
        }
    }

    // ------------------------------ RENDERING --------------------------------//
    renderer.render(scene,camera);

    cameraControl.update();    
    requestAnimationFrame(render);  
}

//GEOMETRY!

function createBox() {
    var boxGeometry = new THREE.BoxGeometry(6,4,6);
    var boxMaterial = new THREE.MeshLambertMaterial({
        color: "red"
    });

    var box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.castShadow = true;
    scene.add(box);
}


function createPlane() {
    var planeGeometry = new THREE.PlaneGeometry(200,200);
    var planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xFF0011,
    });

    
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.material.side= THREE.DoubleSide;
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -2;
    scene.add(plane);
}

function createLight() {
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(100,10,-50);
    spotLight.shadow.camera.near = 20;
        spotLight.shadow.camera.far = 50;
    spotLight.castShadow = true;
    scene.add(spotLight);

    var directionalLight = new THREE.DirectionalLight(0xffffff,1);

    directionalLight.position.set(100,10, -50);
    directionalLight.name = 'directional';
    scene.add(directionalLight);
    
    var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);
}

/*
function createHead(){
    var material = new THREE.MeshPhongMaterial();

    var loader = new THREE.OBJLoader();

    loader.load('assets/lee.obj', function (object) {
        
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                child.material = material;
                child.receiveShadow = true;
                child.castShadow = true; 
                child.name = "model";
            }
        });
        scene.add(object);
    });
}
*/
/* function createEarthMaterial() {
    var earthTexture = new THREE.Texture();
    var loader = new THREE.ImageLoader();
    loader.load('assets/earthmap2k.jpg', function (image) {
        earthTexture.image = image;
        earthTexture.needsUpdate = true;
    });



    var earthMaterial = new THREE.MeshPhongMaterial();
    earthMaterial.map = earthTexture;

    var normalTexture = new THREE.Texture();

    loader.load('assets/earth_normalmap_flat2k.jpg', function (image) {
        normalTexture.image = image;
        normalTexture.needsUpdate = true;
    });
    earthMaterial.normalMap = normalTexture;
    earthMaterial.normalScale = new THREE.Vector2(1.0,1.0);


    var specTexture = new THREE.Texture();
    loader.load('assets/lee_spec.jpg', function (image) {
        earthMaterial.specularMap = image;
        normalTexture.needsUpdate = true;
    });
    earthMaterial.specularMap = specTexture;
    earthMaterial.specular = new THREE.Color(0x262626);

    return earthMaterial;
}
 */

function createEnviroment() {
    var envGeometry = new THREE.SphereGeometry(300,32,32);

    var envMaterial = new THREE.MeshBasicMaterial();
    envMaterial.map = THREE.ImageUtils.loadTexture('assets/Skybox/lava_texture_by_twister10_d1fy457.jpg');
    envMaterial.side = THREE.BackSide;

    var mesh = new THREE.Mesh(envGeometry, envMaterial);
    scene.add(mesh);
}

init();

/* _______________________________________________________________________________________ */

//IT MUST BE USED ONLY ONE TIME!!! THAT'S WHY IT APPEARS HERE, just one time!!
window.addEventListener("keydown", function(e) {
    console.log(model);
    model = scene.getObjectByName("model");
    //if ( model != null) {
        switch (e.key) {
            case 'a':
                //model.position.x += 1;    // esto estaba antes
                player.moveToken(-1,0);
                break;

            case 'd':
                player.moveToken(+1,0);
                //model.position.x -= 1;    // esto estaba antes
                break;

            case 'w':
                player.moveToken(0,-1);
                //model.position.x += 1;    // esto estaba antes
                break;

            case 's':
                player.moveToken(0,+1);
                break;

            case 'r':
                if (gameover) restartGame();
                break;

            case 'Enter':
                console.log("Enter pressed!");
                nextTurnAble = checkTokens();
                break;

            default:
                console.log("Unknown keycode!");
                break;
        }    
    //}
    chivatoFull();

});
/* _______________________________________________________________________________________ */