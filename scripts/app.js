window.onload = function(){

var container;
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
init();
animate();
function init() {
    container = document.createElement('div');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 100000, 0, 3200 );
    scene = new THREE.Scene();
    var colors = [ 0x0900ff, 0x0078ff, 0x00f9ff, 0x000000, 0xffffff];
    points = [];
    for (var i = 0; i < 2000; i++) {
        var geometry = new THREE.Geometry();
        var vertex = points[i++] = new THREE.Vector3();
        vertex.x = Math.sin(i);
        vertex.y = Math.cos(i);
        vertex.z = Math.random() * i;
        geometry.vertices.push( vertex );
        geometry.colors.push( new THREE.Color( colors[ Math.floor( Math.random() * colors.length ) ] ) );
        var material = new THREE.PointsMaterial( {
            size: 0.75,
            vertexColors: THREE.VertexColors,
            depthTest: false,
            opacity: 0.75,
            sizeAttenuation: false
            } );
        var mesh = new THREE.Points( geometry, material );
        scene.add( mesh );
        // console.log(mesh);
        points.push(mesh);
    }

    // console.log(points);

    renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClearColor = false;
    container.appendChild( renderer.domElement );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove(event) {
    mouseX = ( event.clientX - windowHalfX ) * 10;
    mouseY = ( event.clientY - windowHalfY ) * 10;
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    // for (var j = 0; j < points.length; j++){
    //     if(j%2===0) {
    //         point = points[j++];
    //         console.log(point);
    //         // var v = point.geometry;
    //         // console.log(v)
    //         point.x = ( mouseX ) * .05;
    //         point.y = ( - mouseY ) * .05;
    //     }
    // }

    camera.position.x += ( - mouseX - camera.position.x ) * .025;
    camera.position.y += ( mouseY - camera.position.y ) * .025;
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}

};