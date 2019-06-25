var renderer;
var scene;
var model;
var camera;

var turnM

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

    turn = 1;
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

    // we load the first token and start the game (main loop)
    gameAssetLoader.loadObject(player.col, player.row,player.value,turn);
    render();
}

function render() {
    // ------------------------------ MECHANICS --------------------------------//

    if (nextTurnAble && !noTokenLeft) {

        nextTurn();
        gameover = isBoardFull();
        chivatoBoard(); // CHIVATO.................... ***
        nextTurnAble = !nextTurnAble;

        checkWinner();
        if (gameover) {
            // quitamos las imagenes y el canvas
            commandsIcon.remove();
            audioIcon.remove();
            $("canvas").remove();
            switch (winner) {
                case '+':
                    document.body.style.backgroundImage = "url(./assets/Results/draw.png)";
                    
                    break;
                case 'o':
                    document.body.style.backgroundImage = "url(./assets/Results/o_wins.png)";

                    break;
                case 'x':
                    document.body.style.backgroundImage = "url(./assets/Results/+_wins.png)";

                    break;
                default:
                    
                    break;
            }
            document.body.style.backgroundRepeat = "no-repeat";
            document.body.style.backgroundPosition =  "center center";
            document.body.style.backgroundAttachment = "fixed";
            document.body.style.backgroundSize = "cover";

            alert("GAMEOVER. Press 'R' to restart!");
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
    var planeGeometry = new THREE.PlaneGeometry(250,250);
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

    //if ( model != null) {
        switch (e.key) {
            case 'a':
                player.moveToken(-1,0);
                if(board[player.row][player.col] == '+'){
                    gameAssetLoader.loadObject(player.col, player.row,player.value,turn);
                } else {
                    gameAssetLoader.loadObject(player.col, player.row,"busy",turn);
                }
                break;

            case 'd':
                player.moveToken(+1,0);
                if(board[player.row][player.col] == '+'){
                    gameAssetLoader.loadObject(player.col, player.row,player.value,turn);
                } else {
                    gameAssetLoader.loadObject(player.col, player.row,"busy",turn);
                }
                //model.position.x -= 1;    // esto estaba antes
                break;

            case 'w':
                player.moveToken(0,-1);
                if(board[player.row][player.col] == '+'){
                    gameAssetLoader.loadObject(player.col, player.row,player.value,turn);
                } else {
                    gameAssetLoader.loadObject(player.col, player.row,"busy",turn);
                }
                //model.position.x += 1;    // esto estaba antes
                break;

            case 's':
                player.moveToken(0,+1);
                if(board[player.row][player.col] == '+'){
                    gameAssetLoader.loadObject(player.col, player.row,player.value,turn);
                } else {
                    gameAssetLoader.loadObject(player.col, player.row,"busy",turn);
                }

                break;

            case 'r':
                this.location.reload();
                break;

            case 'Enter':
                nextTurnAble = checkTokens();
                if (nextTurnAble) {
                    gameAssetLoader.loadObject(player.col, player.row,player.value,turn);
                    
                    turn += 1;
                }/* else {
                    gameAssetLoader.loadObject(player.col, player.row,"busy",turn);
                }*/
                break;
            
            case ' ':
                gameAssetLoader.deleteObject(turn - 1);
                break;

            case 'm':
                if (!isMusicPlaying) {
                    audioPlayer.play();
                    audioIcon.src = "../assets/img/audio_on.png";
                    isMusicPlaying = true;
                } else {
                    audioPlayer.pause();
                    audioIcon.src = "../assets/img/audio_paused.png";
                    isMusicPlaying = false;
                }
                break;

            case 'p':
                if (isMusicPlaying) {
                    audioPlayer.pause();
                }
                audioIcon.src = "../assets/img/audio_init.png";
                audioPlayer.currentTime = 0;
                isMusicPlaying = false;
                
                break;

            default:
                break;
        }    
    //}
    chivatoFull();

});
/* _______________________________________________________________________________________ */