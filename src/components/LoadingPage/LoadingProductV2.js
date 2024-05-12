import { Skeleton } from "@mui/material"

const LoadingProductV2 = () => {
  return (
    <div className='w-full flex flex-col mt-4 px-4 max-w-screen-xl mx-auto'>
        <Skeleton width="20%" animation="wave" variant="text" sx={{ fontSize: '1.5rem' }} />
        <div className="w-full my-4">
            <div className=" grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
                <div className="h-[300px] border p-4 rounded-lg">
                    <Skeleton animation="wave" height={200}/>
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.5rem' }} />
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.5rem' }} width="50%"/>
                </div>
                <div className="h-[300px] border p-4 rounded-lg">
                    <Skeleton animation="wave" height={200}/>
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.5rem' }} />
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.5rem' }} width="50%"/>
                </div>
                <div className="h-[300px] border p-4 rounded-lg">
                    <Skeleton animation="wave" height={200}/>
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.5rem' }} />
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.5rem' }} width="50%"/>
                </div>
                <div className="h-[300px] border p-4 rounded-lg">
                    <Skeleton animation="wave" height={200}/>
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.5rem' }} />
                    <Skeleton animation="wave" variant="text" sx={{ fontSize: '1.5rem' }} width="50%"/>
                </div>
            </div>        
        </div>
    </div>
  )
}

export default LoadingProductV2
