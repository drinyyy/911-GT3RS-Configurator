
import VolumeEffect from "./VolumeEffect.jsx"
import { forwardRef } from "react"
export default forwardRef (function Volume(props, ref)
{


    const effect = new VolumeEffect()
   
    return <primitive ref={ref} object = {effect} />
    
})