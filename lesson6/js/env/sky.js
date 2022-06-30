function createSky(){
	const textureLoader = new THREE.TextureLoader();
	
	const skySize = 500;
	const skyGeometry = new THREE.CylinderGeometry( skySize, skySize, 5000, 32 );
	const skyMaterial = new THREE.MeshBasicMaterial({side: THREE.BackSide});
	skyMaterial.map = objData.txt.sky;
	skyMaterial.map.wrapS = THREE.MirroredRepeatWrapping;
	skyMaterial.map.wrapT = THREE.MirroredRepeatWrapping;
	skyMaterial.map.repeat.set(2, 2);
	const mats = [
		skyMaterial,
		new THREE.MeshBasicMaterial({color: 0, transparent: true, opacity: 0}),
		null
	];
	mats[2] = mats[1];
	const sky = new THREE.Mesh(skyGeometry, new THREE.MeshFaceMaterial(mats));
	
	sky.rotation.x += Math.PI / 4;
	
	const Sky = new THREE.Group();
	Sky.add(sky);
	Sky.position.x += 20;
	Sky.position.y += skySize / 2;
	Sky.rotation.z -= 0.5;
	Sky.rotation.x -= 0.5;
	
	return Sky;
}