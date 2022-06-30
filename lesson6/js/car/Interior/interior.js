objData.createMats.push(function(){
	const mats = [
		new THREE.MeshLambertMaterial({color: 0xdddddd, side: THREE.BackSide}),
		new THREE.MeshLambertMaterial({color: 0xdddddd, side: THREE.BackSide}),
		new THREE.MeshLambertMaterial({color: 0xdddddd, side: THREE.BackSide}),
		new THREE.MeshLambertMaterial({map: objData.txt.floor, side: THREE.BackSide}),
		new THREE.MeshLambertMaterial({color: 0xdddddd, side: THREE.BackSide}),
		new THREE.MeshLambertMaterial({color: 0xdddddd, side: THREE.BackSide})
	];

	//mats[3].bumpMap = mats[3].map;
	//mats[3].bumpscale = .2;
	objData.mat.car.interior = new THREE.MeshFaceMaterial(mats);
});
function createInterior(vehicle, body){
	const geom = objData.geo.car.interior;
	const inter = new THREE.Mesh(
			geom || new THREE.BoxGeometry(vehicle.l - vehicle.f - .001, vehicle.h * vehicle.u - 0.2, vehicle.w - .01),
			objData.mat.car.interior
	);
	
	if(geom === undefined){
		objData.geo.car.interior = inter.geometry;
		
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
	}
	

	inter.position.x -= vehicle.f / 2;
	inter.position.y += .1;
	
	return inter;
}


function createHandle(){
	const material = objData.mat.template.lambert;
	const handle = new THREE.Group();
	
	const angle = 32;
	let using;
	
	let unit = new THREE.Group();
	
	let geom = objData.geo.car.handlrail;
	let mesh = new THREE.Mesh(
		geom || new THREE.TorusGeometry(1.75, .25, angle, angle),
		material
	);
	
	if(geom === undefined)
		objData.geo.car.handrail = mesh.geometry;
	
	unit.add(mesh);
	
	
	geom = objData.geo.car.handeCenter;
	mesh = new THREE.Mesh(
		geom || new THREE.SphereGeometry(1, angle, angle),
		material
	)
	if(geom === undefined){
		objData.geo.car.handeCenter = mesh.geometry;
		
		using = mesh.geometry.attributes.position.array;
		for(let i = 0; i < using.length; i+=3){
			let tmp;
			
			tmp = using[i + 2]
			if(tmp < 0) using[i + 2] = 0;
			else {
				tmp = Math.sin(Math.PI * tmp / 2);
				using[i + 2] = Math.sqrt(tmp);
			}
	
			tmp = using[i + 1];
			if(0 < tmp){
				tmp = Math.sin(Math.PI * tmp / 2);
				using[i + 1] = Math.sqrt(tmp);
			} else using[i + 1] *= -tmp * .75;
		}
		
		for(let i = 0; i < angle-1; i++){
			let offset = [0, (angle+1)*3, (angle+1)*6 + angle*3, (angle+1)*9 + angle*6]
			for(let j = 0; j < offset.length; j++){
				let back = using[offset[j] + i * 3 + 1];
				let forward = using[offset[j] + (i + 2) * 3 + 1];
			
				using[offset[j] + (i + 1)*3 + 1] += back + forward;
				using[offset[j] + (i + 1)*3 + 1] /= 3;
				
				back = using[offset[j] + (angle-i) * 3 + 1];
				forward = using[offset[j] + (angle-i-2) * 3 + 1];
				
				using[offset[j] + (angle-i-1)*3 + 1] += back + forward;
				using[offset[j] + (angle-i-1)*3 + 1] /= 3;
			}
		}
		mesh.geometry.computeVertexNormals(); 
	}
	
	mesh.position.y -= 2 / 8;
	mesh.position.z -= 2 / 5;
	
	unit.add(mesh);
	
	geom = objData.geo.car.handleAxis;
	mesh = new THREE.Mesh(
		geom || new THREE.CylinderGeometry(.15, .15, 1, angle),
		material
	)
	if(geom === undefined)
		objData.geo.car.handleAxis = mesh.geometry;
	
	mesh.position.x += 2.5 / 2;
	mesh.position.y += .2;
	mesh.rotation.z -= 5 * Math.PI / 12;
	
	unit.add(mesh);
	
	mesh = new THREE.Mesh(
		mesh.geometry,
		material
	)
	
	mesh.position.x -= 2.5 / 2;
	mesh.position.y += .2;
	mesh.rotation.z += 5 * Math.PI / 12;
	
	unit.add(mesh);
	
	mesh = new THREE.Mesh(
		mesh.geometry,
		material
	)
	
	mesh.position.x += 2.5 / 4;
	mesh.position.y -= 1;
	mesh.rotation.z -= 5 * Math.PI / 6;
	
	unit.add(mesh);
	
	mesh = new THREE.Mesh(
		mesh.geometry,
		material
	)
	
	mesh.position.x -= 2.5 / 4;
	mesh.position.y -= 1;
	mesh.rotation.z += 5 * Math.PI / 6;
	
	unit.add(mesh);
	handle.add(unit);
	
	
	unit = new THREE.Group();
	
	geom = objData.geo.car.handlePedestal;
	mesh = new THREE.Mesh(
		geom || new THREE.CylinderGeometry(1, 1, 1.4, angle),
		material
	)
	
	if(geom === undefined){
		objData.geo.car.handlePedestal = mesh.geometry;
		using = mesh.geometry.attributes.position.array;
		for(let i = 0; i < using.length; i+=3){
			let tmp;
	
			tmp = using[i + 2];
			if(tmp < 0){
				tmp = -Math.sin(Math.PI * tmp / 2);
				using[i + 2] = -Math.sqrt(tmp);
			} else using[i + 2] *= tmp * .75;
		}
		
		for(let i = 0; i < angle-1; i++){
			let offset = [0, (angle+1)*3, (angle+1)*6 + angle*3, (angle+1)*9 + angle*6]
			for(let j = 0; j < offset.length; j++){
				let back = using[offset[j] + i * 3 + 2];
				let forward = using[offset[j] + (i + 2) * 3 + 2];
			
				using[offset[j] + (i + 1)*3 + 2] += back + forward;
				using[offset[j] + (i + 1)*3 + 2] /= 3;
				
				back = using[offset[j] + (angle-i) * 3 + 2];
				forward = using[offset[j] + (angle-i-2) * 3 + 2];
				
				using[offset[j] + (angle-i-1)*3 + 2] += back + forward;
				using[offset[j] + (angle-i-1)*3 + 2] /= 3;
			}
		}
		
		mesh.geometry.computeVertexNormals(); 
	}
	
	mesh.position.y -= 2 / 8;
	mesh.position.z -= 1.15;
	mesh.rotation.x = Math.PI / 2;
	
	unit.add(mesh);
	
	geom = objData.geo.car.handleRod;
	mesh = new THREE.Mesh(
		geom || new THREE.CylinderGeometry(.2, .2, 1.25, angle),
		material
	)
	
	if(geom === undefined)
		objData.geo.car.handleRod = mesh.geometry;
		
	mesh.position.x += 1.5;
	mesh.position.y += .2;
	mesh.position.z -= .8;
	mesh.rotation.x = -.6;
	mesh.rotation.y = -.3;
	mesh.rotation.z = Math.PI / 2;
	
	unit.add(mesh);
	
	mesh = new THREE.Mesh(
		mesh.geometry,
		material
	)
		
	mesh.position.x -= 1.5;
	mesh.position.y += .2;
	mesh.position.z -= .8;
	mesh.rotation.x = -.6;
	mesh.rotation.y = .3;
	mesh.rotation.z = Math.PI / 2;
	
	unit.add(mesh);
	
	handle.add(unit);
	
	return handle;
}