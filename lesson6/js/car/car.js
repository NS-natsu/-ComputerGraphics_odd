function createCar(mode) {
	const car = new THREE.Group();
	const wheel = new Array();
		
	const vehicle = {
		h : 2,
		w : 1.7,
		l : 4.7,
		f : .8,
		
		t: .4,
		u: .6
	};
	
	let mesh = createWindow(vehicle);
	mesh.position.y += .5
	car.add(mesh);

	mesh = createInterior(vehicle, mesh.geometry.attributes);
	mesh.position.y += .5;
	car.add(mesh);
	
	mesh = createCover(vehicle);
	mesh.position.x += vehicle.l / 2 - vehicle.f + .22;
	mesh.position.y += .5;
	car.add(mesh);
	
	mesh = createCover(vehicle);
	mesh.position.x -= vehicle.l / 2 - vehicle.f + .25;
	mesh.position.y += .5;
	car.add(mesh);

	
	mesh = createBody(vehicle);
	mesh.position.y += .5;
	car.add(mesh);
	
	
	mesh = createMirror(vehicle, mode);
	car.add(mesh);
	
	wheel.push(createRim());
	wheel.push(createRim());
	wheel.push(createRim());
	wheel.push(createRim());
	
	wheel[0].position.x -= 1.8;
	wheel[0].position.z += .75;
	wheel[0].scale.set(.065, .065, -.05);
	car.add(wheel[0]);
	
	wheel[1].position.x -= 1.8;
	wheel[1].position.z -= .75;
	wheel[1].scale.set(.065, .065, .05);
	
	car.add(wheel[1]);
	
	wheel[2].position.x += 1.75;
	wheel[2].position.z += .75;
	wheel[2].scale.set(.065, .065, -.05);
	car.add(wheel[2]);

	wheel[3].position.x += 1.75;
	wheel[3].position.z -= .75;
	wheel[3].scale.set(.065, .065, .05);
	car.add(wheel[3]);
	
	mesh = createSole(vehicle);
	mesh.position.y -= .1;
	car.add(mesh);
	
	mesh = createFrontChair();
	mesh.position.y += .85;
	mesh.position.z += .4; 
	mesh.rotation.y += Math.PI;
	mesh.scale.set(.4, .5, .35);
	car.add(mesh);
	
	mesh = createFrontChair();
	mesh.position.y += .85;
	mesh.position.z -= .4; 
	mesh.rotation.y += Math.PI;
	mesh.scale.set(.4, .5, .35);
	car.add(mesh);
	
	mesh = createRearChair();
	mesh.position.x -= 1.2;
	mesh.position.y += .85;
	mesh.rotation.y += Math.PI;
	mesh.scale.set(.4, .5, .4);
	car.add(mesh);
	
	mesh = createHandle();
	/*mesh.position.x -= 1.2;
	mesh.position.y += .85;
	mesh.rotation.y += Math.PI;
	mesh.scale.set(.4, .5, .4);*/
	//car.add(mesh);
	
	//car.rotation.x += Math.PI / 2;
	
	//car.position.x -= 8;
	//car.position.y -= 5;
	//car.scale.set(10, 10, 10);
	
	//ライト
	
	const light = new Array();
	
	light.push(new THREE.SpotLight(0xffffff, 2, 50, Math.PI / 5, 0.2));
	light.push(new THREE.SpotLight(0xffffff, 2, 50, Math.PI / 5, 0.2));

	light[0].position.set(0,0,0);
	light[0].position.x += vehicle.l / 2;
	light[0].position.y += vehicle.h * vehicle.u * .625;
	light[0].position.z += vehicle.w / 2 * .8;
	light[0].castShadow = true;
	
	light[1].position.set(0,0,0);
	light[1].position.x += vehicle.l / 2;
	light[1].position.y += vehicle.h * vehicle.u * .625;
	light[1].position.z -= vehicle.w / 2 * .8;
	
	for(let i = 0; i < light.length; i++){
		mesh = new THREE.Mesh(
			new THREE.BoxGeometry(.1, .1, .1),
			textures.materials.target
		);
		mesh.position.x = light[i].position.x + 1;
		mesh.position.y = light[i].position.y - .3;
		mesh.position.z = light[i].position.z;
		
		light[i].target = mesh;
		light[i].target.updateMatrixWorld();
		
		car.add(light[i]);
		car.add(mesh);
	}
	
	return {
		main: car,
		wheel: wheel,
		light: light
	};
}