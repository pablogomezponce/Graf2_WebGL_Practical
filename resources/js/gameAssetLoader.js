class gameAssetLoader{

    static loadObject(posX, posY, name, id) {
        
        var loader = new THREE.MTLLoader();

        switch (name) {
            case "x":
                loader.load( './assets/fichas/x/x.mtl', function ( materials ) {
                    var obloader = new THREE.OBJLoader();
                    obloader.setMaterials(materials);
                    obloader.load( './assets/fichas/x/x.obj', function ( object ) {
                        object.name = id;
                        object.position.x = -100 + 100 * posY;
                        object.position.z = 100 - 100 * posX;
                        object.scale.set(0.0525,0.0525,0.0525);
                            scene.add( object );
                        } );
                } );
                break;
            case "o":
                loader.load( './assets/fichas/o/o.mtl', function ( materials ) {
                    var obloader = new THREE.OBJLoader();
                    obloader.setMaterials(materials);
                    obloader.load( './assets/fichas/o/o.obj', function ( object ) {
                            object.name = id;
                            object.position.x = -100 + 100 * posY;
                            object.position.z = 100 - 100 * posX;
                            object.scale.set(0.5,0.5,0.5);
                            scene.add( object );
                        } );
                } );
                break;
            case "busy":
                    var envGeometry = new THREE.SphereGeometry(32,32,32);
                    var planeMaterial = new THREE.MeshLambertMaterial({
                        color: 0xFF0011,
                    });
                
                    var plane = new THREE.Mesh(envGeometry, planeMaterial);
                    plane.material.side= THREE.DoubleSide;
                    plane.receiveShadow = true;
                    plane.position.y = -2;
                    plane.position.x = -100 + 100 * posY;
                    plane.position.z = 100 - 100 * posX;
                    plane.name = id;
                    scene.add(plane);
                                                    
            break;
        }
    }

    static deleteObject(info){
        scene.remove(scene.getObjectByName(info));
    }
}

