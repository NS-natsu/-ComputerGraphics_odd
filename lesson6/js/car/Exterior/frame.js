objData.createMats.push(function(){
	objData.mat.car.windowFrameSide = new THREE.MeshLambertMaterial({color:0});
	
	const mat = new THREE.MeshLambertMaterial({shading: THREE.FlatShading});
	mat.map = objData.txt.color;
	objData.mat.car.windowFrameCorner = mat;
	
});

function createFrameFrontRight(vehicle, bring, thick){
	const geometry = objData.geo.car.windowFrameCornerFrontR;
	const framefr = new THREE.Mesh(
		geometry || new THREE.CylinderGeometry(1, 1, vehicle.h * vehicle.t, 6),
		objData.mat.car.windowFrameCorner
	);
	
	let using;
	const pos = [
		[ .05 - thick, .05 - thick],
		[-.05 - thick, .05 - thick],
		[-.05 - thick, .05],
		[ .05, .05],
		[ .05, -.05],
		[ .05 - thick, -.05],
		[ .05 - thick, .05- thick]
	], top = [
		[ .05 - thick/2, .05 - thick/2],
		[-.05 - thick/2, .05 - thick/2],
		[-.05 - thick/2, .05],
		[ .05, .05],
		[ .05, -.05],
		[ .05 - thick/2, -.05],
		[ .05 - thick/2, .05- thick/2]
	];
	
	if(geometry === undefined){
		objData.geo.car.windowFrameCornerFrontR = framefr.geometry;
		
		using = framefr.geometry.attributes.position.array;
		
		for(let i = 0; i < 7; i++){
			using[3 * i + 0] = pos[i][0];
			using[3 * i + 2] = pos[i][1];
			
			using[3*7 + 3 * i + 0] = pos[i][0];
			using[3*7 + 3 * i + 2] = pos[i][1];
			
			using[6*7 + 3*6 + 3 * i + 0] = top[i][0]
			using[6*7 + 3*6 + 3 * i + 2] = top[i][1];
			
			using[9*7 + 6*6 + 3 * i + 0] = pos[i][0];
			using[9*7 + 6*6 + 3 * i + 2] = pos[i][1];
			
			using[3*i] -= .5;
			using[3*i + 2] -= bring;

			if(i == 6) continue;
			using[6*7 + 3 * i + 0] = .05 - thick / 2;
			using[6*7 + 3 * i + 2] = .05 - thick / 2;
			
			using[9*7 + 3*6 + 3 * i + 0] = .05 - thick / 2;
			using[9*7 + 3*6 + 3 * i + 2] = .05 - thick / 2;
		}

		for(let i = 0; i < 13; i++){
			using[6*7 + 3*i] -= .5;
			using[6*7 + 3*i + 2] -= bring;
		}
		
		
		for(let i = 0; i < using.length; i+=3){
			using[i] += .5 / 2
			using[i + 2] += bring / 2;
		}
		framefr.geometry.computeVertexNormals(); 	
	}
	
	return framefr;
}

function createFrameFrontLeft(vehicle, bring, thick){
	const geometry = objData.geo.car.windowFrameCornerFrontL;
	const framefl = new THREE.Mesh(
		geometry || new THREE.CylinderGeometry(1, 1, vehicle.h * vehicle.t, 6),
		objData.mat.car.windowFrameCorner
	);
	const pos = [
		[ .05 - thick, .05 - thick],
		[-.05 - thick, .05 - thick],
		[-.05 - thick, .05],
		[ .05, .05],
		[ .05, -.05],
		[ .05 - thick, -.05],
		[ .05 - thick, .05- thick]
	], top = [
		[ .05 - thick/2, .05 - thick/2],
		[-.05 - thick/2, .05 - thick/2],
		[-.05 - thick/2, .05],
		[ .05, .05],
		[ .05, -.05],
		[ .05 - thick/2, -.05],
		[ .05 - thick/2, .05- thick/2]
	];
	
	if(geometry === undefined){
		objData.geo.car.windowFrameCornerFrontL = framefl.geometry;
		
		const using = framefl.geometry.attributes.position.array;
		
		for(let i = 0; i < 7; i++){
			using[3 * i + 0] = pos[6 - i][0];
			using[3 * i + 2] = -pos[6 - i][1];
			
			using[3*7 + 3 * i + 0] = pos[6 - i][0];
			using[3*7 + 3 * i + 2] = -pos[6 - i][1];
			
			using[6*7 + 3*6 + 3 * i + 0] = top[6 - i][0]
			using[6*7 + 3*6 + 3 * i + 2] = -top[6 - i][1];
			
			using[9*7 + 6*6 + 3 * i + 0] = pos[6 - i][0];
			using[9*7 + 6*6 + 3 * i + 2] = -pos[6 - i][1];
			
			using[3*i] -= .5;
			using[3*i + 2] += bring;
			
			if(i == 6) continue;
			using[6*7 + 3 * i + 0] = .05 - thick / 2;
			using[6*7 + 3 * i + 2] = -.05 + thick / 2;
			
			using[9*7 + 3*6 + 3 * i + 0] = .05 - thick / 2;
			using[9*7 + 3*6 + 3 * i + 2] = -.05 + thick / 2;
		}
		
		for(let i = 0; i < 13; i++){
			using[6*7 + 3*i] -= .5;
			using[6*7 + 3*i + 2] += bring;
		}
		
		
		for(let i = 0; i < using.length; i+=3){
			using[i] += .5 / 2
			using[i + 2] -= bring / 2;
		}
		framefl.geometry.computeVertexNormals(); 	
	}
	return framefl;
}

function createFrameRear(vehicle, bring, thick){
	const geometry = objData.geo.car.windowFrameCornerRear;
	const framerear = new THREE.Mesh(
		geometry || new THREE.CylinderGeometry(1, 1, vehicle.h * vehicle.t, 6),
		objData.mat.car.windowFrameCorner
	);
	const pos = [
		[ .05 - thick, .05 - thick],
		[-.05 - thick, .05 - thick],
		[-.05 - thick, .05],
		[ .05, .05],
		[ .05, -.05],
		[ .05 - thick, -.05],
		[ .05 - thick, .05- thick]
	], top = [
		[ .05 - thick/2, .05 - thick/2],
		[-.05 - thick/2, .05 - thick/2],
		[-.05 - thick/2, .05],
		[ .05, .05],
		[ .05, -.05],
		[ .05 - thick/2, -.05],
		[ .05 - thick/2, .05- thick/2]
	];
	
	if(geometry === undefined){
		objData.geo.car.windowFrameCornerFrontRear = framerear.geometry;
		
		using = framerear.geometry.attributes.position.array;
		
		for(let i = 0; i < 7; i++){
			using[3 * i + 0] = pos[i][0];
			using[3 * i + 2] = pos[i][1];
			
			using[3*7 + 3 * i + 0] = pos[i][0];
			using[3*7 + 3 * i + 2] = pos[i][1];
			
			using[6*7 + 3*6 + 3 * i + 0] = top[i][0]
			using[6*7 + 3*6 + 3 * i + 2] = top[i][1];
			
			using[9*7 + 6*6 + 3 * i + 0] = pos[i][0];
			using[9*7 + 6*6 + 3 * i + 2] = pos[i][1];
			
			using[3*i] -=  bring;
			using[3*i + 2] -= bring;

			if(i==6) continue;
			using[6*7 + 3 * i + 0] = .05 - thick / 2;
			using[6*7 + 3 * i + 2] = .05 - thick / 2;
			
			using[9*7 + 3*6 + 3 * i + 0] = .05 - thick / 2;
			using[9*7 + 3*6 + 3 * i + 2] = .05 - thick / 2;
		}
		
		for(let i = 0; i < 13; i++){
			using[6*7 + 3*i] -= bring;
			using[6*7 + 3*i + 2] -= bring;
		}
		
		
		for(let i = 0; i < using.length; i+=3){
			using[i] += bring / 2
			using[i + 2] += bring / 2;
		}
		framerear.geometry.computeVertexNormals(); 	
	}
	
	return framerear;
}

function createFrameSide(vehicle, bring){
	const geometry = objData.geo.car.windowFrameSide;
	const frameside = new THREE.Mesh(
		geometry || new THREE.BoxGeometry(.2, vehicle.h * vehicle.t, .01),
		objData.mat.car.windowFrameSide
	);
	
	if(geometry === undefined){
		objData.geo.car.windowFrameSide = frameside.geometry;
			
		const using = frameside.geometry.attributes.position.array;
		using[0 + 2] -= bring;
		using[3 + 2] -= bring;
		using[12+ 2] -= bring;
		using[15+ 2] -= bring;
		using[24+ 2] -= bring - .01 / 2;
		using[27+ 2] -= bring - .01 / 2;
		using[30+ 2] -= bring;
		using[33+ 2] -= bring;
		using[48+ 2] -= bring;
		using[51+ 2] -= bring;
		using[60+ 2] -= bring;
		using[63+ 2] -= bring;
	}
	
	return frameside;
}

function createFrame(vehicle){
	let frame = new THREE.Group(); 
	const bring = .1;
	const thick = 0.01;

	let mesh = createFrameFrontRight(vehicle, bring, thick);
	mesh.position.x -= .5 / 2;
	mesh.position.z -= bring / 2;
	mesh.position.x += vehicle.l / 2 - vehicle.f - .05 + 0.01 / 2;
	mesh.position.y += vehicle.h / 2;
	mesh.position.z += vehicle.w / 2 - .05 + 0.01 / 2;
	frame.add(mesh);
	
	mesh = createFrameFrontLeft(vehicle, bring, thick);
	mesh.position.x -= .5 / 2;
	mesh.position.z += bring / 2;
	mesh.position.x += vehicle.l / 2 - vehicle.f - .05 + 0.01 / 2;
	mesh.position.y += vehicle.h / 2;
	mesh.position.z -= vehicle.w / 2 - .05 + 0.01 / 2;
	frame.add(mesh);
	
	mesh = createFrameRear(vehicle, bring, thick);
	mesh.position.x += bring / 2;
	mesh.position.z += bring / 2;
	mesh.position.x -= vehicle.l / 2 - .05 + 0.01 / 2;
	mesh.position.y += vehicle.h / 2;
	mesh.position.z -= vehicle.w / 2 - .05 + 0.01 / 2;
	mesh.rotation.y += Math.PI;
	frame.add(mesh);
	
	mesh = createFrameRear(vehicle, bring, thick);
	mesh.position.x += bring / 2;
	mesh.position.z -= bring / 2;
	mesh.position.x -= vehicle.l / 2 - .05 + 0.01 / 2;
	mesh.position.y += vehicle.h / 2;
	mesh.position.z += vehicle.w / 2 - .05 + 0.01 / 2;
	mesh.rotation.y -= Math.PI / 2;
	frame.add(mesh);
	
	mesh = createFrameSide(vehicle, bring);
	mesh.position.x -= .15;
	mesh.position.y += vehicle.h / 2;
	mesh.position.z += vehicle.w / 2;
	frame.add(mesh);
	
	mesh = createFrameSide(vehicle, bring);
	mesh.position.x -= .15;
	mesh.position.y += vehicle.h / 2;
	mesh.position.z -= vehicle.w / 2;
	mesh.rotation.y = Math.PI;
	frame.add(mesh);
	
	return frame;
}