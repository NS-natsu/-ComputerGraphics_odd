function road(scene) {
	const textureLoader = new THREE.TextureLoader();
    const road = new THREE.Group();

    const torus_size = 10000;
    const torus_width = 23;
    const torus_angle = torus_size / 10;

    let mesh;
    let material = new THREE.MeshStandardMaterial();//{shading: THREE.FlatShading}
    let geometry = new THREE.TorusGeometry( torus_size, torus_width, 3, torus_angle);

    /*const getSize = function(c){
    	return Math.sqrt(c.x * c.x + c.y * c.y + c.z * c.z);
    }
    const inner = function(a, b){
    	return a.x * b.x + a.y * b.y + a.z * b.z;
    }*/
    /*const cross = function(a, b){
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
    
	geometry.attributes.normal.normalized = true;*/
    
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
    
    geometry = new THREE.TorusGeometry( torus_size, torus_width, 6, torus_angle);
	material = new THREE.MeshStandardMaterial({side: THREE.DoubleSide});
    material.map = textureLoader.load("img/wall.jpg");
    material.bumpMap = textureLoader.load("img/wall.jpg");
    material.bumpscale = 0.2;
    material.map.wrapS = THREE.RepeatWrapping;
    material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set(torus_size / 16, 1);
    material.bumpMap.wrapS = THREE.RepeatWrapping;
    material.bumpMap.wrapT = THREE.RepeatWrapping;
    material.bumpMap.repeat.set(torus_size / 16, 1);
    
    mesh = new THREE.Mesh(geometry, material);

    mesh.position.y -= - torus_width / 2 + torus_size / 2 + 1;
    mesh.position.x += torus_size * Math.sqrt(3) / 2 + 13;
    mesh.rotation.x -= Math.PI / 2;
    mesh.rotation.y += Math.PI / 6;

	//回転
	for(let i = 0; i <= torus_angle; i++){
		const using = mesh.geometry.attributes;
		const offset = (torus_angle+1)*3;
		for(let j = 0; j < 6; j++){
			const pos = {
				x: using.position.array[offset*(j+1) + 3*i + 0],
				y: using.position.array[offset*(j+1) + 3*i + 1],
				z: using.position.array[offset*(j+1) + 3*i + 2]
			}, nor = {
				x: using.normal.array[offset*(j+1) + 3*i + 0],
				y: using.normal.array[offset*(j+1) + 3*i + 1],
				z: using.normal.array[offset*(j+1) + 3*i + 2]
			};
			using.position.array[offset*j + 3*i + 0] = pos.x;
			using.position.array[offset*j + 3*i + 1] = pos.y;
			using.position.array[offset*j + 3*i + 2] = pos.z;
			using.normal.array[offset*j + 3*i + 0] = nor.x;
			using.normal.array[offset*j + 3*i + 1] = nor.y;
			using.normal.array[offset*j + 3*i + 2] = nor.z;
		}
		using.position.array[offset*6 + 3*i + 0] = using.position.array[3*i + 0];
		using.position.array[offset*6 + 3*i + 1] = using.position.array[3*i + 1];
		using.position.array[offset*6 + 3*i + 2] = using.position.array[3*i + 2];
		using.normal.array[offset*6 + 3*i + 0] = using.normal.array[3*i + 0];
		using.normal.array[offset*6 + 3*i + 1] = using.normal.array[3*i + 1];
		using.normal.array[offset*6 + 3*i + 2] = using.normal.array[3*i + 2];
	}
	
	

	for(let i = 0; i <= torus_angle; i++){
		const using = mesh.geometry.attributes.position.array;
		const a = {
			x: using[(torus_angle+1)*3 + 3*i + 0],
			y: using[(torus_angle+1)*3 + 3*i + 1],
			z: using[(torus_angle+1)*3 + 3*i + 2]
		}, b = {
			x: using[3*i + 0],
			y: using[3*i + 1],
			z: using[3*i + 2]
		};
		
		using[3*i + 0] = (8 * a.x + 2 * b.x) / 10;
		using[3*i + 1] = (8 * a.y + 2 * b.y) / 10;
		using[3*i + 2] = (8 * a.z + 2 * b.z) / 10;
	}

	for(let i = 0; i <= torus_angle; i++){
		const using = mesh.geometry.attributes.position.array;
		const a = {
			x: using[(torus_angle+1)*3 * (6-1) + 3*i + 0],
			y: using[(torus_angle+1)*3 * (6-1) + 3*i + 1],
			z: using[(torus_angle+1)*3 * (6-1) + 3*i + 2]
		}, b = {
			x: using[(torus_angle+1)*3 * 6 + 3*i + 0],
			y: using[(torus_angle+1)*3 * 6 + 3*i + 1],
			z: using[(torus_angle+1)*3 * 6 + 3*i + 2]
		};
		
		using[(torus_angle+1)*3 * 6 + 3*i + 0] = (8 * a.x + 2 * b.x) / 10;
		using[(torus_angle+1)*3 * 6 + 3*i + 1] = (8 * a.y + 2 * b.y) / 10;
		using[(torus_angle+1)*3 * 6 + 3*i + 2] = (8 * a.z + 2 * b.z) / 10;
	}

    road.add(mesh);

    return road;
}

function createRoad(torus) {
    let road;
    const material = new THREE.MeshStandardMaterial();//{shading: THREE.FlatShading}
    const geometry = new THREE.TorusGeometry(torus.size, torus.width, 3, torus.angle);

    /*const getSize = function(c){
    	return Math.sqrt(c.x * c.x + c.y * c.y + c.z * c.z);
    }
    const inner = function(a, b){
    	return a.x * b.x + a.y * b.y + a.z * b.z;
    }*/
    /*const cross = function(a, b){
    	return {
        	x : a.y * b.z - a.z * b.y,
        	y : a.z * b.x - a.x * b.z,
        	z : a.x * b.y - a.y * b.x,
    	};
    }
    
    let tmp;
    
    for(let i = 0; i < 3 * torus.angle; i+= 3){
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

        tmp1.x -= geometry.attributes.normal.array[i + 3 * (torus.angle + 1) + 0];
      	tmp1.y -= geometry.attributes.normal.array[i + 3 * (torus.angle + 1) + 1];
      	tmp1.z -= geometry.attributes.normal.array[i + 3 * (torus.angle + 1) + 2];

      	tmp2.x -= geometry.attributes.normal.array[i + 3 * (torus.angle + 1) + 0];
      	tmp2.y -= geometry.attributes.normal.array[i + 3 * (torus.angle + 1) + 1];
      	tmp2.z -= geometry.attributes.normal.array[i + 3 * (torus.angle + 1) + 2];

      tmp = cross(tmp1, tmp2);

      geometry.attributes.normal.array[i + 0] = tmp.x;
      geometry.attributes.normal.array[i + 1] = tmp.y;
      geometry.attributes.normal.array[i + 2] = tmp.z;
      geometry.attributes.normal.array[i + 3 * (torus.angle + 1) + 0] = tmp.x;
      geometry.attributes.normal.array[i + 3 * (torus.angle + 1) + 1] = tmp.y;
      geometry.attributes.normal.array[i + 3 * (torus.angle + 1) + 2] = tmp.z;
    }
    geometry.attributes.normal.array[3 * torus.angle + 0] = tmp.x;
    geometry.attributes.normal.array[3 * torus.angle + 1] = tmp.y;
    geometry.attributes.normal.array[3 * torus.angle + 2] = tmp.z;
    geometry.attributes.normal.array[3 * torus.angle + 3 * (torus.angle + 1) + 0] = tmp.x;
    geometry.attributes.normal.array[3 * torus.angle + 3 * (torus.angle + 1) + 1] = tmp.y;
    geometry.attributes.normal.array[3 * torus.angle + 3 * (torus.angle + 1) + 2] = tmp.z;
    
	geometry.attributes.normal.normalized = true;*/

    material.map = objData.txt.road;
    material.bumpMap = material.map;
    material.bumpscale = 0.2;
    material.map.wrapS = THREE.RepeatWrapping;
    material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set(torus.size / 8, 3);
    material.bumpMap.wrapS = THREE.RepeatWrapping;
    material.bumpMap.wrapT = THREE.RepeatWrapping;
    material.bumpMap.repeat.set(torus.size / 8, 3);
    road = new THREE.Mesh(geometry, material);

    /*road.position.y -= torus.width / 2 + torus.size / 2 + 1;
    road.position.x += torus.size * Math.sqrt(3) / 2 + 13;
    road.rotation.x -= Math.PI / 2;
    road.rotation.y += Math.PI / 6;*/
    //road.receiveShadow = true; //影がつく

    return road;
}

function createWall(torus) {

    const geometry = new THREE.TorusGeometry(torus.size, torus.width, 6, torus.angle);
    const material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide });

    material.map = objData.txt.wall;
    material.bumpMap = material.map;
    material.bumpscale = 0.2;
    material.map.wrapS = THREE.RepeatWrapping;
    material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set(torus.size / 16, 1);
    material.bumpMap.wrapS = THREE.RepeatWrapping;
    material.bumpMap.wrapT = THREE.RepeatWrapping;
    material.bumpMap.repeat.set(torus.size / 16, 1);

    const mesh = new THREE.Mesh(geometry, material);

    //回転
    let using = mesh.geometry.attributes;
    for (let i = 0; i <= torus.angle; i++) {
        const offset = (torus.angle + 1) * 3;
        for (let j = 0; j < 6; j++) {
            const pos = {
                x: using.position.array[offset * (j + 1) + 3 * i + 0],
                y: using.position.array[offset * (j + 1) + 3 * i + 1],
                z: using.position.array[offset * (j + 1) + 3 * i + 2]
            }, nor = {
                x: using.normal.array[offset * (j + 1) + 3 * i + 0],
                y: using.normal.array[offset * (j + 1) + 3 * i + 1],
                z: using.normal.array[offset * (j + 1) + 3 * i + 2]
            };
            using.position.array[offset * j + 3 * i + 0] = pos.x;
            using.position.array[offset * j + 3 * i + 1] = pos.y;
            using.position.array[offset * j + 3 * i + 2] = pos.z;
            using.normal.array[offset * j + 3 * i + 0] = nor.x;
            using.normal.array[offset * j + 3 * i + 1] = nor.y;
            using.normal.array[offset * j + 3 * i + 2] = nor.z;
        }
        using.position.array[offset * 6 + 3 * i + 0] = using.position.array[3 * i + 0];
        using.position.array[offset * 6 + 3 * i + 1] = using.position.array[3 * i + 1];
        using.position.array[offset * 6 + 3 * i + 2] = using.position.array[3 * i + 2];
        using.normal.array[offset * 6 + 3 * i + 0] = using.normal.array[3 * i + 0];
        using.normal.array[offset * 6 + 3 * i + 1] = using.normal.array[3 * i + 1];
        using.normal.array[offset * 6 + 3 * i + 2] = using.normal.array[3 * i + 2];
    }


    using = mesh.geometry.attributes.position.array;
    for (let i = 0; i <= torus.angle; i++) {
        let offset = (torus.angle + 1) * 3 + 3 * i;
        const a = {
            x: using[(torus.angle + 1) * 3 + 3 * i + 0],
            y: using[(torus.angle + 1) * 3 + 3 * i + 1],
            z: using[(torus.angle + 1) * 3 + 3 * i + 2]
        }
        offset -= (torus.angle + 1) * 3;
        const b = {
            x: using[offset + 0],
            y: using[offset + 1],
            z: using[offset + 2]
        };

        using[offset + 0] = (8 * a.x + 2 * b.x) / 10;
        using[offset + 1] = (8 * a.y + 2 * b.y) / 10;
        using[offset + 2] = (8 * a.z + 2 * b.z) / 10;
    }

    for (let i = 0; i <= torus.angle; i++) {
        let offset = (torus.angle + 1) * 3 * (6 - 1) + 3 * i;
        const a = {
            x: using[offset + 0],
            y: using[offset + 1],
            z: using[offset + 2]
        }
        offset += (torus.angle + 1) * 3;
        const b = {
            x: using[offset + 0],
            y: using[offset + 1],
            z: using[offset + 2]
        };

        using[offset + 0] = (8 * a.x + 2 * b.x) / 10;
        using[offset + 1] = (8 * a.y + 2 * b.y) / 10;
        using[offset + 2] = (8 * a.z + 2 * b.z) / 10;
    }

    /*mesh.position.y -= - torus.width / 2 + torus.size / 2 + 1;
    mesh.position.x += torus.size * Math.sqrt(3) / 2 + 13;
    mesh.rotation.x -= Math.PI / 2;
    mesh.rotation.y += Math.PI / 6;*/

    return mesh;
}

function createCircumstance() {
    const stat = {
        size: 10000,
        width: 23,
        angle: 1000
    };

    const circum = new THREE.Group();

    let mesh = new THREE.Group();
	mesh.add(createRoad(stat));
	
    let wheel = new Array();
    let car, tmp;
	for(let i = 0; i < 4; i++){
	    car = createCar(false);
		tmp = new THREE.Group();
		
		car.main.position.y +=.43;
		car.main.rotation.y += Math.PI;
		tmp.add(car.main);
		
		//車道の中心へ移動
		tmp.scale.set(1.8, 1.8, 1.8);
		tmp.position.y =  stat.size + stat.width / 4;
	    tmp.position.z = stat.width * Math.sqrt(3) / 4;
	    tmp.rotation.x += Math.PI / 3;
	
		//車線へ移動
		tmp.position.y -= 1.05 * stat.width * Math.sqrt(3) / 4;
	    tmp.position.z += 1.05 * stat.width / 4;

		car.main = new THREE.Group();
		car.main.add(tmp);
		
        car.main.rotation.z += 0.1*i;

        wheel.push(car.wheel[0]);
        wheel.push(car.wheel[1]);
        wheel.push(car.wheel[2]);
        wheel.push(car.wheel[3]);
		
		mesh.add(car.main);
	}

    for(let i = 0; i < 2; i++){
        car = createCar(false);
        tmp = new THREE.Group();
        
        car.main.position.y +=.43;
        car.main.rotation.y += Math.PI;
        tmp.add(car.main);
        
        //車道の中心へ移動
        tmp.scale.set(1.8, 1.8, 1.8);
        tmp.position.y =  stat.size + stat.width / 4;
        tmp.position.z = stat.width * Math.sqrt(3) / 4;
        tmp.rotation.x += Math.PI / 3;
    
        //車線へ移動
        tmp.position.y -= .5 * stat.width * Math.sqrt(3) / 4;
        tmp.position.z += .5 * stat.width / 4;

        car.main = new THREE.Group();
        car.main.add(tmp);
        
        car.main.rotation.z += 0.4*i;

        wheel.push(car.wheel[0]);
        wheel.push(car.wheel[1]);
        wheel.push(car.wheel[2]);
        wheel.push(car.wheel[3]);
        
        mesh.add(car.main);
    }


    {//左側
        car = createCar(false);
        tmp = new THREE.Group();
        
        car.main.position.y +=.43;
        tmp.add(car.main);
        
        //車道の中心へ移動
        tmp.scale.set(1.8, 1.8, 1.8);
        tmp.position.y =  stat.size + stat.width / 4;
        tmp.position.z = stat.width * Math.sqrt(3) / 4;
        tmp.rotation.x += Math.PI / 3;
    
        //車線へ移動
        tmp.position.y += .5 * stat.width * Math.sqrt(3) / 4;
        tmp.position.z -= .5 * stat.width / 4;

        car.main = new THREE.Group();
        car.main.add(tmp);

        
        //car.main.rotation.z += 0.1;

        wheel.push(car.wheel[0]);
        wheel.push(car.wheel[1]);
        wheel.push(car.wheel[2]);
        wheel.push(car.wheel[3]);

        car.main.rotation.z += Math.PI * 11 / 60;
        
        mesh.add(car.main);
    }

    //mesh.position.y -= stat.size;

    mesh.position.y -= stat.width / 2 + stat.size / 2 + 1;
    mesh.position.x += stat.size * Math.sqrt(3) / 2 + 13;
    mesh.rotation.x -= Math.PI / 2;
    mesh.rotation.y += Math.PI / 6;
    mesh.rotation.z += Math.PI / 3;

    circum.add(mesh);

    mesh = createWall(stat);
    mesh.position.y -= - stat.width / 2 + stat.size / 2 + 1;
    mesh.position.x += stat.size * Math.sqrt(3) / 2 + 13;
    mesh.rotation.x -= Math.PI / 2;
    mesh.rotation.y += Math.PI / 6;

    circum.add(mesh);

    return {
        main: circum,
        whleel: wheel,
        update: function(d){
            circum.children[0].rotation.z += d;
            circum.children[1].rotation.z += d;
            circum.children[0].children[1].rotation.z += d;

            circum.children[0].children[5].rotation.z += .1*d;
            circum.children[0].children[6].rotation.z += .1*d;

            circum.children[0].children[7].rotation.z -= 1.1*d;

            for(let i = 0; i < wheel.length; i++){
                wheel[i].rotation.z -= 0.5;
            }
        }
    };
}