function createCar(scene) {
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
	
	car.add(createMirror(vehicle));
	
	scene.add(car);
	
	wheel.push(createRim());
	let len = wheel.length - 1;
	
	wheel[len].position.x -= 1.8;
	wheel[len].position.z += .75;
	wheel[len].scale.set(.065, .065, -.05);
	
	car.add(wheel[len]);

	wheel.push(createRim());
	len = wheel.length - 1;
	
	wheel[len].position.x -= 1.8;
	wheel[len].position.z -= .75;
	wheel[len].scale.set(.065, .065, .05);
	
	car.add(wheel[len]);

	wheel.push(createRim());
	len = wheel.length - 1;
	
	wheel[len].position.x += 1.75;
	wheel[len].position.z += .75;
	wheel[len].scale.set(.065, .065, -.05);
	
	car.add(wheel[len]);

	wheel.push(createRim());
	len = wheel.length - 1;
	
	wheel[len].position.x += 1.75;
	wheel[len].position.z -= .75;
	wheel[len].scale.set(.065, .065, .05);
	
	car.add(wheel[len]);
	
	mesh = createSole(vehicle);
	mesh.position.y -= .1;
	car.add(mesh);
	//car.rotation.x += Math.PI / 2;
	
	//car.position.x -= 8;
	//car.position.y -= 5;
	//car.scale.set(10, 10, 10);
	
	scene.add(car);
	arr.push(car);
	
	return {
		main: car,
		wheel: wheel
	};
}