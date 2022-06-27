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
	
	//背景色設定
	scene.background = new THREE.Color( 0xffffff );
	
	//環境光設定
	const ambient = new THREE.AmbientLight(0xFFFFFF, .2)
	
	// カメラを作成
	const camera = new THREE.PerspectiveCamera(45, width / height);
	// カメラの初期座標を設定
	camera.position.set(0, 0, .1);
	
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
	//light.shadow.mapSize.width = 2048;
	//light.shadow.mapSize.height = 2048;
	//scene.add(light);
	
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
	
	scene.fog = new THREE.FogExp2(0x88888888, 0.0009765625);
	
	
	/*light = new THREE.SpotLight(0xFFFFFF, 1, 60, Math.PI / 4, 10, 0.5);
	light.position.set(-4, 23, 0);
	light.target.position.set(5, 0, 0);
	light.target.updateMatrixWorld();
	scene.add(light);*/
	
	
	//light = new THREE.AmbientLight(0xFFFFFF, 1.0);
	//scene.add(light);
	
	
	scene.add(ambient);
	
	
	const Objs = new THREE.Group();
	const Sky = createSky(scene);
	Objs.add(Sky);
	
	const Road = road(scene);
	Objs.add(Road);

	const Car = createCar(scene);
	Objs.add(Car.main);
	
	Car.main.rotation.y += Math.PI / 2;
	Car.main.scale.set(1.8, 1.8, 1.8);
	Car.main.position.x += 1.2;
	Car.main.position.y -= .3;
	
	scene.add(Objs);
	Objs.position.set(-1.9, -2.5, .4);
	
	update(); //繰り返しイベントへ 
	
	// 毎フレーム時に実行されるループイベントです
	function update() {
		// レンダリング
		renderer.render(scene, camera);
		requestAnimationFrame(update);
		/*light.position.x = camera.position.x;
		light.position.y = camera.position.y;
		light.position.z = camera.position.z;*/
		
		for(let i = 0; i < Car.wheel.length; i++){
			Car.wheel[i].rotation.z -= 0.5;
		}
		
		
		for(let i = 0; i < Road.children.length; i++) {
			Road.children[i].rotation.z -= 0.05;
		}
	  
		Sky.children[0].rotation.y += 0.0005;
		let d = Sky.children[0].rotation.y;
		
		//昼は消える
		for(let i = 0; i < Car.light.length; i++){
			continue;
			if(d){
				Car.light[i].intensity = 2;
			} else {
				Car.light[i].intensity = 0;
			}
		}
		
		scene.fog.density = 0.0009765625 + 0.0068359375 * Math.sin(d / 2) * Math.sin(d / 2);
	
		//min .1 max .6
		ambient.intensity = .35 + .25 * Math.cos(d + Math.PI * 3 / 4);
	}
}