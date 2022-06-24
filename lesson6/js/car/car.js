const wheel = new Array();

function car(scene) {
	const car = new THREE.Group();
	const rim = new THREE.Group();
	
	
	const vehicle = {
		h : 2,
		w : 1.7,
		l : 4.7,
		f : .8,
		
		t: .4,
		u: .6
	};
	
	car.add(createBody(vehicle));
	car.add(createMirror(vehicle));
	
	wheel.push(createRim());
	let len = wheel.length - 1;
	
	wheel[len].position.x -= 1.8;
	wheel[len].position.z += .75;
	wheel[len].rotation.y += Math.PI;
	wheel[len].scale.set(.065, .065, .05);
	
	rim.add(wheel[len]);

	wheel.push(createRim());
	len = wheel.length - 1;
	
	wheel[len].position.x -= 1.8;
	wheel[len].position.z -= .75;
	wheel[len].scale.set(.065, .065, .05);
	
	rim.add(wheel[len]);

	wheel.push(createRim());
	len = wheel.length - 1;
	
	wheel[len].position.x += 1.75;
	wheel[len].position.z += .75;
	wheel[len].rotation.y += Math.PI;
	wheel[len].scale.set(.065, .065, .05);
	
	rim.add(wheel[len]);

	wheel.push(createRim());
	len = wheel.length - 1;
	
	wheel[len].position.x += 1.75;
	wheel[len].position.z -= .75;
	wheel[len].scale.set(.065, .065, .05);
	
	rim.add(wheel[len]);
	
	car.add(rim);
	//car.rotation.x += Math.PI / 2;
	
	//car.position.x -= 8;
	//car.position.y -= 5;
	//car.scale.set(10, 10, 10);
	
	scene.add(car);
	
	return car;
}