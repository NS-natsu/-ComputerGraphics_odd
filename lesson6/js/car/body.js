objData.createMats.push(function(){
	const tmp = [0,0,0,0,0,0];
	for(let i = 0; i < 5; i++){ //6枚目の面が現状不使用
		tmp[i] = new THREE.MeshStandardMaterial()
		tmp[i].map = objData.txt.sole[i];
		tmp[i].bumpMap = tmp[i].map;
		tmp[i].bumpscale = .2;
	}
	//影
	tmp[5] = new THREE.MeshBasicMaterial({color:0, opacity: .5, transparent: true});

	objData.mat.car.sole = new THREE.MeshFaceMaterial(tmp);
});
function createSole(vehicle){
	const using = objData.geo.car.sole;
	const sole = new THREE.Mesh(
			using || new THREE.BoxGeometry(1, 1, vehicle.w),
			objData.mat.car.sole
	);
	
	if(using === undefined) {
		objData.geo.car.sole = sole.geometry;
		const vert = sole.geometry.attributes.position.array;
		const normal = sole.geometry.attributes.normal.array;
	
		let tmp1 = [vehicle.l / 2, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		let tmp2 = [vehicle.w / 2, , 0, 0, 0, 0, 0, 0, 0, 0];
	
		tmp1[2] = tmp1[1] = tmp1[0] - .15;
		tmp1[4] = tmp1[3] = tmp1[2] - .925;
	
		tmp1[9] = -tmp1[0];
		tmp1[7] = tmp1[8] = tmp1[9] + .075;
		tmp1[5] = tmp1[6] = tmp1[7] + .925;
	
		tmp2[1] = tmp2[0] - .25;
		tmp2[2] = tmp2[0];
		tmp2[3] = tmp2[1];
		tmp2[4] = tmp2[2];
		for(let i = 0; i < 12 * 5; i += 3){
			vert[i] = tmp1[(i / 6)|0];
			vert[i+1] = 0;
			vert[i+2] = tmp2[(i / 12)|0];
			if(i % 2 == 1){
				vert[i+2] *= -1;
			}
		}
		
		const d = -.3;
		vert[60 + 0] = vehicle.l / 2;
		vert[60 + 1] = d;
		vert[60 + 2] = -vehicle.w / 2;
		
		vert[63 + 0] = vehicle.l / 2;
		vert[63 + 1] = d;
		vert[63 + 2] = vehicle.w / 2;
		
		vert[66 + 0] = -vehicle.l / 2;
		vert[66 + 1] = d;
		vert[66 + 2] = -vehicle.w / 2;
		
		vert[69 + 0] = -vehicle.l / 2;
		vert[69 + 1] = d;
		vert[69 + 2] = vehicle.w / 2;
		
		for(let i = 0; i < 12 * 5; i += 3){
			normal[i + 0] = 0;
			normal[i + 1] = -1;
			normal[i + 2] = 0;
		}
	
		for(let i = 0; i < 12; i+=3){
			normal[60 + i + 0] = 0;
			normal[60 + i + 1] = 1;
			normal[60 + i + 2] = 0;
		}
	}
	return sole;
}

objData.createMats.push(function(){
	objData.mat.car.cover = new THREE.MeshStandardMaterial({color: 0});
});
function createCover(vehicle){
	const using = objData.geo.car.cover;
	const cov = new THREE.Mesh(
		using || new THREE.CylinderGeometry(.5, .5, vehicle.w - .01, 16),
		objData.mat.car.cover
	);
	
	if(using === undefined){
		objData.geo.car.cover = cov.geometry;
		const vert = cov.geometry.attributes.position.array;	
	
		for(let i = 0; i < vert.length; i+=3){
			vert[i] = Math.abs(vert[i]);
		}
		for(let i = 0; i < 16; i++){
			vert[2*17*3 + 3*i + 0] = vert[2*17*3 + 3 * 16 + 3 * i + 0];
			vert[2*17*3 + 3*i + 1] = vert[2*17*3 + 3 * 16 + 3 * i + 1];
			vert[2*17*3 + 3*i + 2] = vert[2*17*3 + 3 * 16 + 3 * i + 2];
		
			vert[3*17*3 + 3 * 16 + 3*i + 0] = vert[3*17*3 + 6 * 16 + 3 * i + 0];
			vert[3*17*3 + 3 * 16 + 3*i + 1] = vert[3*17*3 + 6 * 16 + 3 * i + 1];
			vert[3*17*3 + 3 * 16 + 3*i + 2] = vert[3*17*3 + 6 * 16 + 3 * i + 2];
		}

	}
	
	cov.rotation.x -= Math.PI / 2;
	cov.rotation.y -= Math.PI / 2;

	cov.position.y -= .5;
	
	return cov;
}

objData.createMats.push(function(){
	const mats = [];
	for(let i = 0; i < 6; i++){
		mats[i] = new THREE.MeshPhysicalMaterial();
		mats[i].metalness = .3;
		mats[i].roughness = 0.5;
		mats[i].clearcoat = 1.0;
		mats[i].clearcoatRoughness = 0.03;
		mats[i].sheen = 0.5;
		mats[i].side = THREE.DoubleSide;
		mats[i].bumpscale = .2;
	}

	mats[0].map = objData.txt.body.front;
	mats[0].bumpMap = mats[0].map;
	
	mats[1].map = objData.txt.body.rear;
	mats[1].bumpMap = mats[1].map;

	mats[2].map = objData.txt.color;
	//mats[2].bumpMap = mats[2].map;
	
	mats[3].map = objData.txt.color;
	//mats[3].bumpMap = mats[3].map;

	mats[4].transparent = true;
	mats[4].map = objData.txt.body.right;
	mats[4].bumpMap = mats[4].map;
	
	mats[5].transparent = true;
	mats[5].map = objData.txt.body.left;
	mats[5].bumpMap = mats[5].map;

	objData.mat.car.body = new THREE.MeshFaceMaterial(mats);
});
function createBody(vehicle){
	const using = objData.geo.car.body;
	const body = new THREE.Mesh(
			using || new THREE.BoxGeometry(vehicle.l, vehicle.h * vehicle.u, vehicle.w),
			objData.mat.car.body
	);
	
	if(using === undefined){
		objData.geo.car.body = body.geometry;
		const vert = body.geometry.attributes.position.array;
		const normal = body.geometry.attributes.normal.array;
		
		
		//右　左　上　下　前　後
		//バンパー前後　フロント前後　側面
		vert[24] = vehicle.l / 2 - vehicle.f;
	
		vert[30] = vehicle.l / 2 - vehicle.f;
		//vert[31] += .15;
		vert[32] = 0;
		
		vert[35] = 0;
	
		vert[36] = vehicle.l / 2 - vehicle.f;
		vert[37] += vehicle.h * vehicle.u;
		vert[38] = 0;
		
		//vert[39] = 0;
		vert[40] += vehicle.h * vehicle.u;
		vert[41] = 0;
	
		vert[42] = vehicle.l / 2 - vehicle.f;
		vert[43] += vehicle.h * vehicle.u;
		vert[44] *= -1;
		
		//vert[45] = 0;
		vert[46] += vehicle.h * vehicle.u;
		vert[47] *= -1;
	
		normal[36 + 1] = 1;
		normal[39 + 1] = 1;
		
		//ボンネット
		normal[24+0] = 0;
		normal[24+1] = 1;
		normal[24+2] = -.5;
		normal[33+0] = 1;
		normal[33+1] = 1;
		normal[33+2] = 0;
		
		normal[39+0] = 1;
		normal[39+1] = 1;
		normal[39+2] = 0;		
		normal[42+0] = 0;
		normal[42+1] = 1;
		normal[42+2] = .5;
		
		//正面右上
		normal[ 0+0] = 1;
		normal[ 0+1] = 1;
		normal[ 0+2] = .5;
		normal[45+0] = 1;
		normal[45+1] = 1;
		normal[45+2] = .5;
		normal[51+0] = 1;
		normal[51+1] = 1;
		normal[51+2] = .5;
	
		//正面左上
		normal[ 3+0] = 1;
		normal[ 3+1] = 1;
		normal[ 3+2] = -.5;
		normal[27+0] = 1;
		normal[27+1] = 1;
		normal[27+2] = -.5;
		normal[60+0] = 1;
		normal[60+1] = 1;
		normal[60+2] = -.5;
		
		//正面右下
		normal[ 6+0] = 1;
		normal[ 6+1] = 0;
		normal[ 6+2] = .5;
		normal[57+0] = 1;
		normal[57+1] = 0;
		normal[57+2] = .5;
		
		//正面左下
		normal[ 9+0] = 1;
		normal[ 9+1] = 0;
		normal[ 9+2] = -.5;
		normal[66+0] = 1;
		normal[66+1] = 0;
		normal[66+2] = -.5;
	
		//背面左上
		normal[12+0] = -1;
		normal[12+1] = .5;
		normal[12+2] = -.5;
		normal[63+0] = -1;
		normal[63+1] = .5;
		normal[63+2] = -.5;
	
		normal[15+0] = -1;
		normal[15+1] = .5;
		normal[15+2] = .5;
		normal[48+0] = -1;
		normal[48+1] = .5;
		normal[48+2] = .5;
	
	
		normal[18+0] = -1;
		normal[18+1] = 0;
		normal[18+2] = -.5;
		normal[69+0] = -1;
		normal[69+1] = 0;
		normal[69+2] = -.5;
	
	
		normal[21+0] = -1;
		normal[21+1] = 0;
		normal[21+2] = .5;
		normal[54+0] = -1;
		normal[54+1] = 0;
		normal[54+2] = .5;
	    body.geometry.attributes.normal.normalized = true;
	}
	
	return body;
}