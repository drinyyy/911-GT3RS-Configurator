import React from 'react'

const NoisyFog = () => {
  // Predefined noise value
  const noiseOffset = 0.3;

  return (
    <fog 
      attach="fog" 
      args={[
        'black',  // base color
        2 + noiseOffset,  // near distance with noise
        7.5 + noiseOffset // far distance with noise
      ]} 
    />
  )
}

export default NoisyFog