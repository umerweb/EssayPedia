import 'ldrs/ring'
import 'ldrs/waveform'

const loader = () => {
    return (
        <div className="min-h-[100vh] justify-center items-center flex">
            
          <h1>Loading</h1>

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
