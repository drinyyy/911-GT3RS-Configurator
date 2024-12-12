import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshReflectorMaterial,useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useEffect } from 'react'
import { useControls } from 'leva'
export default function Environment() {
    
    const shadowMap = useTexture('./textures/groundAO.jpg')
    
    
  
    

    return (
        <>
            {/* Ambient Light */}
            <ambientLight intensity={0.2} />

            {/* Point Light */}
            
                
          


            


            <mesh  
            rotation={[-Math.PI / 2, 0 , 0]} position={[0, -0.08, -0.3]}>
                <planeGeometry args={[35, 33]} />
                <MeshReflectorMaterial 
                    aoMap={shadowMap}
                    aoMapIntensity={1.0}
                    blur={[200, 440]}
                    resolution={1024}
                    mixBlur={3.3}
                    mixStrength={58}
                    depthScale={2.0}
                    minDepthThreshold={0.6}
                    color={'#cfcfcf'}
                    metalness={0.7}
                    roughness={0.4}
                    envMap={'none'}
                   
                />
            </mesh>

           
        </>
    )
}