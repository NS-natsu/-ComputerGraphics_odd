function createSole(vehicle){
	const textureLoader = new THREE.TextureLoader;
	const mat = [0, 0, 0, 0, 0, 0];
	for(let i = 0; i < 5; i++){
		mat[i] = new THREE.MeshStandardMaterial()
		mat[i].map = textureLoader.load("img/car/sole/sole" + i + ".jpg");
		mat[i].bumpMap = mat[i].map;
		mat[i].bumpscale = .2;
	}
	const sole = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, vehicle.w),
			new THREE.MeshFaceMaterial(mat)
	);
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
	
	return sole;
}

function createWindow(vehicle){
	const bodyMaterial = new THREE.MeshPhysicalMaterial( {
		color: 0xff0000, metalness: 0.3, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03, sheen: 0.5
	} );

	//窓
	const glassMaterial = new THREE.MeshPhysicalMaterial( {
		color: 0x0, metalness: 0.25, roughness: 0, side: THREE.DoubleSide,
		opacity: .5, transparent: true//transmission: 1.0, 
	} );
	const win = new THREE.Mesh(
			new THREE.BoxGeometry(vehicle.l - vehicle.f, vehicle.h * vehicle.t, vehicle.w),
			new THREE.MeshFaceMaterial([
				glassMaterial,
				glassMaterial,
				bodyMaterial,
				new THREE.MeshLambertMaterial({side: THREE.BackSide}),
				glassMaterial,
				glassMaterial
			])
	);
	
	const vert = win.geometry.attributes.position.array;
	const normal = win.geometry.attributes.normal.array;
	
	win.position.x -= vehicle.f / 2;
	win.position.y += vehicle.h / 2;
		
	//下(後部床に持ってくる)
	vert[36 + 0 + 1] += .5;
	vert[36 + 3 + 0] -= vehicle.l - vehicle.f - .25;
	vert[36 + 3 + 1] = vert[36 + 0 + 1];
	vert[36 + 6 + 1] = vert[36 + 0 + 1];
	vert[36 + 9 + 0] = vert[36 + 3 + 0];
	vert[36 + 9 + 1] = vert[36 + 0 + 1];

	vert[37] -= vehicle.h * vehicle.u - .1;
	vert[39] += vehicle.f;
	vert[40] -= vehicle.h * vehicle.u - .1;
	vert[43] -=  vehicle.h * vehicle.u - .1;
	vert[45] += vehicle.f;
	vert[46] -=  vehicle.h * vehicle.u - .1;

	vert[0] -= .5;
	vert[3] -= .5;
	vert[27] -= .5;
	vert[33] -= .5;
	vert[51] -= .5;
	vert[60] -= .5;

	const bring = .1;
	vert[2] -= bring;
	vert[35] -= bring;
	vert[53] -= bring;

	vert[5] += bring;
	vert[29] += bring;
	vert[62] += bring;
	
	vert[15] += bring;
	vert[30] += bring;
	vert[48] += bring;

	vert[12] += bring;
	vert[24] += bring;
	vert[63] += bring;

	vert[17] -= bring;
	vert[32] -= bring;
	vert[50] -= bring;

	vert[14] += bring;
	vert[26] += bring;
	vert[65] += bring;

    const cross = function(a, b){
    	let n =  {
        	x : a.y * b.z - a.z * b.y,
        	y : a.z * b.x - a.x * b.z,
        	z : a.x * b.y - a.y * b.x,
    	};
    	let norm = Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z);
    	n.x /= norm;
    	n.y /= norm;
    	n.z /= norm;
    	return n;
    }

	for(let i = 0; i < 6; i++){
		const tmp1 = {
				x: vert[12 * i + 3 + 0] - vert[12 * i+ 0],
				y: vert[12 * i + 3 + 1] - vert[12 * i+ 1],
				z: vert[12 * i + 3 + 2] - vert[12 * i+ 2]	
		}, tmp2 = {
				x: vert[12 * i + 6 + 0] - vert[12 * i+ 0],
				y: vert[12 * i + 6 + 1] - vert[12 * i+ 1],
				z: vert[12 * i + 6 + 2] - vert[12 * i+ 2]	
		}
		const tmp = cross(tmp2, tmp1);

		for(let j = 0; j < 4; j++){
			normal[12 * i + 3 * j + 0] = tmp.x;
			normal[12 * i + 3 * j + 1] = tmp.y;
			normal[12 * i + 3 * j + 2] = tmp.z;
		}
	}
	
    win.geometry.attributes.normal.normalized = true;

	//前面窓
	//normal[ 0+ 0];
	normal[ 0+ 1] += .3;
	normal[ 0+ 2] += .1;
	//normal[ 3+ 0];
	normal[ 3+ 1] += .3;
	normal[ 3+ 2] -= .1;
	normal[ 6+ 0];
	//normal[ 6+ 1];
	normal[ 6+ 2] += .1;
	//normal[ 9+ 0];
	//normal[ 9+ 1];
	normal[ 9+ 2] -= .1;
	
	//背面窓
	//normal[12+ 0];
	normal[12+ 1] += .3;
	normal[12+ 2] -= .1;
	//normal[15+ 0];
	normal[15+ 1] += .3;
	normal[15+ 2] += .1;
	//normal[18+ 0];
	//normal[18+ 1];
	normal[18+ 2] -= .1;
	//normal[21+ 0];
	//normal[]21+ 1];
	normal[21+ 2] += .1;
	
	//天井
	normal[24+ 0] -= .3;
	//normal[24+ 1];
	normal[24+ 2] -= .1;
	normal[27+ 0] += .3;
	//normal[27+ 1];
	normal[27+ 2] += .1;
	normal[30+ 0] -= .3;
	//normal[30+ 1];
	normal[30+ 2] -= .1;
	normal[33+ 0] += .3;
	//normal[33+ 1];
	normal[33+ 2] += .1;

	return win
}


function createCover(vehicle){
	const cov = new THREE.Mesh(
		new THREE.CylinderGeometry(.5, .5, vehicle.w - .01, 16),
		new THREE.MeshStandardMaterial({color: 0})
	);
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

	cov.rotation.x -= Math.PI / 2;
	cov.rotation.y -= Math.PI / 2;
	
	cov.position.y -= .5;
	
	return cov;
	
}

function createBody(vehicle){
	const textureLoader = new THREE.TextureLoader();
	
	const mats = [
		new THREE.MeshPhysicalMaterial( {
			metalness: .3, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03, sheen: 0.5,
			side: THREE.DoubleSide
		} ),
		new THREE.MeshPhysicalMaterial( {
			metalness: .3, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03, sheen: 0.5,
			side: THREE.DoubleSide
		} ),
		new THREE.MeshPhysicalMaterial( {
			metalness: .3, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03, sheen: 0.5
		} ),
		new THREE.MeshPhysicalMaterial( {
			metalness: .3, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03, sheen: 0.5
		} ),
		new THREE.MeshPhysicalMaterial( {
			metalness: .3, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03, sheen: 0.5,
			side: THREE.DoubleSide
		} ),
		new THREE.MeshPhysicalMaterial( {
			metalness: .3, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03, sheen: 0.5,
			side: THREE.DoubleSide
		} )
	];

	mats[0].map = textureLoader.load("img/carBody/front.jpg");
	mats[0].bumpMap = mats[0].map;
	mats[0].bumpscale = .2;
	
	mats[1].map = textureLoader.load("img/carBody/rear.jpg");
	mats[1].bumpMap = mats[1].map;
	mats[1].bumpscale = .2;

	mats[2].map = textureLoader.load("img/carBody/bonnet.jpg");
	//mats[2].bumpMap = mats[2].map;
	//mats[2].bumpscale = .2;
	
	mats[3].map = textureLoader.load("img/carBody/bonnet.jpg");
	//mats[3].bumpMap = mats[3].map;
	//mats[3].bumpscale = .2;

	mats[4].transparent = true;
	mats[4].map = textureLoader.load("img/carBody/ur.png");
	mats[4].bumpMap = mats[4].map;
	mats[4].bumpscale = .2;
	
	mats[5].transparent = true;
	mats[5].map = textureLoader.load("img/carBody/ul.png");
	mats[5].bumpMap = mats[5].map;
	mats[5].bumpscale = .2;
	
	const body = new THREE.Mesh(
			new THREE.BoxGeometry(vehicle.l, vehicle.h * vehicle.u, vehicle.w),
			new THREE.MeshFaceMaterial(mats)
	);
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
	
	return body;
}