import { Effect } from "postprocessing";

const fragmentShader = `

    
 uniform sampler2D tDepth;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor)
{
    // Sample the depth
    float depth = texture2D(tDepth, uv).r;
    
    // Convert depth to a meaningful distance
    // Assuming linear depth between 0 and 1
    float distance = depth; // Closer objects have lower depth values
    
    // Create volume effect that increases with distance
    // Objects closer to camera (lower depth) will have less volume
    // Objects further from camera (higher depth) will have more volume
    float volumeFactor = smoothstep(0.1, 0.4, distance);
    
    // Create a subtle volumetric grey effect
    vec3 volumeColor = vec3(0.5);
    
    // Mix original color with volume color based on depth
    vec3 finalColor = mix(inputColor.rgb, volumeColor, volumeFactor * 5.7);
    
    outputColor = vec4(finalColor, inputColor.a);

    }
`

export default class VolumeEffect extends Effect
{
    constructor()
    {
        
        super(
            'VolumeEffect',
            fragmentShader,
            {
                
                defines: new Map([
                    ['USE_DEPTH', '1']
                ])
            });
        }
    }