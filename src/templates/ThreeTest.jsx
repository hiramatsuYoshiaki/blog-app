import React,{useEffect, useRef} from 'react'
import * as THREE from "three";

const ThreeTest = () => {
    const mount = useRef()
    
    
    useEffect(()=>{
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        mount.current.appendChild( renderer.domElement );
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshStandardMaterial( { color: 0x7e31eb } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
        scene.add( light );
        camera.position.z = 2;
        const animate = () => {
            requestAnimationFrame( animate ); 
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            cube.rotation.z += 0.01;
            renderer.render( scene, camera );
        };
        animate()

    },[])
    return (
        <div style={{color:'white'}} ref={mount}> 
            ThreeTest
        </div>
    )
}

export default ThreeTest
// https://justinclanglinais.medium.com/using-three-js-to-make-a-3d-scene-in-react-js-e24178098eee
// 2021.4.14 removal animation-page 
