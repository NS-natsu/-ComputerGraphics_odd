objData.createMats.push(function(){
	const bodyMaterial = new THREE.MeshPhysicalMaterial( {
		color: 0xff0000, metalness: 0.3, roughness: 0.5, clearcoat: 1.0, clearcoatRoughness: 0.03, sheen: 0.5
	} );

	//窓
	const glassMaterial = new THREE.MeshPhysicalMaterial( {
		color: 0x0, metalness: 0.25, roughness: 0, side: THREE.DoubleSide,
		opacity: .5, transparent: true//transmission: 1.0, 
	} );

	objData.mat.car.window = new THREE.MeshFaceMaterial([
		glassMaterial,	glassMaterial,	bodyMaterial,
		new THREE.MeshLambertMaterial({side: THREE.BackSide}),
		glassMaterial,	glassMaterial
	]);

});
function createWindow(vehicle){
	let geom = objData.geo.car.window;
	const win = new THREE.Mesh(
			geom || new THREE.BoxGeometry(vehicle.l - vehicle.f, vehicle.h * vehicle.t, vehicle.w),
			objData.mat.car.window
	);
    
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
	
	const bring = .1;
	
	if(geom === undefined){
		objData.geo.car.window = win.geometry;
		
		const vert = win.geometry.attributes.position.array;
		const normal = win.geometry.attributes.normal.array;
			
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
	}
		
	win.position.x -= vehicle.f / 2;
	win.position.y += vehicle.h / 2;

	return win
}