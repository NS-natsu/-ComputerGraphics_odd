function createBody(vehicle){
	const textureLoader = new THREE.TextureLoader();
	const body = new THREE.Group();
	
	// materials
	const bodyMaterial = new THREE.MeshPhysicalMaterial( {
		color: 0xff0000, metalness: 0.3, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03, sheen: 0.5
	} );

	//窓
	const glassMaterial = new THREE.MeshPhysicalMaterial( {
		color: 0xffffff, metalness: 0.25, roughness: 0, transmission: 1.0, side: THREE.DoubleSide
	} );
	
	
	let mats = [
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
	mats[1].map = textureLoader.load("img/carBody/rear.jpg");
	//mats[0].bumpMap = textureLoader.load("img/carBody/front-bump.jpg");
	//mats[0].bumpscale = .2;
	mats[2].map = textureLoader.load("img/carBody/bonnet.jpg");
	mats[3].map = textureLoader.load("img/carBody/bonnet.jpg");

	mats[4].transparent = true;
	mats[4].map = textureLoader.load("img/carBody/ur.png");
	//mats[4].bumpMap = textureLoader.load("img/carBody/ur-bump.jpg");
	//mats[4].bumpscale = .2;
	
	mats[5].transparent = true;
	mats[5].map = textureLoader.load("img/carBody/ul.png");
	//mats[5].bumpMap = textureLoader.load("img/carBody/ul-bump.jpg");
	//mats[5].bumpscale = .2;
	
	let mesh = new THREE.Mesh(
			new THREE.BoxGeometry(vehicle.l, vehicle.h * vehicle.u, vehicle.w),
			new THREE.MeshFaceMaterial(mats)
	);
	
	//右　左　上　下　前　後
	//バンパー前後　フロント前後　側面
	mesh.geometry.attributes.position.array[24] = vehicle.l / 2 - vehicle.f;

	mesh.geometry.attributes.position.array[30] = vehicle.l / 2 - vehicle.f;
	//mesh.geometry.attributes.position.array[31] += .15;
	mesh.geometry.attributes.position.array[32] = 0;
	
	mesh.geometry.attributes.position.array[35] = 0;

	mesh.geometry.attributes.position.array[36] = vehicle.l / 2 - vehicle.f;
	mesh.geometry.attributes.position.array[37] += vehicle.h * vehicle.u;
	mesh.geometry.attributes.position.array[38] = 0;
	
	//mesh.geometry.attributes.position.array[39] = 0;
	mesh.geometry.attributes.position.array[40] += vehicle.h * vehicle.u;
	mesh.geometry.attributes.position.array[41] = 0;

	mesh.geometry.attributes.position.array[42] = vehicle.l / 2 - vehicle.f;
	mesh.geometry.attributes.position.array[43] += vehicle.h * vehicle.u;
	mesh.geometry.attributes.position.array[44] *= -1;
	
	//mesh.geometry.attributes.position.array[45] = 0;
	mesh.geometry.attributes.position.array[46] += vehicle.h * vehicle.u;
	mesh.geometry.attributes.position.array[47] *= -1;

	mesh.geometry.attributes.normal.array[36 + 1] = 1;
	mesh.geometry.attributes.normal.array[39 + 1] = 1;
	
	//ボンネット
	mesh.geometry.attributes.normal.array[24+0] = 0;
	mesh.geometry.attributes.normal.array[24+1] = 1;
	mesh.geometry.attributes.normal.array[24+2] = -.5;
	mesh.geometry.attributes.normal.array[33+0] = 1;
	mesh.geometry.attributes.normal.array[33+1] = 1;
	mesh.geometry.attributes.normal.array[33+2] = 0;
	
	mesh.geometry.attributes.normal.array[39+0] = 1;
	mesh.geometry.attributes.normal.array[39+1] = 1;
	mesh.geometry.attributes.normal.array[39+2] = 0;		
	mesh.geometry.attributes.normal.array[42+0] = 0;
	mesh.geometry.attributes.normal.array[42+1] = 1;
	mesh.geometry.attributes.normal.array[42+2] = .5;
	
	//正面右上
	mesh.geometry.attributes.normal.array[ 0+0] = 1;
	mesh.geometry.attributes.normal.array[ 0+1] = 1;
	mesh.geometry.attributes.normal.array[ 0+2] = .5;
	mesh.geometry.attributes.normal.array[45+0] = 1;
	mesh.geometry.attributes.normal.array[45+1] = 1;
	mesh.geometry.attributes.normal.array[45+2] = .5;
	mesh.geometry.attributes.normal.array[51+0] = 1;
	mesh.geometry.attributes.normal.array[51+1] = 1;
	mesh.geometry.attributes.normal.array[51+2] = .5;

	//正面左上
	mesh.geometry.attributes.normal.array[ 3+0] = 1;
	mesh.geometry.attributes.normal.array[ 3+1] = 1;
	mesh.geometry.attributes.normal.array[ 3+2] = -.5;
	mesh.geometry.attributes.normal.array[27+0] = 1;
	mesh.geometry.attributes.normal.array[27+1] = 1;
	mesh.geometry.attributes.normal.array[27+2] = -.5;
	mesh.geometry.attributes.normal.array[60+0] = 1;
	mesh.geometry.attributes.normal.array[60+1] = 1;
	mesh.geometry.attributes.normal.array[60+2] = -.5;
	
	//正面右下
	mesh.geometry.attributes.normal.array[ 6+0] = 1;
	mesh.geometry.attributes.normal.array[ 6+1] = 0;
	mesh.geometry.attributes.normal.array[ 6+2] = .5;
	mesh.geometry.attributes.normal.array[57+0] = 1;
	mesh.geometry.attributes.normal.array[57+1] = 0;
	mesh.geometry.attributes.normal.array[57+2] = .5;
	
	//正面左下
	mesh.geometry.attributes.normal.array[ 9+0] = 1;
	mesh.geometry.attributes.normal.array[ 9+1] = 0;
	mesh.geometry.attributes.normal.array[ 9+2] = -.5;
	mesh.geometry.attributes.normal.array[66+0] = 1;
	mesh.geometry.attributes.normal.array[66+1] = 0;
	mesh.geometry.attributes.normal.array[66+2] = -.5;

	//背面左上
	mesh.geometry.attributes.normal.array[12+0] = -1;
	mesh.geometry.attributes.normal.array[12+1] = .5;
	mesh.geometry.attributes.normal.array[12+2] = -.5;
	mesh.geometry.attributes.normal.array[63+0] = -1;
	mesh.geometry.attributes.normal.array[63+1] = .5;
	mesh.geometry.attributes.normal.array[63+2] = -.5;

	mesh.geometry.attributes.normal.array[15+0] = -1;
	mesh.geometry.attributes.normal.array[15+1] = .5;
	mesh.geometry.attributes.normal.array[15+2] = .5;
	mesh.geometry.attributes.normal.array[48+0] = -1;
	mesh.geometry.attributes.normal.array[48+1] = .5;
	mesh.geometry.attributes.normal.array[48+2] = .5;


	mesh.geometry.attributes.normal.array[18+0] = -1;
	mesh.geometry.attributes.normal.array[18+1] = 0;
	mesh.geometry.attributes.normal.array[18+2] = -.5;
	mesh.geometry.attributes.normal.array[69+0] = -1;
	mesh.geometry.attributes.normal.array[69+1] = 0;
	mesh.geometry.attributes.normal.array[69+2] = -.5;


	mesh.geometry.attributes.normal.array[21+0] = -1;
	mesh.geometry.attributes.normal.array[21+1] = 0;
	mesh.geometry.attributes.normal.array[21+2] = .5;
	mesh.geometry.attributes.normal.array[54+0] = -1;
	mesh.geometry.attributes.normal.array[54+1] = 0;
	mesh.geometry.attributes.normal.array[54+2] = .5;
    mesh.geometry.attributes.normal.normalized = true;

	body.add(mesh);

	let using = mesh.geometry.attributes.position.array;
	
	mesh = new THREE.Mesh(
			new THREE.BoxGeometry(vehicle.l - vehicle.f, vehicle.h * vehicle.t, vehicle.w),
			new THREE.MeshFaceMaterial([
				glassMaterial,
				glassMaterial,
				bodyMaterial,
				new THREE.MeshStandardMaterial({color: 0}),//下側
				glassMaterial,
				glassMaterial
			])
	);
	
	mesh.position.z += 0.01;
	mesh.position.x -= vehicle.f / 2;
	mesh.position.y += vehicle.h / 2 - .01;	

	mesh.geometry.attributes.position.array[37] -= vehicle.h * vehicle.u - .1;
	mesh.geometry.attributes.position.array[39] += vehicle.f;
	mesh.geometry.attributes.position.array[40] -= vehicle.h * vehicle.u - .1;
	mesh.geometry.attributes.position.array[43] -=  vehicle.h * vehicle.u - .1;
	mesh.geometry.attributes.position.array[45] += vehicle.f;
	mesh.geometry.attributes.position.array[46] -=  vehicle.h * vehicle.u - .1;

	mesh.geometry.attributes.position.array[0] -= .5;
	mesh.geometry.attributes.position.array[3] -= .5;
	mesh.geometry.attributes.position.array[27] -= .5;
	mesh.geometry.attributes.position.array[33] -= .5;
	mesh.geometry.attributes.position.array[51] -= .5;
	mesh.geometry.attributes.position.array[60] -= .5;

	const bring = .1;
	mesh.geometry.attributes.position.array[2] -= bring;
	mesh.geometry.attributes.position.array[35] -= bring;
	mesh.geometry.attributes.position.array[53] -= bring;

	mesh.geometry.attributes.position.array[5] += bring;
	mesh.geometry.attributes.position.array[29] += bring;
	mesh.geometry.attributes.position.array[62] += bring;
	
	mesh.geometry.attributes.position.array[15] += bring;
	mesh.geometry.attributes.position.array[30] += bring;
	mesh.geometry.attributes.position.array[48] += bring;

	mesh.geometry.attributes.position.array[12] += bring;
	mesh.geometry.attributes.position.array[24] += bring;
	mesh.geometry.attributes.position.array[63] += bring;

	mesh.geometry.attributes.position.array[17] -= bring;
	mesh.geometry.attributes.position.array[32] -= bring;
	mesh.geometry.attributes.position.array[50] -= bring;

	mesh.geometry.attributes.position.array[14] += bring;
	mesh.geometry.attributes.position.array[26] += bring;
	mesh.geometry.attributes.position.array[65] += bring;

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
    
	using = mesh.geometry.attributes;
	for(let i = 0; i < 6; i++){
		const tmp1 = {
				x: using.position.array[12 * i + 3 + 0] - using.position.array[12 * i+ 0],
				y: using.position.array[12 * i + 3 + 1] - using.position.array[12 * i+ 1],
				z: using.position.array[12 * i + 3 + 2] - using.position.array[12 * i+ 2]	
		}, tmp2 = {
				x: using.position.array[12 * i + 6 + 0] - using.position.array[12 * i+ 0],
				y: using.position.array[12 * i + 6 + 1] - using.position.array[12 * i+ 1],
				z: using.position.array[12 * i + 6 + 2] - using.position.array[12 * i+ 2]	
		}
		const tmp = cross(tmp2, tmp1);

		for(let j = 0; j < 4; j++){
			using.normal.array[12 * i + 3 * j + 0] = tmp.x;
			using.normal.array[12 * i + 3 * j + 1] = tmp.y;
			using.normal.array[12 * i + 3 * j + 2] = tmp.z;
		}
	}
	
    mesh.geometry.attributes.normal.normalized = true;

	//前面窓
	//mesh.geometry.attributes.normal.array[ 0+ 0];
	mesh.geometry.attributes.normal.array[ 0+ 1] += .3;
	mesh.geometry.attributes.normal.array[ 0+ 2] += .1;
	//mesh.geometry.attributes.normal.array[ 3+ 0];
	mesh.geometry.attributes.normal.array[ 3+ 1] += .3;
	mesh.geometry.attributes.normal.array[ 3+ 2] -= .1;
	mesh.geometry.attributes.normal.array[ 6+ 0];
	//mesh.geometry.attributes.normal.array[ 6+ 1];
	mesh.geometry.attributes.normal.array[ 6+ 2] += .1;
	//mesh.geometry.attributes.normal.array[ 9+ 0];
	//mesh.geometry.attributes.normal.array[ 9+ 1];
	mesh.geometry.attributes.normal.array[ 9+ 2] -= .1;
	
	//背面窓
	//mesh.geometry.attributes.normal.array[12+ 0];
	mesh.geometry.attributes.normal.array[12+ 1] += .3;
	mesh.geometry.attributes.normal.array[12+ 2] -= .1;
	//mesh.geometry.attributes.normal.array[15+ 0];
	mesh.geometry.attributes.normal.array[15+ 1] += .3;
	mesh.geometry.attributes.normal.array[15+ 2] += .1;
	//mesh.geometry.attributes.normal.array[18+ 0];
	//mesh.geometry.attributes.normal.array[18+ 1];
	mesh.geometry.attributes.normal.array[18+ 2] -= .1;
	//mesh.geometry.attributes.normal.array[21+ 0];
	//mesh.geometry.attributes.normal.array[21+ 1];
	mesh.geometry.attributes.normal.array[21+ 2] += .1;
	
	//天井
	mesh.geometry.attributes.normal.array[24+ 0] -= .3;
	//mesh.geometry.attributes.normal.array[24+ 1];
	mesh.geometry.attributes.normal.array[24+ 2] -= .1;
	mesh.geometry.attributes.normal.array[27+ 0] += .3;
	//mesh.geometry.attributes.normal.array[27+ 1];
	mesh.geometry.attributes.normal.array[27+ 2] += .1;
	mesh.geometry.attributes.normal.array[30+ 0] -= .3;
	//mesh.geometry.attributes.normal.array[30+ 1];
	mesh.geometry.attributes.normal.array[30+ 2] -= .1;
	mesh.geometry.attributes.normal.array[33+ 0] += .3;
	//mesh.geometry.attributes.normal.array[33+ 1];
	mesh.geometry.attributes.normal.array[33+ 2] += .1;
	
	body.add(mesh);
	
	using = mesh.geometry.attributes;
	/** 中身*/
	mesh = new THREE.Mesh(
			new THREE.BoxGeometry(vehicle.l - vehicle.f - .03, vehicle.h * vehicle.u - 0.2, vehicle.w - .02),
			//new THREE.BoxGeometry(vehicle.l - vehicle.f,  * vehicle.t, vehicle.w),
			new THREE.MeshFaceMaterial([
				new THREE.MeshBasicMaterial({color: 0xdddddd, side: THREE.BackSide}),
				new THREE.MeshBasicMaterial({color: 0xdddddd, side: THREE.BackSide}),
				new THREE.MeshBasicMaterial({color: 0xdddddd, side: THREE.BackSide}),
				new THREE.MeshBasicMaterial({map: textureLoader.load("img/image146.jpg"), side: THREE.BackSide}),
				new THREE.MeshBasicMaterial({color: 0xdddddd, side: THREE.BackSide}),
				new THREE.MeshBasicMaterial({color: 0xdddddd, side: THREE.BackSide})
			])
	);
	for(let i = 0; i < 12; i++){
		mesh.geometry.attributes.position.array[24 + i] = using.position.array[24 + i];
		mesh.geometry.attributes.normal.array[24 + i] = using.normal.array[24 + i];
	}
	mesh.geometry.attributes.position.array[24 + 1] += vehicle.h * vehicle.t + .09;
	mesh.geometry.attributes.position.array[27 + 0] -= .03;
	mesh.geometry.attributes.position.array[27 + 1] += vehicle.h * vehicle.t + .09;
	mesh.geometry.attributes.position.array[30 + 1] += vehicle.h * vehicle.t + .09;
	mesh.geometry.attributes.position.array[33 + 0] -= .03;
	mesh.geometry.attributes.position.array[33 + 1] += vehicle.h * vehicle.t + .09;

	mesh.position.x -= vehicle.f / 2;
	mesh.position.y += .1;
	
	body.add(mesh);
	
	mesh = new THREE.Mesh(
		new THREE.CylinderGeometry(.5, .5, vehicle.w - .01, 16),
		new THREE.MeshStandardMaterial({color: 0})
	);
	
	using = mesh.geometry.attributes.position.array;
	for(let i = 0; i < using.length; i+=3){
		using[i + 0] = Math.abs(using[i + 0]);
		using[i + 2] = Math.abs(using[i + 2]);
	}
	for(let i = 0; i < 16; i++){
		using[2*17*3 + 3*i + 0] = using[2*17*3 + 3 * 16 + 3 * i + 0];
		using[2*17*3 + 3*i + 1] = using[2*17*3 + 3 * 16 + 3 * i + 1];
		using[2*17*3 + 3*i + 2] = using[2*17*3 + 3 * 16 + 3 * i + 2];
		
		using[3*17*3 + 3 * 16 + 3*i + 0] = using[3*17*3 + 6 * 16 + 3 * i + 0];
		using[3*17*3 + 3 * 16 + 3*i + 1] = using[3*17*3 + 6 * 16 + 3 * i + 1];
		using[3*17*3 + 3 * 16 + 3*i + 2] = using[3*17*3 + 6 * 16 + 3 * i + 2];
	}

	mesh.rotation.x -= Math.PI / 2;
	mesh.rotation.y -= Math.PI / 2;

	mesh.position.x += vehicle.l / 2 - vehicle.f + .1;
	mesh.position.y -= .4;
	
	body.add(mesh);

	body.position.y += .5;
	//body.position.x += 1.2;
	
	return body;
}