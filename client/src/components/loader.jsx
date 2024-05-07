import 'ldrs/ring'

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



        </div>
    )
}

export default loader
