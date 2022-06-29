textures.createMaterials.push(function(){
	let material = new THREE.MeshStandardMaterial();
	material.map = textures.wheel.rubber;
	material.bumpMap = textures.wheel.rubberBump;
	material.bumpscale = 0.2;
	
	textures.materials.car.wheel = {};
	textures.materials.car.wheel.rubber = material;
    
    const mats = [
		new THREE.MeshStandardMaterial( {
			color: 0xffffff, metalness: .1, roughness: 0.5,
			side: THREE.DoubleSide
		} ),
		new THREE.MeshPhysicalMaterial( {
			metalness: .4, roughness: 0.5,
			side: THREE.DoubleSide
		} ),
		null
	];
	mats[2] = mats[1];
	mats[1].map = textures.wheel.axis;
	mats[1].bumpMap = textures.wheel.axisBump;
	mats[1].bumpscale;
	mats[1].transparent = true;
	textures.materials.car.wheel.axis = new THREE.MeshFaceMaterial(mats);

	textures.materials.car.wheel.center = new THREE.MeshPhysicalMaterial( {color: 0xffffff, metalness: .1, roughness: 0.5} );
});

function createRim(){
	const wheel = new THREE.Group();
	
	const size = 5;
	const angle = 32;
	const tick = 2;

	const vRad = .6;
	const hRad = 3;

	let mesh = new THREE.Mesh(
		new THREE.TorusGeometry( size, 1, angle, angle ),
		textures.materials.car.wheel.rubber
	);

	
	const usingArr = mesh.geometry.attributes.position.array;
	for(let i = 0; i <= angle; i++){
		const tmp = {
			x : Math.cos(i / angle * 2 * Math.PI),
			y : Math.sin(i / angle * 2 * Math.PI),
			z : 0
		}
		for(let j = 0; j <= angle; j++){
			const pos = i*3 + j*3*(angle+1);
			const tmp2 = {
				x : usingArr[pos + 0],
				y : usingArr[pos + 1],
				z : usingArr[pos + 2]
			};
			tmp2.x -= size * tmp.x;
			tmp2.y -= size * tmp.y;
			tmp2.z -= size * tmp.z;
			tmp2.x *= vRad;
			tmp2.y *= vRad;
			tmp2.z *= hRad

			usingArr[pos + 0] = tmp2.x + size * tmp.x;
			usingArr[pos + 1] = tmp2.y + size * tmp.y;
			usingArr[pos + 2] = tmp2.z + size * tmp.z;
		}
		for(let j = 0; j <= angle; j++){
			const pos = i*3 + j*3*(angle+1);
			const d = {
				x: tick * Math.cos(i / angle * 2 * Math.PI) / 2,
				y: tick * Math.sin(i / angle * 2 * Math.PI) / 2,
				z: 0
			}
			const k = {
				pos: Math.cos(j / angle * 2 * Math.PI),
				flag: false
			}
			if(k.pos < 0){
				if(-Math.sqrt(3) / 2 <= k.pos){
					d.x *= -1;
					d.y *= -1;
				} else k.flag = true;
			}
			usingArr[pos + 0] += d.x;
			usingArr[pos + 1] += d.y;
			usingArr[pos + 2] += d.z;
			if(k.flag){
				if(k.pos == -1){
					usingArr[pos + 0] += d.x;
					usingArr[pos + 1] += d.y;
					usingArr[pos + 2] += d.z;
				}else if(j / angle < 1/ 2){
					let p = i*3 + (j - 2)*3*(angle+1);
					usingArr[pos + 0] = usingArr[p + 0] + d.x;
					usingArr[pos + 1] = usingArr[p + 1] + d.y;
					usingArr[pos + 2] = usingArr[p + 2] + d.z;
				}else {
					let p = i*3 + (j + 2)*3*(angle+1);
					usingArr[pos + 0] = usingArr[p + 0] + d.x;
					usingArr[pos + 1] = usingArr[p + 1] + d.y;
					usingArr[pos + 2] = usingArr[p + 2] + d.z;
				}
			}
		}
	}

	wheel.add( mesh );
	//mesh.rotation.set(0, 0, Math.PI / 2);
				
	let tmp = {
		list: new Array(),
		
		flag: false
	}
	
	for(let i = 0; i <= angle; i++){
		const k = Math.cos(i / angle * 2 * Math.PI);
		
		if(tmp.flag === false && k < -Math.sqrt(3) / 2){
			tmp.flag = true;
			for(let j = 0; j <= angle; j++){
				tmp.list.push(usingArr[(i-2)*3*(angle+1) + j*3 + 1]);
				tmp.list.push(usingArr[(i-2)*3*(angle+1) + j*3 + 2] - .2);
				tmp.list.push(usingArr[(i-2)*3*(angle+1) + j*3 + 0]);
			}
		}else if(tmp.flag === true && -Math.sqrt(3) / 2 <= k){
			tmp.flag = false;
			for(let j = 0; j <= angle; j++){
				tmp.list.push(usingArr[(i+1)*3*(angle+1) + j*3 + 1]);
				tmp.list.push(usingArr[(i+1)*3*(angle+1) + j*3 + 2]);
				tmp.list.push(usingArr[(i+1)*3*(angle+1) + j*3 + 0]);
			}
		}
	}

	mesh = new THREE.Mesh(
		new THREE.CylinderGeometry( 1, 1, hRad, angle ),
		textures.materials.car.wheel.axis
	);
	
	let pos = 0;
	for(; pos < 6*(angle+1); pos++){
		mesh.geometry.attributes.position.array[pos] = tmp.list[pos];
	}
	
	let off = pos;
	for(let i = 0; i < angle * 3; i+=3){
		mesh.geometry.attributes.position.array[off + i + 0] = 0;
		mesh.geometry.attributes.position.array[off + i + 1] = tmp.list[1];
		mesh.geometry.attributes.position.array[off + i + 2] = 0;
	}
	off += angle * 3;
	for(pos = 0; pos < 3*(angle+1); pos++){
		mesh.geometry.attributes.position.array[pos + off] = tmp.list[pos];
	}
	for(let i = 0; i < angle * 3; i+=3){
		mesh.geometry.attributes.position.array[off + pos + i + 0] = 0;
		mesh.geometry.attributes.position.array[off + pos + i + 1] = -tmp.list[1];
		mesh.geometry.attributes.position.array[off + pos + i + 2] = 0;
	}
	off += angle * 3;
	for(; pos < 6*(angle+1); pos++){
		mesh.geometry.attributes.position.array[pos + off] = tmp.list[pos];
	}
	
	/*pos = 6*(angle+1) + angle * 3;
	for(let i = 0; i < 3*(angle+1);  i += 3){
		const rad = i / angle / 3 * 2 * Math.PI;
		mesh.geometry.attributes.normal.array[pos + i + 0] = -Math.sin(rad);
		mesh.geometry.attributes.normal.array[pos + i + 2] = -Math.cos(rad);
	}
	pos += 3*(angle+1) + 3 * angle;
	for(let i = 0; i < 3*(angle+1);  i += 3){
		const rad = i / angle / 3 * 2 * Math.PI;
		mesh.geometry.attributes.normal.array[pos + i + 0] = -Math.sin(rad);
		mesh.geometry.attributes.normal.array[pos + i + 2] = -Math.cos(rad);
	}*/
	mesh.rotation.x += Math.PI / 2;
	wheel.add(mesh);
	mesh = new THREE.Mesh(
		new THREE.CylinderGeometry( .5, .5, 2 * tmp.list[1] - .2, 32 ),
		textures.materials.car.wheel.center
	);
	mesh.rotation.x += Math.PI / 2;
	//wheel.add(mesh);
	return wheel;
}