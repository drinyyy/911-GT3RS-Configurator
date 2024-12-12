import React, { useRef } from 'react'
import { useGLTF,MeshReflectorMaterial,useTexture } from '@react-three/drei'

export default function Ground(props) {
  const { nodes, materials } = useGLTF('model/ground.glb')
  const shadowMap = useTexture('./textures/groundDiffuse1.png')
    
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ground.geometry}
        material={nodes.Ground.material}
        rotation={[-Math.PI / 2,0,0]}
      >
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={1}
          depthScale={1}
          minDepthThreshold={0.55}
          color="#fffffff"
          metalness={0.8}
          roughness={0.2}
         
            
            aoMapIntensity={2}
        />
        </mesh>
    </group>
  )
}

useGLTF.preload('/ground.glb')
