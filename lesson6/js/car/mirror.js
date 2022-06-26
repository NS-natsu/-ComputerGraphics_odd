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
	
	const coatMaterial = new THREE.MeshLambertMaterial( {
		map: textureLoader.load("img/car/color.jpg")
	} );
	
	mesh = new THREE.Mesh(
		new THREE.SphereGeometry(1, segment, segment),
		coatMaterial
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
		coatMaterial
	);
	mesh.rotation.x += .8;
	mesh.position.x += size.depth / 4 + .01;
	mesh.position.z -= size.in + size.depth / 4 * Math.sin(mesh.rotation.x);
	mesh.position.y -= size.bottom * .7;
	
	using = mesh.geometry.attributes.position.array;
	
	for(let i = 0; i <= 16; i++){
		const n = (2 * size.depth / 4) * (.5 - Math.cos(2 * Math.PI * i / 16) / 2);
		using[3 * 17 + 3 * i + 1] += n;
		using[3 * 3 * 17 + 2 * 3 * 16 + 3 * i + 1] += n;
	}
	
	for(let i = 0; i< 16; i++){
		const n = (2 * size.depth / 4) * .5;
		using[3 * 3 * 17 + 3 * 16 + 3 * i + 1] += n;
	}
	
	rightMirror.add(mesh);
	arr.push(mesh);
	
	
	rightMirror.position.x += .5;
	rightMirror.position.y -= vehicle.h * vehicle.u / 2;
	rightMirror.position.z += vehicle.w / 2 + (size.in + (size.depth / 4 + .5) * Math.sin(mesh.rotation.x)) * .125 - .175 * .125;
	
	rightMirror.scale.set(.125, .125, .125);
	
	return rightMirror;
	
}

function createLeftMirror(vehicle, size, segment){
	const rightMirror = new THREE.Group();
	const textureLoader = new THREE.TextureLoader();
	
	//鏡
	const detailsMaterial = new THREE.MeshStandardMaterial( {
		color: 0xffffff, metalness: 1.0, roughness: 0.5,
		shading: THREE.FlatShading
	} );
	
	const coatMaterial = new THREE.MeshLambertMaterial( {
		map: textureLoader.load("img/car/color.jpg")
	} );
	
	mesh = new THREE.Mesh(
		new THREE.SphereGeometry(1, segment, segment),
		coatMaterial
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
		if(using[i+2] <= 0){
			using[i+2] *= size.out;
		} else {
			using[i+2] = Math.sqrt(using[i+2]);
			using[i+2] *= size.in;
		}
	}
	rightMirror.add(mesh);
	
	mesh = new THREE.Mesh(
		new THREE.TorusGeometry(.5, .5, 2, segment*2),
		detailsMaterial
	);
	
	using = mesh.geometry.attributes.position.array;
	for(let i =0; i < using.length; i+=3){
		if(using[i] <= 0){
			using[i] *= size.out;
		} else {
			using[i] = Math.sqrt(using[i]);
			using[i] *= size.in;
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
		coatMaterial
	);
	mesh.rotation.x -= .8;
	mesh.position.x += size.depth / 4 + .01;
	mesh.position.z += size.in + size.depth / 4 * Math.sin(-mesh.rotation.x);
	mesh.position.y -= size.bottom * .7;
	
	using = mesh.geometry.attributes.position.array;
	
	for(let i = 0; i <= 16; i++){
		const n = (2 * size.depth / 4) * (.5 + Math.cos(2 * Math.PI * i / 16) / 2);
		using[3 * 17 + 3 * i + 1] += n;
		using[3 * 3 * 17 + 2 * 3 * 16 + 3 * i + 1] += n;
	}
	
	for(let i = 0; i< 16; i++){
		const n = (2 * size.depth / 4) * .5;
		using[3 * 3 * 17 + 3 * 16 + 3 * i + 1] += n;
	}
	
	rightMirror.add(mesh);
	arr.push(mesh);
	
	
	rightMirror.position.x += .5;
	rightMirror.position.y -= vehicle.h * vehicle.u / 2;
	rightMirror.position.z -= vehicle.w / 2 + (size.in + (size.depth / 4 + .5) * Math.sin(-mesh.rotation.x)) * .125 - .175 * .125;
	
	rightMirror.scale.set(.125, .125, .125);
	
	return rightMirror;
	
}

function createMirror(vehicle){
	const mirror = new THREE.Group();
	
	//サイドミラー
	const segment = 32;
	const size = {
		depth: .8,
		top : 1.5,
		in : 1,
		out :2,
		bottom :1
	}
	
	//ルームミラー
	mirror.add(createRoomMirror(vehicle));

	mirror.add(createRightMirror(vehicle, size, segment));
	mirror.add(createLeftMirror(vehicle, size, segment));
	
	
	mirror.position.x += vehicle.l / 2 - vehicle.f - .5 - .1;
	mirror.position.y += vehicle.h - .3;
	
	return mirror;
}