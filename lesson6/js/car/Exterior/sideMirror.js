objData.createMats.push(function(){
	objData.mat.car.mirror = new THREE.MeshStandardMaterial({
        color: 0xffffff, metalness: 1.0, roughness: 0.5
    });

	objData.mat.car.sideMirror = new THREE.MeshLambertMaterial({
		map: objData.txt.color
	});
});
function createSideMirror(size, segment, side, rotate, mode) {
	const sideMirror = new THREE.Group();
	const type = 2*(.5 - side);

	const coatMaterial = objData.mat.car.sideMirror;
	
	
	let geom = objData.geo.car.sideMirrorFrame || [undefined, undefined];
	let mesh = new THREE.Mesh(
		geom[side] || new THREE.SphereGeometry(1, segment, segment),
		coatMaterial
	);
	
	const sideCorrect = [
		function(n){
			if(n < 0){
				n = -Math.sqrt(-n);
				n *= size.in;
			} else {
				n *= size.out;
			}
			return n;
		},
		function(n){
			if(n <= 0){
				n *= size.out;
			} else {
				n = Math.sqrt(n);
				n *= size.in;
			}
			return n;
		}
	];
	
	if(geom[side] === undefined){
		geom[side] = mesh.geometry;
		objData.geo.car.sideMirrorFrame = geom;
		//ミラーの形状の補正 元の形はsin(x)またはcos(x)
		//奥行 そのまま　定数倍(楕円に補正)
		//上　 そのまま　定数倍(楕円に補正)
		//下　 sin(πsin(x)/2) 　定数倍(楕円に補正)
		//内　 sqrt(|sin(x)|)　定数倍(楕円に補正)
		//外　 定数倍(楕円に補正)
		let using = mesh.geometry.attributes.position.array;
		for(let i =0; i < using.length; i+=3){
			if(using[i] < 0){
				using[i + 0] *= -1;
				mesh.geometry.attributes.normal.array[i + 0] *= -1;
			}
			using[i + 0] *= size.depth;
			if(using[i+1] < 0){
				using[i+1] = Math.sin(Math.PI * using[i+1] / 2);
				using[i+1] *= size.bottom;
			} else {
				using[i+1] *= size.top;
			}
			using[i + 2] = sideCorrect[side](using[i + 2]);
		}
	}
	mesh.rotation.y -= rotate;
	sideMirror.add(mesh);

	geom = objData.geo.car.sideMirror || [undefined, undefined];
    mesh = new THREE.Mesh(
        geom[side] || new THREE.CircleGeometry(1, segment * 2),
        objData.mat.car.mirror
    );
    if (mode) {
        mesh = new THREE.Reflector(
            mesh.geometry,
            {
                clipBias: 0.003,
                textureWidth: window.innerWidth * window.devicePixelRatio,
                textureHeight: window.innerHeight * window.devicePixelRatio,
                color: 0x889999
            }
        );
    }
	
	if(geom[side] === undefined){
		geom[side] = mesh.geometry;
		objData.geo.car.sideMirror = geom;
		
		using = mesh.geometry.attributes.position.array;
		for(let i =0; i < using.length; i+=3){
			using[i] = sideCorrect[side](using[i]);
			if(using[i+1] < 0){
				using[i+1] = Math.sin(Math.PI * using[i+1] / 2);
				using[i+1] *= size.bottom;
			} else {
				using[i+1] *= size.top;
			}
		}
	}
	mesh.rotation.y -= Math.PI / 2 + rotate;
	sideMirror.add(mesh);
	
	geom = objData.geo.car.sideMirrorAxis || [undefined, undefined];
	mesh = new THREE.Mesh(
		geom[side] || new THREE.CylinderGeometry(size.depth / 4, size.depth / 4, 1, 16),
		coatMaterial
	);
	if(geom[side] === undefined){
		geom[side] = mesh.geometry;
		objData.geo.car.sideMirrorAxis = geom;
	
		using = mesh.geometry.attributes.position.array;
		for(let i = 0; i <= 16; i++){
			let n = (2 * size.depth / 4) * (.5 - type * Math.cos(2 * Math.PI * i / 16)) / 2;
			using[3 * 17 + 3 * i + 1] += n;
			using[3 * 3 * 17 + 2 * 3 * 16 + 3 * i + 1] += n;
			
			using[3 * i + 1] *= 1.3;
			if(i  < 16) using[2 * 3 * 17 + i * 3 + 1] *= 1.3;
			using[2 * 3 * 17 + 3 * 16 + i * 3 + 1] *= 1.3;
			
			if(i == 16) continue;
			n = (2 * size.depth / 4) * .5;
			using[3 * 3 * 17 + 3 * 16 + 3 * i + 1] += n;
		}
	}
	
	mesh.rotation.x += type * .8;
	mesh.position.x += size.depth / 4 + .01 + Math.abs(rotate);
	let tmp = size.in + size.depth / 4 * Math.sin(-type*mesh.rotation.x);
	mesh.position.z -= type * tmp;
	mesh.position.y -= size.bottom * .7;

	sideMirror.add(mesh);
		
	return sideMirror;
}

function createRightMirror(vehicle, mode){
	//サイドミラー
	const segment = 32;
	const size = {
		depth: .8,
		top : 1.5,
		in : 1,
		out :2,
		bottom :1
	}
	const rightMirror = createSideMirror(size, segment, 0, .25, mode);
	rightMirror.position.x += .5;
	rightMirror.position.y -= vehicle.h * vehicle.u / 2;
	rightMirror.position.z += vehicle.w / 2 + (size.in + (size.depth / 4 + .5) * .199) * .125;
	
	rightMirror.scale.set(.125, .125, .125);
	
	return rightMirror;
}
function createLeftMirror(vehicle, mode){
	//サイドミラー
	const segment = 32;
	const size = {
		depth: .8,
		top : 1.5,
		in : 1,
		out :2,
		bottom :1
	}
	const leftMirror = createSideMirror(size, segment, 1, -.42, mode);
	leftMirror.position.x += .5;
	leftMirror.position.y -= vehicle.h * vehicle.u / 2;
	leftMirror.position.z -= vehicle.w / 2 + (size.in + (size.depth / 4 + .5) * .2) * .125;
	
	leftMirror.scale.set(.125, .125, .125);
	
	return leftMirror;
}