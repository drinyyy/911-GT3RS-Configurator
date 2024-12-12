import { useGLTF, useTexture } from '@react-three/drei'
import React from "react";
import * as THREE from 'three'

export default function Light(props) {
  const { nodes } = useGLTF('./model/light2.glb')
  const shadowMap = useTexture('./textures/lightShadow2.png')
  shadowMap.flipY = false
  const customMaterial = new THREE.MeshStandardMaterial({
    color:0xffffff,
  
    aoMap: shadowMap,
    aoMapIntensity: 1
  })

  const emisiveLight = new THREE.MeshBasicMaterial({
    color: new THREE.Color(1.4, 1.2, 1.2)
    
  })



  return (
    <group {...props} dispose={null}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Light.geometry}
      material={emisiveLight}
      position={[-0.003, 2.31, -0.067]}
      scale={[1.3, 3.18, 2.609]}
    />
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Light2.geometry}
      material={customMaterial}
      position={[-0.003, 2.31, -0.067]}
      scale={[1.3, 3.18, 2.609]}
    />
  </group>
  )
}

useGLTF.preload('./model/light2.glb')