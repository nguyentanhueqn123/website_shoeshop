import { Skeleton } from "@mui/material"

const LoadingProduct = () => {
  return (
    <div className='w-full flex flex-col md:flex-row px-4 md:px-7 mt-4'>
        <div className="hidden md:block md:w-1/5">
            <div>
                <Skeleton animation="wave" height={50}/>
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton animation="wave" height={50}/>
                    <Skeleton animation="wave" height={50}/>
                </div>
                <Skeleton  animation="wave" height={60}/>
                <Skeleton animation="wave" height={60}/>
                <Skeleton animation="wave" height={200}/>
            </div>
        </div>
        <div className="w-full md:w-4/5 mt-0 md:mt-14">
            <div className="ml-0 md:ml-8 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
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

export default LoadingProduct
