// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

let test;
let testm;
let test_;
let scene;
   
const arr = new Array();

function init() {
	// サイズを指定
	const width = 800
	const height = 600;
	
	// レンダラーを作成
	var renderer = new THREE.WebGLRenderer();
	document.body.appendChild(renderer.domElement);
	renderer.setSize(width, height);
	// レンダラー：シャドウを有効にする
	renderer.shadowMap.enabled = true;
	
	// シーンを作成
	scene = new THREE.Scene();
	
	// カメラを作成
	const camera = new THREE.PerspectiveCamera(45, width / height);
	// カメラの初期座標を設定
	camera.position.set(0, 0, 5);
	
	// カメラコントローラーを作成
	const controls = new THREE.OrbitControls(camera, document.body); 
	 
	// 平行光源(色、強さ）主光源
	const directionalLightM = new THREE.DirectionalLight(0xffffff, 0.3);
	directionalLightM.position.set(0, 10, -5);
	directionalLightM.castShadow = true; 
	//シーンに追加
	scene.add(directionalLightM);
	
	// 照明を作成SpotLight(色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率)
	let light = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 20, 0.2);
	light.position.set(0,0, 5);
	//light.target.position.set( 0, 5, -100 );
	// ライトに影を有効にする
	light.castShadow = true;
	arr.push(light);
	//light.shadow.mapSize.width = 2048;
	//light.shadow.mapSize.height = 2048;
	scene.add(light);
	
	// 平行光源(色、強さ）補助光源
	const directionalLightS = new THREE.DirectionalLight(0xffffff,0.3);
	directionalLightS.position.set(-1, -1, 1);
	// シーンに追加
	scene.add(directionalLightS);
	
	// helper
	const gridHelper = new THREE.GridHelper(2,10); // size, step
	scene.add(gridHelper);
	const axisHelper = new THREE.AxisHelper(5); //軸の長さ　X：赤、Y：緑、z：青
	scene.add(axisHelper);
	
	/*const textureLoader = new THREE.TextureLoader();
	
	scene.fog = new THREE.FogExp2(0x88888888, 0.0009765625);
	
	const skySize = 500;
	const skyGeometry = new THREE.CylinderGeometry( skySize, skySize, 5000, 32 );
	const skyMaterial = new THREE.MeshBasicMaterial({side: THREE.BackSide});
	skyMaterial.map = textureLoader.load("img/sky.jpg");
	skyMaterial.map.wrapS = THREE.MirroredRepeatWrapping;
	skyMaterial.map.wrapT = THREE.MirroredRepeatWrapping;
	skyMaterial.map.repeat.set(2, 2);
	const mats = [
		skyMaterial,
		new THREE.MeshBasicMaterial({color: 0, transparent: true, opacity: 0}),
		null
	];
	mats[2] = mats[1];
	const sky = new THREE.Mesh(skyGeometry, new THREE.MeshFaceMaterial(mats));
	
	sky.rotation.x += Math.PI / 4;
	
	const Sky = new THREE.Group();
	Sky.add(sky);
	Sky.position.x += 20;
	Sky.position.y += skySize / 2;
	Sky.rotation.z -= 0.5;
	Sky.rotation.x -= 0.5;
	
	//scene.add(Sky);
	arr.push(sky);*/
	
	/*light = new THREE.SpotLight(0xFFFFFF, 1, 60, Math.PI / 4, 10, 0.5);
	light.position.set(-4, 23, 0);
	light.target.position.set(5, 0, 0);
	light.target.updateMatrixWorld();
	scene.add(light);
	arr.push(light);*/
	
	
	//light = new THREE.AmbientLight(0xFFFFFF, 1.0);
	//scene.add(light);
	
	const ambient = new THREE.AmbientLight(0xFFFFFF, .2)
	
	scene.add(ambient);
	
	
	scene.background = new THREE.Color( 0xffffff );
	
	const Car = createCar(scene);
	//const Road = road(scene);
	//arr.push(Road);
	//arr.push(Car);
	      
	//arr.push(ambient);
	
	update(); //繰り返しイベントへ 
	
	// 毎フレーム時に実行されるループイベントです
	function update() {
		// レンダリング
		renderer.render(scene, camera);
		requestAnimationFrame(update);
		light.position.x = camera.position.x;
		light.position.y = camera.position.y;
		light.position.z = camera.position.z;
		return;
		
		
		/*arr[2].geometry.attributes.position.needsUpdate =true;
		arr[2].geometry.attributes.normal.needsUpdate =true;
		if(event){
			arr[2].rotation.z += 0.01;
		}
		return;
	
		for(let i = 0; i < Road.children.length; i++) {
			Road.children[i].rotation.z -= 0.05
		}*/
	  
		sky.rotation.y += 0.0005;
		let d = sky.rotation.y;
		//scene.fog.density = 0.0009765625 + 0.0068359375 * Math.sin(d / 2) * Math.sin(d / 2);
	
		//min .1 max .6
		ambient.intensity = .35 + .25 * Math.cos(d + Math.PI * 3 / 4);
	}
}