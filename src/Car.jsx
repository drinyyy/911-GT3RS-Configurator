import React, { useEffect, useRef } from 'react'
import { useGLTF,useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { useControls,folder } from 'leva'

const createTexture = (path, repeatX = 1, repeatY = 1, flipY = false) => {
    const texture = useTexture(path).clone()
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(repeatX, repeatY)
    if (flipY) texture.flipY = false
    return texture
}





const createMaterials = (textures) => {
    const { colorBody,bodymaterialType,colorCarbon,
            Rims,rimsmaterialType,Caliper,calipermaterialType,rimCovers,Springs,
            seatMainMaterial,seatSecondaryMaterial,roofMaterial,wheelMaterial, stitchMaterial } = useControls({
        Body: folder({
        colorBody: { 
            value: '#ffffff',
            label: 'Body Paint',
            input: 'color'
        },
        bodymaterialType: {
            value: 0.5, 
            min: 0,
            max: 1,
            step: 0.01,
            label: 'Metal←→Matt'
          },
          
          colorCarbon: { 
            value: '#ffffff',
            label: 'Carbon Color',
            input: 'color'
        },
        },{ collapsed: true }),

        Wheels: folder({
            Rims: { 
                value: '#680202',
                label: 'Rims',
                input: 'color'
            },
            rimsmaterialType: {
                value: 0.5, 
                min: 0,
                max: 1,
                step: 0.01,
                label: 'Metal←→Matt'
              },
              
              Caliper: { 
                value: '#ffc900',
                label: 'Caliper Color',
                input: 'color'
            },
            calipermaterialType: {
                value: 0.5, 
                min: 0,
                max: 1,
                step: 0.01,
                label: 'Metal←→Matt'
              },

              rimCovers: { 
                value: '#000000',
                label: 'Center Wheel Color',
                input: 'color'
            },

            Springs: { 
                value: '#fa1100',
                label: 'Springs Color',
                input: 'color'
            },
        },{ collapsed: true }),

        Interior: folder({

            seatMainMaterial: { 
                value: '#887659',
                label: 'SeatMain',
                input: 'color'
            },
            seatSecondaryMaterial: { 
                value: '#787777',
                label: 'SeatSecondary',
                input: 'color'
            },
            roofMaterial: { 
                value: '#5a4b2b',
                label: 'Roof Color',
                input: 'color'
            },
            wheelMaterial: { 
                value: '#5a4b2b',
                label: 'SteerWheel Color',
                input: 'color'
            },
            stitchMaterial: { 
                value: '#5a4b2b',
                label: 'Stitch Color',
                input: 'color'
            },
        },{ collapsed: true }),
    })
    
    const metalnesss = 1 - bodymaterialType;
    const roughnesss = bodymaterialType;

    const rimsmetalnesss = 1 - rimsmaterialType;
    const rimsroughnesss = rimsmaterialType;

    const calipermetalnesss = 1 - calipermaterialType;
    const caliperroughnesss = calipermaterialType;
    return {
        //-----------------------------MATERIALS FOR CONFIGURATION----------------------------------------//
        bodyColor: new THREE.MeshStandardMaterial({
            
            color: colorBody,
            aoMap: textures.aoTexture,
            aoMapIntensity: 0.8,
            roughness: roughnesss,
            metalness: metalnesss,
           
        }),
    carbonColor: new THREE.MeshStandardMaterial({
            map: textures.carbonTexture,
            color: colorCarbon,
            roughness: 0.2,
            metalness: 0.8,
            
            normalMap: textures.carbonNormal,
    }),

    carbonColor2: new THREE.MeshStandardMaterial({
        map: textures.carbonTextureInterior,
        color: 0x787878,
        roughness: 0.2,
        metalness: 0.8,
        
        normalMap: textures.carbonNormalInterior,
    }),

    rimsColor: new THREE.MeshStandardMaterial({
        color: Rims, 
        roughness: rimsmetalnesss,
        metalness: rimsroughnesss,
    }),

    rimsCovers: new THREE.MeshStandardMaterial({
        color: rimCovers, 
        roughness: 0.2,
        metalness: 0.9,
    }),


    caliperColor: new THREE.MeshStandardMaterial({
        color: Caliper,
        roughness: caliperroughnesss,
        metalness: calipermetalnesss,
       
    }),

    brakeDiskColor: new THREE.MeshStandardMaterial({
        color: 0x615400, 
        opacity: 0.5,
        
    }),


    springsColor:new THREE.MeshStandardMaterial({
        color: Springs,
        roughness: 0.2,
        metalness: 0.8,
       
    }),


    seatMainColor: new THREE.MeshStandardMaterial({
        color: seatMainMaterial, 
        roughness: 1.0,
        metalness: 0.0,
        aoMap:textures.seatAO,
        aoMapIntensity:1.1
    }),

    seatSecondaryColor: new THREE.MeshStandardMaterial({
        color: seatSecondaryMaterial, 
        roughness: 1.0,
        metalness: 0.0,
        
    }),

    seatStitches: new THREE.MeshStandardMaterial({
        color: stitchMaterial, 
        map:textures.stitchAlpha,
        transparent:true,
       
        
    }),

    roofColor: new THREE.MeshStandardMaterial({
        color: roofMaterial, 
        roughness: 1.0,
        metalness: 0.0,
        
    }),


//-----------------------------END OF MATERIALS FOR CONFIGURATION----------------------------------------//
    steerWheelMaterial:new THREE.MeshStandardMaterial({
        color: wheelMaterial, 
        roughness: 1.0,
        metalness: 0.0,
        
    }),
    steerWheelLogo: new THREE.MeshStandardMaterial({
                              
        map:textures.logo,                       
        roughness: 0.6,
        metalness: 0.9,
       
        
    }),

    speedTexture: new THREE.MeshStandardMaterial({
        alphaMap: textures.wheelSymbols,
        transparent:true,
        alphaTest:0.5
        }),
                            
    dashButtonsTexture:new THREE.MeshStandardMaterial({
        alphaMap: textures.dashSymbols,
        
        transparent:true,
        
        }),   


    rubberTexture:  new THREE.MeshStandardMaterial({
        color: 0x3333333, 
        roughness: 0.3,
        metalness: 0.5,
        normalMap: textures.rubberNormal
        }),

        rubberTexture2:  new THREE.MeshStandardMaterial({
            color: 0x3333333, 
            roughness: 0.3,
            metalness: 0.5,
            normalMap: textures.rubberNormal2
            }),
    
    
    chrome: new THREE.MeshStandardMaterial({
        color: 0xffffff, 
        roughness: 0.1,
        metalness: 0.9,
    }),

    radiatorMaterial:new THREE.MeshStandardMaterial({
        map:textures.radiatorTexture,
        color:0xfffffff,
        roughness: 0.1,
        metalness: 0.9,
        transparent:true
    }),
    
    // ---------Glasss Materials


    mainGlass: new THREE.MeshPhysicalMaterial({
        color: 0xfffffff,
        metalness: 0,
        roughness: 0.0,
        envMapIntensity: 0.9,
        clearcoat: 1,
        transparent: true,
        transmission: 0.999,
        opacity: 1.0,
        reflectivity: 0.0,
    }),
    windowTint: new THREE.MeshStandardMaterial({
        color: 0x000000, 
        opacity: 0.8,
        transparent:true,
        
    }),
    glassBlack: new THREE.MeshStandardMaterial({
        color: 0x000000, 
        metalness:0.0,
        
    }),
    





    darkPlasticMaterial: new THREE.MeshStandardMaterial({
        color: 0x111111, // Very dark charcoal
        roughness: 0.3,
        metalness: 0.5,
    }),
    lightPlasticMaterial: new THREE.MeshStandardMaterial({
        color: 0x333333, // Lighter charcoal
        roughness: 0.2,
        metalness: 0.4,
    }),

}
}

const MATERIAL_ASSIGNMENTS = {
    'bodyPaint': 'bodyColor',
    'carbon': 'carbonColor',
    'dashCarbon': 'carbonColor2',
    'caliper': 'caliperColor',
    'rims': 'rimsColor',
    'Glass': 'mainGlass',
    'rimCovers': 'rimsCovers',
    'brakediskColor': 'brakeDiskColor',
    'springs': 'springsColor',
    'metal': 'radiatorMaterial',
    'roofAlcantara':  'roofColor',
    'seatMainColor':  'seatMainColor',
    'seatSecondaryColor':  'seatSecondaryColor',
    'innerLeather': 'rubberTexture',
    'plasticDash': 'rubberTexture',
    'dashPlastic3': 'rubberTexture',
    'blackGlass': 'glassBlack',
    'glassTint': 'windowTint',
    'shifterRubber': 'rubberTexture2',
    'shifterRubber2': 'rubberTexture2',
    'rimcovers': 'rimsCovers',
    'steerwheelCarpet': 'steerWheelMaterial',
    'seatStitches': 'seatStitches'
}       

const MATERIAL_BlackPlastic = {
    'Plastic': 'darkPlasticMaterial',
    
    'leftMirrorPlastic': 'darkPlasticMaterial',
    'leftMirrorPlastic1': 'darkPlasticMaterial', 
    'rightMirrorPlastic': 'darkPlasticMaterial',
    'rightMirrorPlastic1': 'darkPlasticMaterial', 
    'blackMaterial': 'darkPlasticMaterial',
    'tailLight2': 'darkPlasticMaterial',
    'interiorPlastic': 'darkPlasticMaterial',
    'porscheLogoBumper': 'darkPlasticMaterial',
    'innerbody': 'darkPlasticMaterial',
    'innerBody': 'darkPlasticMaterial',
    'underbody': 'darkPlasticMaterial',
    'blackMaterial2': 'darkPlasticMaterial',
    'steerwheelPlastic': 'darkPlasticMaterial',
    'windowPlastic': 'darkPlasticMaterial',
    'plasticSmooth': 'darkPlasticMaterial',
    'seatPlastic': 'darkPlasticMaterial',
    'chrome': 'darkPlasticMaterial',

    'steerwheelLogo': 'steerWheelLogo',
    'porscheLogoFront':'steerWheelLogo',
    'speedoMeteter':  'speedTexture' ,                  
    'steerwheelbuttonSymbols':'speedTexture' ,
    'steerwheelButons':'darkPlasticMaterial',                      
    'dashButtons': 'dashButtonsTexture',
    'doorButtonsSymbols' : 'dashButtonsTexture',

    'dashChrome': 'chrome',
    'doorHandle': 'chrome',
    'gassChrome': 'chrome',
    'carpetChrome': 'chrome',
    'gassRubber': 'rubberTexture2'
};



const MATERIAL_GrayPlastic = {
    'interiorPlastic2':'lightPlasticMaterial',
    'dashPlastic':'lightPlasticMaterial',
    'dashPlastic2':'lightPlasticMaterial',
    
    
    'sifterPlastic':'lightPlasticMaterial',
    'doorPlastic':'lightPlasticMaterial',
    'doorPlastic2':'lightPlasticMaterial',
    
}



export default function Car() {

    const { scene } = useGLTF('./model/porsche2.glb')
    const sceneRef = useRef()

    

    const textures = {
        logo: createTexture('./textures/logo.png', 1, 1, true),
      
        aoTexture: createTexture('./textures/ao4.jpg', 1, 1, true),
        seatAO: createTexture('./textures/seatAO3.jpg', 1, 1, true),
        
        carbonTexture: createTexture('./textures/carbon.png', 0.5, 0.5),
        carbonNormal: createTexture('./textures/carbonNormal.png', 0.5, 0.5),
        rubberNormal: createTexture('./textures/rubber.png', 0.7, 0.5),
        radiatorTexture: createTexture('./textures/radiator.png', 1, 1),
        wheelSymbols: createTexture('./textures/symbols.png', 1, 1, true),
        dashSymbols: createTexture('./textures/dashsymbols.png', 1, 1, true),
        stitchAlpha: createTexture('./textures/stitchAlpha.png', 1, 1, true),
        carbonTextureInterior: createTexture('./textures/carbon.png', 7.0,1.0),
        carbonNormalInterior: createTexture('./textures/carbonNormal.png', 7.0,1.0),

        rubberNormal2: createTexture('./textures/rubber.png', 2.0, 2.0),
    }

    
    const materials = createMaterials(textures)

    useEffect(() => {
        
       

        if (sceneRef.current) {
            
            scene.traverse((child) => {
                if (child.isMesh) {

                    const materialKey = MATERIAL_ASSIGNMENTS[child.name]
                    if (materialKey && materials[materialKey]) {
                        child.material = materials[materialKey]
                    }
                    
                    
                    const materialBlack = MATERIAL_BlackPlastic[child.name]
                    if (materialBlack && materials[materialBlack]) {
                        child.material = materials[materialBlack]
                    } 

                    const materialLightBlack = MATERIAL_GrayPlastic[child.name]
                    if (materialLightBlack && materials[materialLightBlack]) {
                        child.material = materials[materialLightBlack]
                    } 
                    

                    switch (child.name) {
                        
                            

                            
                            

                        case 'tires':
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0x1111111,
                            roughness: 0.2,
                            side: THREE.DoubleSide, 
                         })
                           
                        break

                        case 'brakeLight':
                        case 'red':    
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0x5e0000,
                            roughness: 0.5,
                            metalness: 0.7,
                            side: THREE.DoubleSide,
                            
                            })
                            break
                           
                            case 'frontWhite':    
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0xfffffff,
                            roughness: 0.5,
                            metalness: 0.7,
                            side: THREE.DoubleSide,
                            
                            })

                           
                       
                        case 'brakedisks':
                            
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0x363636,
                            roughness: 0.5,
                            side: THREE.DoubleSide
                            })
                        break
                        
                        
                        case 'diskNail':
                            
                        child.material = new THREE.MeshStandardMaterial({
                            color: 0xffffff, 
                            roughness: 0.1,
                            metalness: 0.9,
                            })
                        break


  
                        
                        

                        case 'tailLight':
                             
                        child.material = new THREE.MeshBasicMaterial({
                            color: new THREE.Color(5, 1, 1)
                           
                             })
                        break   
                        
                        


                            //-------------- INTERIOR------------//

  
                            

                            case 'clockDash':
                            
                            child.material = new THREE.MeshStandardMaterial({
                                color: 0x000000, 
                                roughness: 0.3,
                                metalness: 0.5,
                                })
                            break
                            case 'clock':
                                case 'clock1':
                            child.material = new THREE.MeshStandardMaterial({
                                color: 0xfffffff, 
                                roughness: 0.1,
                                metalness: 0.7,
                                })
                            break
                           
                            case 'clockReflection':
                            
                            child.material = new THREE.MeshStandardMaterial({
                                color: 0x999999, 
                                roughness: 0.1,
                                metalness: 0.8,
                                })
                            break
                               

                            

                            case 'screengps':
                            
                            child.material = new THREE.MeshStandardMaterial({
                                color: 0xffffffff, 
                                roughness: 0.0,
                                metalness: 1.0,
                                })
                            break


                           

                            

                            

                            case 'shifterChrome':
                            child.material = new THREE.MeshStandardMaterial({
                                color: 0xfffffff, 
                                roughness: 0.3,
                                metalness: 0.9,
                                
                                })
                            break

                            

                           

                            

                            





                            
                            case 'footCarpet':
                            child.material = new THREE.MeshStandardMaterial({
                                
                                color: 0x5555555
                                })
                            break

                            case 'footCarpet1':
                            child.material = new THREE.MeshStandardMaterial({
                                
                                color: 0x77777777
                                })
                            break


                            case 'doorPanelSpeakers':
                            child.material = new THREE.MeshStandardMaterial({
                                
                                color: 0x77777777
                                })
                            break

                            
                            

                            

                           

                            

                            

                            

                            case 'seatBelt':
                                child.material = new THREE.MeshStandardMaterial({
                                    
                                    color: 0x8888888,
                                    metalness:0.5,
                                    roughness:0.5,
                                    })
                                break

                                case 'seatBeltRed':
                                child.material = new THREE.MeshStandardMaterial({
                                    
                                    color: 0x540000,
                                    metalness:0.5,
                                    roughness:0.5,
                                    })
                                break

                                case 'seatBeltPlug':
                                child.material = new THREE.MeshStandardMaterial({
                                    
                                    color: 0x8888888,
                                    metalness:0.5,
                                    roughness:0.5,
                                    })
                                break



                                case 'exhaust':
                                child.material = new THREE.MeshStandardMaterial({
                                    
                                    color: 0x8888888,
                                    metalness:0.5,
                                    roughness:0.5,
                                    })
                                break

                                case 'exhaustExtra':
                                child.material = new THREE.MeshStandardMaterial({
                                    
                                    color: 0x555555,
                                    metalness:0.5,
                                    roughness:0.5,
                                    })
                                break

                                case 'exhaustExtraChrome':
                                child.material = new THREE.MeshStandardMaterial({
                                    
                                    color: 0x024b6e,
                                    metalness:1.0,
                                    roughness:0.1,
                                    })
                                    break
                                }
            
                                
                            }
                        })
                    }
                }, [scene, materials, textures])
            
                return (
                    <primitive 
                        ref={sceneRef}
                        object={scene} 
                        scale={1} 
                        position={[0, 0, 0]}
                    />
                )
            }



            