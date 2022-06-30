objData.createMats.push(function(){
	objData.mat.car.mirror = new THREE.MeshStandardMaterial({
		color: 0xffffff, metalness: 1.0, roughness: 0.5
	});

	objData.mat.car.roomMirror = new THREE.MeshLambertMaterial({color: 0xdddddd, side: THREE.DoubleSide});
});

function createRoomMirror(mode) {
	const roomMirror = new THREE.Group();
	
	let geom = objData.geo.car.roomMirrorFrame;
	let mesh = new THREE.Mesh(
		geom || new THREE.BoxGeometry(.1, .2, .6),
		objData.mat.car.roomMirror
	);
	
	if(geom === undefined){
		objData.geo.car.roomMirrorFrame = mesh.geometry;
		
		mesh.geometry.attributes.position.array[12] += .05;
		mesh.geometry.attributes.position.array[15] += .05;
		mesh.geometry.attributes.position.array[18] += .05;
		mesh.geometry.attributes.position.array[21] += .05;
	}
	
	mesh.rotation.y = Math.PI / 2;
	mesh.position.z += .05;

    roomMirror.add(mesh);

	geom = objData.geo.car.roomMirror;
    mesh = new THREE.Mesh(
        geom || new THREE.PlaneGeometry(.6, .2),
        objData.mat.mirror
    );
    if (mode) {
        mesh = new THREE.Reflector(
            mesh.geometry,
            {
                clipBias: 0.006,
                textureWidth: window.innerWidth * window.devicePixelRatio,
                textureHeight: window.innerHeight * window.devicePixelRatio,
                color: 0x889999
            }
        );
    }

	if(geom === undefined)
		objData.geo.car.roomMirror = mesh.geometry;
	
	mesh.position.z += .1;;
	mesh.rotation.x += .175;
	
	roomMirror.add(mesh);
	
	geom = objData.geo.car.roomMirrorAxis;
	mesh = new THREE.Mesh(
		geom || new THREE.CylinderGeometry(.025, .025, .2, 16),
		objData.mat.car.roomMirror
	);
	
	if(geom === undefined)
		objData.geo.car.roomMirrorAxis = mesh.geometry;
	
	mesh.scale.set(1, 1, 1);
	

	mesh.position.z -= .02;
	mesh.position.y += .08;
	
	roomMirror.add(mesh);
	roomMirror.position.y += .055;
	roomMirror.rotation.y = -Math.PI / 2 + .225;
	
	roomMirror.scale.set(.8, .8, .8);
	
	return roomMirror;
}

function createMirror(vehicle, mode){
	const mirror = new THREE.Group();
	
	//ルームミラー
	mirror.add(createRoomMirror(mode));

	//サイドミラー
    mirror.add(createRightMirror(vehicle, mode));
    mirror.add(createLeftMirror(vehicle, mode));
	
	mirror.position.x += vehicle.l / 2 - vehicle.f - .5 - .1;
	mirror.position.y += vehicle.h - .3;
	
	return mirror;
}