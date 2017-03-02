var app = app || {};
app.init = init;
app.animate = animate;
var container, points = [];
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
// createScene();

// function createScene(){
container = document.createElement('div');
container.setAttribute('id', 'container');
document.body.appendChild(container);
camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set( 0, 0, 50 );
scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClearColor = true;
container.appendChild(renderer.domElement);
controls = new THREE.OrbitControls( camera, renderer.domElement );
// var stats = new Stats();
// stats.showPanel( 0 );
// document.body.appendChild( stats.dom );
init();

function init() {
    var colors;
    var redColors = [0xff0000, 0xb20000, 0x7f0000, 0x000000, 0xffffff];
    var orangeColors = [0xffd700, 0xffa500, 0xff8c00, 0x000000, 0xffffff];
    var yellowColors = [0xffff66, 0xffff00, 0x999900, 0x000000, 0xffffff];
    var greenColors = [0x00ff00, 0x00b200, 0x006600, 0x000000, 0xffffff];
    var blueColors = [ 0x0900ff, 0x0078ff, 0x00f9ff, 0x000000, 0xffffff];
    var purpleColors = [0xee82ee, 0xff00ff, 0x9400d3, 0xffffff];
    for (var i = 0; i < 5000; i++) {
        var geometry = new THREE.Geometry();
        var vertex = new THREE.Vector3();
        // vertex.z = 20 * Math.sin(i/10);
        // vertex.y = 20 * Math.cos(i/10);
        // // vertex.y = i/100 * Math.cos(i/10) - i/100 * Math.sin(i/10);
        // vertex.x = 20 * Math.tan(i/100);
        geometry.vertices.push(vertex);
        geometry.colors.push(new THREE.Color(purpleColors[ Math.floor(Math.random() * purpleColors.length) ]));
        var material = new THREE.PointsMaterial( {
            size: 1,
            vertexColors: THREE.VertexColors,
            depthTest: false,
            opacity: 1,
            sizeAttenuation: false
        } );
        var mesh = new THREE.Points( geometry, material );
        scene.add( mesh );
        points.push( mesh );
    }
    document.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', onKeyDown, false);
    animate();
}


function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX ) * 7;
    mouseY = (event.clientY - windowHalfY ) * 7;
}

function animate() {
    app.animationFrame = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(animate);
    // stats.begin();
    render();
    // stats.end();
}

function render() {
    // var timeFrequencyData = new Uint8Array(analyser.fftSize);
    // var timeFloatData = new Float32Array(analyser.fftSize);
    // analyser.getByteTimeDomainData(timeFrequencyData);
    // analyser.getFloatTimeDomainData(timeFloatData);

    for (var j = 0; j < points.length; j++){
        var point = points[j];
        var n = 1;
        n +=2;
        point.position.x = 20 * Math.sin(j/10) * Math.cos(j);
        point.position.z = 20 * Math.sin(j) * Math.sin(j/10);
        point.position.y = 20 * Math.cos(j/10);
    }

    // vertex.z = 20 * Math.sin(i/10);
    // vertex.y = 20 * Math.cos(i/10);
    // // vertex.y = i/100 * Math.cos(i/10) - i/100 * Math.sin(i/10);
    // vertex.x = 20 * Math.tan(i/100);
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

function onKeyDown(e) {
    switch (e.which) {
        case 32:
            if (app.play) {
                app.audio.pause();
                app.play = false;
            } else {
                app.audio.play();
                app.play = true;
            }
            break;
    }
}

// }