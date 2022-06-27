function createRoomMirror(){
	const roomMirror = new THREE.Group();
	
	let mat = new THREE.MeshLambertMaterial({color: 0xdddddd, side: THREE.DoubleSide});
	
	let mesh = new THREE.Mesh(
		new THREE.BoxGeometry(.1, .2, .6),
		mat
	);
	
	mesh.geometry.attributes.position.array[12] += .05;
	mesh.geometry.attributes.position.array[15] += .05;
	mesh.geometry.attributes.position.array[18] += .05;
	mesh.geometry.attributes.position.array[21] += .05;
	mesh.rotation.y = Math.PI / 2;
	mesh.position.z += .05;

	roomMirror.add(mesh);
	
	mesh = new THREE.Reflector(
		new THREE.PlaneGeometry(.6, .2),
		{
			clipBias: 0.006,
			textureWidth: window.innerWidth * window.devicePixelRatio,
			textureHeight: window.innerHeight * window.devicePixelRatio,
			color: 0x889999
		}
	);
	
	mesh.position.z += .1;;
	mesh.rotation.x += .175;
	
	roomMirror.add(mesh);
	arr.push(mesh);
	
	mesh = new THREE.Mesh(
		new THREE.CylinderGeometry(.025, .025, .2, 16),
		mat
	);
	
	mesh.scale.set(1, 1, 1);
	

	mesh.position.z -= .02;
	mesh.position.y += .08;
	
	roomMirror.add(mesh);
	roomMirror.position.y += .055;
	roomMirror.rotation.y = -Math.PI / 2 + .225;
	arr.push(roomMirror);
	
	roomMirror.scale.set(.8, .8, .8);
	
	return roomMirror;
}

function createMirror(vehicle){
	const mirror = new THREE.Group();
	
	//ルームミラー
	mirror.add(createRoomMirror(vehicle));

	//サイドミラー
	mirror.add(createRightMirror(vehicle));
	mirror.add(createLeftMirror(vehicle));
	
	mirror.position.x += vehicle.l / 2 - vehicle.f - .5 - .1;
	mirror.position.y += vehicle.h - .3;
	
	return mirror;
}