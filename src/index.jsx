import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'

import Experience from './Experience.jsx'
import Environment from './Environment.jsx'

import { Suspense, useEffect, useState } from "react";
import { LoadingScreen } from './LoadingOverlay.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <>
       
        <Canvas
            shadows
            
            camera={ {
                fov: 45,
                near: 0.1,
                far: 70,
                position: [ 3, 1, 5 ]
            } }
        >
            <color args={ [ '#000000' ] } attach="background" />
            <Suspense>
            <Experience /> 
            <Environment/>
            
            </Suspense>
            
        </Canvas>
        <LoadingScreen  />
    </>
)