import { OrbitControls, Environment } from '@react-three/drei'
import Car from './Car.jsx'
import Light from './Light.jsx'
import { useControls } from 'leva'
import { useLoader } from '@react-three/fiber'
import { Bloom, EffectComposer, Vignette,Autofocus, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import AutoFocusDOF from './AutoFocusDOF.jsx'

export default function Experience()
{
    // const { AutoFocus } = useControls({
    //     AutoFocus: true,
        
    // })
    
    return <>
    
    <OrbitControls 
    minPolarAngle={Math.PI / 4} // 45 degrees from the top
    maxPolarAngle={Math.PI - Math.PI /2 } // 45 degrees from the bottom
    
    // Limit zoom
    minDistance={4} // Minimum zoom distance
    maxDistance={10} // Maximum zoom distance
    
    // Optional: Smooth zooming
    enableDamping={true}
    
    // Optional: Prevent rotation speed from being too fast
    rotateSpeed={0.25}/>
    
    <EffectComposer>
    {/* {AutoFocus && (
        <AutoFocusDOF
        bokehScale={3} //blur scale
        resolution={1024} //resolution (decrease for performance)
        focusRadius={1}  // Distance from camera where objects are in focus
    focalLength={0.001}
      />
    )} */}
    <Bloom mipmapBlur intensity={1.0}/>
    <ToneMapping mode={ToneMappingMode.ACES_FILMIC}/>
    
    </EffectComposer>
    
    
    
    <fog attach="fog" args={['black', 0, 18.5]} />
        <Environment 
        background={false} 
        files={'./textures/env7.hdr'} env 
        
        environmentIntensity={0.7}
        exp
        />
        <Light
        
        />
        
        <Car/>
    </>
}