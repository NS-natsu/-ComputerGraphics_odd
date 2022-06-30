function createChairHeadRest(angle){
	let geometry = objData.geo.car.chairHeadRest;
	let material = objData.mat.template.lambert;
	let headrest = new THREE.Mesh(
		geometry || new THREE.CylinderGeometry(1, 1, 2, angle),
		material);
	
	const head = {
		side: .7,
		front: 1
	}
	
	if(geometry === undefined){
		objData.geo.car.chairHeadRest = headrest.geometry;
		
		//形状の補正 元の形はsin(x)またはcos(x)
		//横 sqrt(|sin(x)|)　定数倍(楕円に補正)
		//上下 定数倍(楕円に補正)
		
		const using = headrest.geometry.attributes.position.array;
		for(let i =0; i < using.length; i+=3){/*
			if(using[i] < 0){
				using[i + 0] *= -1;
				mesh.geometry.attributes.normal.array[i + 0] *= -1;
			}
			using[i + 0] *= size.depth;*/
			
			/*let tmp = Math.sin(Math.PI * using[i] / 2)
			using[i] = Math.sqrt(Math.abs(tmp));
			if(tmp <= 0) using[i] *= -1;*/
			
			tmp = using[i];
			using[i] = Math.sqrt(Math.abs(tmp));
			if(tmp <= 0) using[i] *= -1;
			using[i] *= head.side;
			
			using[i+2] *= head.front;	
		}
		headrest.geometry.computeVertexNormals(); 
	}
	
	return headrest;
}

function createChairBody(angle){
	const geometry = objData.geo.car.chairBody;
	const material = objData.mat.template.lambert;
	const body = new THREE.Mesh(
		geometry || new THREE.CylinderGeometry(1, 1, 2, angle),
		material);
		
	if(geometry === undefined){
		objData.geo.car.chairBody = body.geometry;
	
		//形状の補正 元の形はsin(x)またはcos(x)
		//前 sqrt(|sin(x)|)　定数倍(楕円に補正)
		//後ろ sin(5πsin(x)/6)　定数倍(楕円に補正)
		//上下 定数倍(楕円に補正)
		const using = body.geometry.attributes.position.array;
		for(let i =0; i < using.length; i+=3){
			let tmp = 0;
			if(using[i+2] < 0){
				tmp = Math.sqrt(-using[i+2]);
				using[i+2] = -tmp;
			} else {
				tmp = Math.sin(5*Math.PI*using[i+2]/6);
				using[i+2] = Math.sqrt(Math.abs(tmp));
				if(tmp < 0) using[i+2] *= -1;
			}
			using[i+2] *= .3;
		}
		body.geometry.computeVertexNormals(); 	
	}
	return body;
}

function createChairSeat(angle){
	const geometry = objData.geo.car.chairSeat;
	const material = objData.mat.template.lambert;
	
	const seat = new THREE.Mesh(
		geometry || new THREE.CylinderGeometry(1, 1 - .4, 1, angle),
		material);
	
	if(geometry === undefined){
		objData.geo.car.chairSeat = seat.geometry;
		
		//形状の補正 元の形はsin(x)またはcos(x)
		//sqrt(|sin(πsin(x)/2)|)　定数倍(楕円に補正)
		using = seat.geometry.attributes.position.array;
		for(let i =0; i < using.length; i+=3){
			let tmp = Math.sin(Math.PI*using[i]/2);
			using[i] = Math.sqrt(Math.abs(tmp));
			if(tmp < 0) using[i] *= -1;
	
			tmp = Math.sin(Math.PI*using[i+2]/2);
			using[i+2] = Math.sqrt(Math.abs(tmp));
			if(tmp < 0) using[i+2] *= -1;
		}
		seat.geometry.computeVertexNormals(); 
	}
	
	return seat;
}

function createFrontChair(){
	const chair = new THREE.Group();
	
	const angle = 64;
	
	//ヘッドレスト
	let mesh = createChairHeadRest(angle);
	
	mesh.position.y += 1;
	mesh.rotation.x += Math.PI / 2;
	mesh.scale.set(.25, .5, .25);
	chair.add(mesh);
	
	//胴体部分
	mesh = createChairBody(angle);

	mesh.rotation.x += Math.PI / 2;
	mesh.rotation.y += 5 * Math.PI / 12;
	//mesh.scale.set(.7, 1, 1);
	
	chair.add(mesh);
	
	//座席部分
	mesh = createChairSeat(angle);
	
	mesh.position.y -= 1.2;
	mesh.position.x -= .95;
	//mesh.scale.set(.7, 1, 1);
	mesh.scale.set(1.05, .6, 1.05);
	chair.add(mesh);
	
	return chair;
}

function createRearChair(){
	const chair = new THREE.Group();
	
	const angle = 64;
	
	//ヘッドレスト
	let mesh = createChairHeadRest(angle);
	
	mesh.position.y += 1;
	mesh.position.z -= 1;
	mesh.rotation.x += Math.PI / 2;
	mesh.scale.set(.25, .5, .25);
	chair.add(mesh);
	
	mesh = createChairHeadRest(angle);
	
	mesh.position.y += 1;
	mesh.position.z += 1;
	mesh.rotation.x += Math.PI / 2;
	mesh.scale.set(.25, .5, .25);
	chair.add(mesh);
	
	//胴体部分
	mesh = createChairBody(angle);

	mesh.rotation.x += Math.PI / 2;
	mesh.rotation.y += 5 * Math.PI / 12;
	mesh.scale.set(1, 2, 1);
	
	chair.add(mesh);
	
	//座席部分
	
	mesh = createChairSeat(angle);
	
	mesh.position.y -= 1.2;
	mesh.position.x -= .95;
	//mesh.scale.set(.7, 1, 1);
	mesh.scale.set(1.05, .6, 1.05 * 2);
	chair.add(mesh);
	
	return chair;
}