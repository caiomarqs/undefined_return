import * as THREE from 'three';

import { TextGeometry } from 'https://unpkg.com/three@0.161.0/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'https://unpkg.com/three@0.161.0/examples/jsm/loaders/FontLoader.js';
// import { TTFLoader } from 'https://unpkg.com/three@0.161.0/examples/jsm/loaders/TTFLoader.js';

import SceneInit from './libs/SceneInit.js';

const test = new SceneInit('myThreeJsCanvas');
test.initialize();
test.animate();

const loader = new FontLoader();

loader.load(
    'src/fonts/InterExtraBold.json', 
    font => {
        const textGeometry = new TextGeometry('UNDFINED_RETURN', {
            font: font,
            size: 3,
            height: 3,
            curveSegments: 20,
        });

        const textMaterial = new THREE.MeshPhongMaterial({
            color: 0x3597ff,
            emissive: 0x00264f,
            specular: 0x85c0ff,
            shininess: 64.4,
            fog: true,
            reflectivity: 1,
            refractionRatio: 0.98
        });

        textGeometry.computeBoundingBox();

        

        const centerOffset = - 0.5 * ( 
            textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x 
        );

    
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textGeometry.translate( centerOffset, 0, 0 );

        test.scene.add(textMesh);

        test.scene.fog = new THREE.Fog(0x023E7D, 70, 80);

        test.camera.position.set( 0, 0, 70 ); // this sets the boom's length 
        test.camera.lookAt( 0, 0, 0 ); // camera looks at the boom's zero
    }
)

