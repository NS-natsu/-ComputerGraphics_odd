function createMirror(vehicle){	
	let roomMirror = new THREE.Group();
	
	//鏡
	const detailsMaterial = new THREE.MeshStandardMaterial( {
		color: 0xffffff, metalness: 1.0, roughness: 0.5
	} );
	
	let mats = [
		new THREE.MeshStandardMaterial({color: 0xdddddd}),
		detailsMaterial,
		null, null, null, null
	]
	mats[5] = mats[4] = mats[3] = mats[2] = mats[0];
	
	let mesh = new THREE.Mesh(
		new THREE.BoxGeometry(.05, .2, .6),
		new THREE.MeshFaceMaterial(mats)
	);

	roomMirror.add(mesh);
	
	mesh = new THREE.Mesh(
		new THREE.CylinderGeometry(.025, .025, .2, 16),
		new THREE.MeshStandardMaterial({color: 0xdddddd})
	);
	
	mesh.scale.set(1, 1, .1);
	

	mesh.position.x += .02;
	mesh.position.y += .08;
	
	roomMirror.add(mesh);
	
	roomMirror.position.x += vehicle.l / 2 - vehicle.f - .5 - .1;
	roomMirror.position.y += vehicle.h - .3;
	
	return roomMirror;
}