// ページの読み込みを待つ
window.addEventListener('DOMContentLoaded', init);

const objData = {
	txt: {},
	mat: {
		template: {
			normal: new THREE.MeshNormalMaterial(),
			lambert: new THREE.MeshLambertMaterial(),
			target: new THREE.MeshBasicMaterial({opacity: 0, transparent: true, depthTest: false})
		},
		car:{},
		env:{}
	},
	geo: {
		template: {
			smallBox: new THREE.BoxGeometry(.1, .1, .1)
		},
		car:{},
		env:{}
	},
	createMats: new Array(),
	init: function(){
		const txtLoader = new THREE.TextureLoader();
		objData.txt.wall = txtLoader.load("img/env/road/wall.jpg"); //road.js :263
		objData.txt.road = txtLoader.load("img/env/road/floor.jpg"); //road.js :238
		objData.txt.sky = txtLoader.load("img/env/sky/sky.jpg"); //sky.js :7


		objData.txt.color = txtLoader.load("img/car/color.jpg"); // sideMirror :7
		objData.txt.floor = txtLoader.load("img/car/interior/floor.jpg"); //interior.js :6
		
		objData.txt.wheel = {
			rubber: txtLoader.load("img/car/exterior/wheel/rubber.jpg"), //wheel.js :17
			rubberBump: txtLoader.load("img/car/exterior/wheel/rubberBump.jpg"), //wheel.js :18
			axis: txtLoader.load("img/car/exterior/wheel/axis.png"), //wheel.js :127
			axisBump: txtLoader.load("img/car/exterior/wheel/axisBump.jpg") //wheel.js :128
		};

		objData.txt.sole = [// body.js :6
			txtLoader.load("img/car/sole/sole0.jpg"),
			txtLoader.load("img/car/sole/sole1.jpg"),
			txtLoader.load("img/car/sole/sole2.jpg"),
			txtLoader.load("img/car/sole/sole3.jpg"),
			txtLoader.load("img/car/sole/sole4.jpg"),
		];

		objData.txt.body = {
			front: txtLoader.load("img/car/body/front.jpg"),// body.js :267
			rear: txtLoader.load("img/car/body/rear.jpg"),// body.js :271
			right: txtLoader.load("img/car/body/right.png"),// body.js :284
			left: txtLoader.load("img/car/body/left.png")// body.js :289
		}
		
		for(let i = 0; i < objData.createMats.length; i++){
			objData.createMats[i]();
		}
	}
};
   
const arr = new Array();

function init() {
	objData.init();
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
	let scene = new THREE.Scene();
	
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
	
	// 平行光源(色、強さ）補助光源
	const directionalLightS = new THREE.DirectionalLight(0xffffff,0.3);
	directionalLightS.position.set(-1, -1, 1);
	// シーンに追加
	scene.add(directionalLightS);
	
	scene.fog = new THREE.FogExp2(0x88888888, 0.0009765625);
	
	scene.add(ambient);
	
	
	const Objs = new THREE.Group();
	const Sky = createSky();
	Objs.add(Sky);

    const Circum = createCircumstance();
    Objs.add(Circum.main);

	const Car = createCar(false);
	Objs.add(Car.main);
	
	Car.main.rotation.y += Math.PI / 2;
	Car.main.scale.set(1.8, 1.8, 1.8);
	Car.main.position.x += 1.2;
	Car.main.position.y -= .3;
	
	scene.add(Objs);
    Objs.position.set(-1.9, -2.5, .4);

	objData.mat.car.body[4].transparent = false;
	objData.mat.car.body[5].transparent = false;
	
	update(); //繰り返しイベントへ 
	
	// 毎フレーム時に実行されるループイベントです
	function update() {
		// レンダリング
		renderer.render(scene, camera);
		requestAnimationFrame(update);

		Circum.update(0.0005);

		for(let i = 0; i < Car.wheel.length; i++){
			Car.wheel[i].rotation.z -= 0.5;
		}
		
		
	  
		Sky.children[0].rotation.y += 0.0005;
		let d = Sky.children[0].rotation.y;
		
		//昼は消える 未実装
		for(let i = 0; i < Car.light.length; i++){
			continue;
			if(d){
				Car.light[i].intensity = 2;
			} else {
				Car.light[i].intensity = 0;
			}
		}
		let tmp = Math.cos(2 * Math.PI * Math.sin(d) / 3);
		scene.fog.density = 0.0009765625 + 0.0068359375 * tmp * tmp;
	
		//min .1 max .6
		ambient.intensity = .35 + .25 * Math.cos(d + Math.PI * 3 / 4);
	}
}