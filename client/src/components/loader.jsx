import 'ldrs/ring'
import 'ldrs/waveform'
import { tailChase } from 'ldrs'
tailChase.register()


const loader = () => {
    return (
        <div className="min-h-[100vh] justify-center items-center flex">
            
            


<l-tail-chase
  size="40"
  speed="1.75" 
  color="black" 
></l-tail-chase>
            
            <l-waveform
                size="35"
                stroke="3.5"
                speed="1"
                color="black"
            ></l-waveform>

        </div>
    )
}

export default loader
