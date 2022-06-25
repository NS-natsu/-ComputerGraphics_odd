function createRoomMirror(vehicle){
	const roomMirror = new THREE.Group();
	
	//鏡
	const detailsMaterial = new THREE.MeshStandardMaterial( {
		color: 0xffffff, metalness: 1.0, roughness: 0.5
	} );
	
	//ルームミラー
	let mats = [
		new THREE.MeshLambertMaterial({color: 0xdddddd}),
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
		mats[0]
	);
	
	mesh.scale.set(1, 1, 1);
	

	mesh.position.x += .02;
	mesh.position.y += .08;
	
	roomMirror.add(mesh);
	
	return roomMirror;
}

//サイドミラー
function createRightMirror(vehicle, size, segment){
	const rightMirror = new THREE.Group();
	const textureLoader = new THREE.TextureLoader();
	
	//鏡
	const detailsMaterial = new THREE.MeshStandardMaterial( {
		color: 0xffffff, metalness: 1.0, roughness: 0.5,
		shading: THREE.FlatShading
	} );
	
	mesh = new THREE.Mesh(
		new THREE.SphereGeometry(1, segment, segment),
		new THREE.MeshBasicMaterial({map: textureLoader.load("img/car/color.jpg")})
	);
	
	let using = mesh.geometry.attributes.position.array;
	for(let i =0; i < using.length; i+=3){
		if(using[i] < 0){
			using[i + 0] *= -1;
			mesh.geometry.attributes.normal.array[i + 0] *= -1;
		}
		using[i + 0] *= size.depth;
		if(using[i+1] < 0){
			using[i+1] = Math.sin(Math.PI * using[i+1] / 2);
			using[i+1] *= size.bottom;
		} else {
			using[i+1] *= size.top;
		}
		if(using[i+2] < 0){
			using[i+2] = -Math.sqrt(-using[i+2]);
			using[i+2] *= size.in;
		} else {
			using[i+2] *= size.out;
		}
	}
	rightMirror.add(mesh);
	
	mesh = new THREE.Mesh(
		new THREE.TorusGeometry(.5, .5, 2, segment*2),
		detailsMaterial
	);
	
	using = mesh.geometry.attributes.position.array;
	for(let i =0; i < using.length; i+=3){
		if(using[i] < 0){
			using[i] = -Math.sqrt(-using[i]);
			using[i] *= size.in;
		} else {
			using[i] *= size.out;
		}
		if(using[i+1] < 0){
			using[i+1] = Math.sin(Math.PI * using[i+1] / 2);
			using[i+1] *= size.bottom;
		} else {
			using[i+1] *= size.top;
		}
	}
	mesh.rotation.y -= Math.PI / 2;
	rightMirror.add(mesh);	
	
	mesh = new THREE.Mesh(
		new THREE.CylinderGeometry(size.depth / 4, size.depth / 4, 1, 16),
		new THREE.MeshNormalMaterial()
	);
	mesh.position.x += size.depth / 4 + .01;
	mesh.position.z -= size.in + size.depth / 4;
	mesh.position.y -= size.bottom * .7;
	mesh.rotation.x += .8;
	rightMirror.add(mesh);
	
	
	rightMirror.position.x += vehicle.l / 2 - vehicle.f - .5 - .1;
	rightMirror.position.y += vehicle.h - .3;
	
	return rightMirror;
	
}

function createMirror(vehicle){
	const mirror = new THREE.Group();
	
	//サイドミラー
	const segment = 8;
	const size = {
		depth: .8,
		top : 1.5,
		in : 1,
		out :2,
		bottom :1
	}
	
	//ルームミラー
	//mirror.add(createRoomMirror(vehicle));

	mirror.add(createRightMirror(vehicle, size, segment));
	
	
	mirror.position.x += vehicle.l / 2 - vehicle.f - .5 - .1;
	mirror.position.y += vehicle.h - .3;
	
	return mirror;
}