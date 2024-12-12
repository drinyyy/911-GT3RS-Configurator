import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { DepthOfField } from '@react-three/postprocessing'
import { Vector3 } from 'three'

export default function RadiusFocusDOF(
    { 
        bokehScale = 10, 
        focalLength = 0.001, 
        focusRadius = 500, 
        resolution = 512 
    }) 
{
    const { camera } = useThree()
    const ref = useRef()
    const cameraPosition = new Vector3()

    useFrame(() => {
        // Get the current camera position
        camera.getWorldPosition(cameraPosition)

        // Update the depth of field target to be directly in front of the camera
        if (ref.current) {
            ref.current.target = new Vector3(
                cameraPosition.x, 
                cameraPosition.y, 
                cameraPosition.z + focusRadius
            )
        }
    });

    return (
        <DepthOfField
            focalLength={focalLength}
            bokehScale={bokehScale}
            height={resolution}
            focusDistance={focusRadius}
            ref={ref}
        />
    );
};