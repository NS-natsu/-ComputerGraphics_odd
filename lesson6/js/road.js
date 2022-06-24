function road(scene){
	const textureLoader = new THREE.TextureLoader();
    const road = new THREE.Group();

    const torus_size = 10000;
    const torus_width = 23;
    const torus_angle = torus_size / 10;

    let mesh;
    let material = new THREE.MeshStandardMaterial();
    let geometry = new THREE.TorusGeometry( torus_size, torus_width, 3, torus_angle);

    /*const getSize = function(c){
    	return Math.sqrt(c.x * c.x + c.y * c.y + c.z * c.z);
    }
    const inner = function(a, b){
    	return a.x * b.x + a.y * b.y + a.z * b.z;
    }*/
    const cross = function(a, b){
    	return {
        	x : a.y * b.z - a.z * b.y,
        	y : a.z * b.x - a.x * b.z,
        	z : a.x * b.y - a.y * b.x,
    	};
    }
    
    let tmp;
    
    for(let i = 0; i < 3 * torus_angle; i+= 3){
    	let tmp1 = {
        	x:geometry.attributes.normal.array[i + 0],
        	y:geometry.attributes.normal.array[i + 1],
        	z:geometry.attributes.normal.array[i + 2]
		};
		let tmp2 = {
        	x:geometry.attributes.normal.array[i + 3],
        	y:geometry.attributes.normal.array[i + 4],
        	z:geometry.attributes.normal.array[i + 5]
      	};

        tmp1.x -= geometry.attributes.normal.array[i + 3 * (torus_angle + 1) + 0];
      	tmp1.y -= geometry.attributes.normal.array[i + 3 * (torus_angle + 1) + 1];
      	tmp1.z -= geometry.attributes.normal.array[i + 3 * (torus_angle + 1) + 2];

      	tmp2.x -= geometry.attributes.normal.array[i + 3 * (torus_angle + 1) + 0];
      	tmp2.y -= geometry.attributes.normal.array[i + 3 * (torus_angle + 1) + 1];
      	tmp2.z -= geometry.attributes.normal.array[i + 3 * (torus_angle + 1) + 2];

      tmp = cross(tmp1, tmp2);

      geometry.attributes.normal.array[i + 0] = tmp.x;
      geometry.attributes.normal.array[i + 1] = tmp.y;
      geometry.attributes.normal.array[i + 2] = tmp.z;
      geometry.attributes.normal.array[i + 3 * (torus_angle + 1) + 0] = tmp.x;
      geometry.attributes.normal.array[i + 3 * (torus_angle + 1) + 1] = tmp.y;
      geometry.attributes.normal.array[i + 3 * (torus_angle + 1) + 2] = tmp.z;
    }
    geometry.attributes.normal.array[3 * torus_angle + 0] = tmp.x;
    geometry.attributes.normal.array[3 * torus_angle + 1] = tmp.y;
    geometry.attributes.normal.array[3 * torus_angle + 2] = tmp.z;
    geometry.attributes.normal.array[3 * torus_angle + 3 * (torus_angle + 1) + 0] = tmp.x;
    geometry.attributes.normal.array[3 * torus_angle + 3 * (torus_angle + 1) + 1] = tmp.y;
    geometry.attributes.normal.array[3 * torus_angle + 3 * (torus_angle + 1) + 2] = tmp.z;
    
	geometry.attributes.normal.normalized = true;
    
    material.map = textureLoader.load("img/road.jpg");
    material.bumpMap = textureLoader.load("img/road-bump.jpg");
    material.bumpscale = 0.2;
    material.map.wrapS = THREE.RepeatWrapping;
    material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set(torus_size / 8, 3);
    material.bumpMap.wrapS = THREE.RepeatWrapping;
    material.bumpMap.wrapT = THREE.RepeatWrapping;
    material.bumpMap.repeat.set(torus_size / 8, 3);
    mesh = new THREE.Mesh( geometry, material );
    
    mesh.position.y -= torus_width / 2 + torus_size / 2 + 1;
    mesh.position.x += torus_size * Math.sqrt(3) / 2 + 13;
    mesh.rotation.x -= Math.PI / 2;
    mesh.rotation.y += Math.PI / 6;
    //torus.receiveShadow = true; //影がつく
    road.add(mesh);
    
    const torus_width2 = 20 * 3 / 2 - 7;
    
    geometry = new THREE.TorusGeometry( torus_size, torus_width2, 6, torus_angle);
    material = new THREE.MeshStandardMaterial({side: THREE.DoubleSide, transparent: true, overdraw: true});
    material.map = textureLoader.load("img/EOlMt9nPtM1zjeN1655908340_1655908353.png");
    material.bumpMap = textureLoader.load("img/tester-bump2.jpg");
    material.bumpscale = 0.2;
    material.map.wrapS = THREE.RepeatWrapping;
    material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set(torus_size / 16, 1);
    material.bumpMap.wrapS = THREE.RepeatWrapping;
    material.bumpMap.wrapT = THREE.RepeatWrapping;
    material.bumpMap.repeat.set(torus_size / 16, 1);
    
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.y -= - torus_width2 / 2 + torus_size / 2 + 1;
    mesh.position.x += torus_size * Math.sqrt(3) / 2 + 13;
    mesh.rotation.x -= Math.PI / 2;
    mesh.rotation.y += Math.PI / 6;
    road.add(mesh);

    scene.add(road);

    return road;
}