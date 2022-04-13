import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, SpotLight } from "@react-three/drei";
import Text from "./components/Text";
import Particle from "./components/Particle";

export default function App() {
    const Donuts = [];
    for (let i = 0; i < 122; i++) {
        const randomPostition = [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20];
        Donuts.push(<Particle key={i} position={randomPostition}/>);
    }

	return (
		<Canvas camera={{ fov: 55, position: [0, 0, 10]}}>
			<Suspense fallback={null}>
				<Text />
                <Particle />
                {Donuts}
                <color attach="background" args={['#B22222']} />
			</Suspense>

			<OrbitControls />
		</Canvas>
	);
}
