var app = app || {};

window.onload = function(){

    var GuiControls = function(){
        this.red = false;
        this.orange = false;
        this.yellow = false;
        this.green = false;
        this.blue = false;
        this.purple = false;

    };

    var wave = new GuiControls();
    var gui = new dat.GUI();
    gui.add(wave, 'red').name('Red').listen().onChange(function(){
        wave.red = true;
        wave.orange = false;
        wave.yellow = false;
        wave.green = false;
        wave.blue = false;
        wave.purple = false;
        init();
        animate();
    });
    gui.add(wave, 'orange').name('Orange').listen().onChange(function(){
        wave.red = false;
        wave.orange = true;
        wave.yellow = false;
        wave.green = false;
        wave.blue = false;
        wave.purple = false;
        init();
        animate();
        // renderer.clearColor()
    });
    gui.add(wave, 'yellow').name('Yellow').listen().onChange(function(){
        wave.red = false;
        wave.orange = false;
        wave.yellow = true;
        wave.green = false;
        wave.blue = false;
        wave.purple = false;
        init();
        animate();
        // renderer.clearColor()
    });
    gui.add(wave, 'green').name('Green').listen().onChange(function(){
        wave.red = false;
        wave.orange = false;
        wave.yellow = false;
        wave.green = true;
        wave.blue = false;
        wave.purple = false;
        init();
        animate();
        // renderer.clearColor();
    });
    gui.add(wave, 'blue').name('Blue').listen().onChange(function(){
        wave.red = false;
        wave.orange = false;
        wave.yellow = false;
        wave.green = false;
        wave.blue = true;
        wave.purple = false;
        init();
        animate();
        // renderer.clearColor()
    });
    gui.add(wave, 'purple').name('Purple').listen().onChange(function(){
        wave.red = false;
        wave.orange = false;
        wave.yellow = false;
        wave.green = false;
        wave.blue = false;
        wave.purple = true;
        init();
        animate();
        // renderer.clearColor()
    });

    var container;
    var camera, scene, renderer;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    // init();
    // animate();
    container = document.createElement('div');
    container.setAttribute('id', 'container');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set( 100000, 0, 3200 );
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.autoClearColor = false;
    container.appendChild( renderer.domElement );
    function init() {
        if (app.canvas){
            clearCanvas();
        }
        var colors;
        var redColors = [0xff0000, 0xb20000, 0x7f0000, 0x000000, 0xffffff];
        var orangeColors = [0xffd700, 0xffa500, 0xff8c00, 0x000000, 0xffffff];
        var yellowColors = [0xffff66, 0xffff00, 0x999900, 0x000000, 0xffffff];
        var greenColors = [0x00ff00, 0x00b200, 0x006600, 0x000000, 0xffffff];
        var blueColors = [ 0x0900ff, 0x0078ff, 0x00f9ff, 0x000000, 0xffffff];
        var purpleColors = [0xee82ee, 0xff00ff, 0x9400d3, 0x000000, 0xffffff];
        if(wave.red){
            colors = redColors;
        }
        else if(wave.orange){
            colors = orangeColors;
        }
        else if(wave.yellow){
            colors = yellowColors;
        }
        else if(wave.green){
            colors = greenColors;
        }
        else if(wave.blue){
            colors = blueColors;
        }
        else if(wave.purple){
            colors = purpleColors;
        }
        points = [];
        for (var i = 0; i < 4000; i++) {
            var geometry = new THREE.Geometry();
            var vertex = new THREE.Vector3();
            vertex.x = Math.sin(i);
            vertex.y = Math.cos(i);
            vertex.z = Math.random() * (i/2);
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
            points.push( mesh );
        }

        // console.log(points[1].geometry.colors[0]);
        // console.log(points[1]);
        document.addEventListener( 'mousemove', onMouseMove, false );
        window.addEventListener( 'resize', onWindowResize, false );
        app.canvas = true;
    }

    function clearCanvas(){
        renderer.clearColor();
        renderer.clearStencil();
        renderer.clearDepth();
        // scene.remove( mesh );
        // geometry.dispose();
        // material.dispose();
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function onMouseMove(event) {
        mouseX = ( event.clientX - windowHalfX ) * 10;
        mouseY = ( event.clientY - windowHalfY ) * 10;
    }

    function animate() {
        requestAnimationFrame( animate );
        render();
    }

    function render() {

        camera.position.x += ( - mouseX - camera.position.x ) * .025;
        camera.position.y += ( mouseY - camera.position.y ) * .025;
        camera.lookAt( scene.position );
        renderer.render( scene, camera );

    }

};