import { tailspin } from 'ldrs'

tailspin.register()

const loaderButton = () => {
    return (
        <div className='w-full'>
            <button disabled={true} className="cursor-not-allowed bg-yellow-500 w-[100%] h-9 flex items-center justify-center rounded-lg text-white font-semibold hover:bg-red-900 mt-3"><l-tailspin
                size="22"
                stroke="3"
                speed="0.9"
                color="white"
            ></l-tailspin></button>

        </div>
    )
}

export default loaderButton
