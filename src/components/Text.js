import * as THREE from "three";
import { useMemo, useEffect, useRef } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { useLoader, extend } from "@react-three/fiber";

export default function Text(props) {
	extend({ TextGeometry });

	const textRef = useRef();

	useEffect(() => {
		textRef.current.geometry.computeBoundingBox();
        const boundingBox = textRef.current.geometry.boundingBox;
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        textRef.current.geometry.translate(-center.x,-center.y,-center.z);  
	}, []);

	const font = useLoader(
		FontLoader,
		"/fonts/helvetiker_regular.typeface.json"
	);

	const config = useMemo(
		() => ({
			font: font,
			size: 0.8,
			height: 0.2,
			curveSegments: 8,
			bevelEnabled: true,
			bevelThickness: 0.03,
			bevelSize: 0.02,
			bevelOffset: 0,
			bevelSegments: 4,
		}),
		[font]
	);
	const matcapTexture = useLoader(TextureLoader, "/texture/textTexture.png");
	return (
		<mesh ref={textRef}>
			<textGeometry args={["Hello, \nreact\n-three\n-fiber!", config]} />
			<meshMatcapMaterial matcap={matcapTexture} />
		</mesh>
	);
}
