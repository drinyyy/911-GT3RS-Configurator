import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect } from 'react'
import { useControls } from 'leva'
export default function Environment() {
    
 
    // const { 
    //     blurX, 
    //     blurY, 
    //     resolution, 
    //     mixBlur, 
    //     mixStrength, 
    //     depthScale, 
    //     minDepthThreshold, 
    //     color, 
    //     metalness, 
    //     roughness,
    //     envMapIntensity
        
    // } = useControls('Reflector Material', {
    //     blurX: { value: 200, min: 0, max: 1000, step: 10 },
    //     blurY: { value: 100, min: 0, max: 1000, step: 10 },
    //     resolution: { value: 1024, min: 256, max: 2048, step: 256 },
    //     mixBlur: { value: 1.65, min: 0, max: 5, step: 0.05 },
    //     mixStrength: { value: 100, min: 0, max: 200, step: 1 },
    //     depthScale: { value: 1, min: 0, max: 5, step: 0.1 },
    //     minDepthThreshold: { value: 0.2, min: 0, max: 1, step: 0.05 },
    //     color: '#d1d1d1',
    //     metalness: { value: 0.9, min: 0, max: 1, step: 0.01 },
    //     roughness: { value: 0.3, min: 0, max: 1, step: 0.01 },
    //     envMapIntensity: { value: 0, min: 0, max: 10, step: 0.1 }
    // })
    

    return (
        <>
            {/* Ambient Light */}
            <ambientLight intensity={0.2} />

            {/* Point Light */}
            {/* <pointLight 
                position={[0, 5, 0]} 
                intensity={10} 
                color="white" 
               
            /> */}
                
          
            {/* Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]}>
                <planeGeometry args={[30, 30]} />
                <MeshReflectorMaterial 
                    blur={[200, 440]}
                    resolution={1024}
                    mixBlur={3.3}
                    mixStrength={58}
                    depthScale={2.0}
                    minDepthThreshold={0.6}
                    color={'#838383'}
                    metalness={0.59}
                    roughness={0.3}
                    envMap={'none'}
                    
                />
            </mesh>

           
        </>
    )
}