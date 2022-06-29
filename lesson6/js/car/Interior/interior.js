textures.createMaterials.push(function(){
	const mats = [
		new THREE.MeshBasicMaterial({color: 0xdddddd, side: THREE.BackSide}),
		new THREE.MeshBasicMaterial({color: 0xdddddd, side: THREE.BackSide}),
		new THREE.MeshBasicMaterial({color: 0xdddddd, side: THREE.BackSide}),
		new THREE.MeshLambertMaterial({map: textures.floor, side: THREE.BackSide}),
		new THREE.MeshBasicMaterial({color: 0xdddddd, side: THREE.BackSide}),
		new THREE.MeshBasicMaterial({color: 0xdddddd, side: THREE.BackSide})
	];

	//mats[3].bumpMap = mats[3].map;
	//mats[3].bumpscale = .2;
	textures.materials.car.interior = new THREE.MeshFaceMaterial(mats);
});
function createInterior(vehicle, body){	
	const inter = new THREE.Mesh(
			new THREE.BoxGeometry(vehicle.l - vehicle.f - .001, vehicle.h * vehicle.u - 0.2, vehicle.w - .01),
			textures.materials.car.interior
	);
	const vert = inter.geometry.attributes.position.array;
	const normal = inter.geometry.attributes.normal.array;
	
	
	for(let i = 0; i < 12; i++){
		vert[24 + i] = body.position.array[24 + i];
		normal[24 + i] = body.normal.array[24 + i];
	}

	vert[6 + 1] += .35;
	vert[9 + 1] += .35;
	
	vert[24 + 1] += vehicle.h * vehicle.t + .1;
	//vert[27 + 0] -= .0;
	vert[27 + 1] += vehicle.h * vehicle.t + .1;
	vert[30 + 1] += vehicle.h * vehicle.t + .1;
	//vert[33 + 0] -= .0;
	vert[33 + 1] += vehicle.h * vehicle.t + .1;
	
	vert[36 + 0] += 1.025;
	vert[39 + 0] -= .25;
	vert[42 + 0] += 1.025;
	vert[45 + 0] -= .25;

	inter.position.x -= vehicle.f / 2;
	inter.position.y += .1;
	
	return inter;
}

function createHandle(){
	const material = textures.materials.template.normal;
	const handle = new THREE.Group();
	
	let mesh = new THREE.Mesh(
		new THREE.TorusGeometry(2, .25, 32, 32),
		material
	);
	/*let using = mesh.geometry.attributes.position.array;
	for(let i = 0; i < using.length; i+=3){
		using[i + 1] = Math.abs(using[i + 1]);
	}*/
	//mesh.geometry.computeVertexNormals(); 
	
	handle.add(mesh);
	
	return handle;
}