import { useRef } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useLoader, useFrame } from "@react-three/fiber";
import particleTexture from "../texture/particleTexture.png";

export default function Particle(props) {
    const particleRef = useRef();

    const randomRotation = [Math.random(), Math.random()];

    useFrame(({clock}) => {
        const v = clock.getElapsedTime() * 0.25;
        particleRef.current.rotation.x = Math.PI * v * randomRotation[0];
        particleRef.current.rotation.y = Math.PI * v * randomRotation[1];
    })

	const matcapTexture = useLoader(
		TextureLoader,
		particleTexture
	);

	return (
		<mesh position={props.position} ref={particleRef}>
			<torusGeometry attach="geometry" args={[0.3, 0.2, 24, 100]} />
			<meshMatcapMaterial matcap={matcapTexture} />
		</mesh>
	);
}
