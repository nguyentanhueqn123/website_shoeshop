import React, { useState, useEffect } from 'react'
import UserComment from './components/UserComment'
import UserQuestion from './components/UserQuestion'
import classnames from 'classnames'
import Star from '../../components/Star/Star'
import { showToastError, showToastSuccess } from './../CustomToast/CustomToast';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import commentApi from '../../api/commentApi'
import questionApi from '../../api/questionApi'
import { useDispatch } from 'react-redux'
import { fetchProduct } from '../../store/product'
import ReactPaginate from 'react-paginate'
import { useFetchListInvoice, useListInvoice } from '../../store/invoice/hook'
import { useFetchProduct, useProduct, useFetchProducts} from '../../store/product/hook'


const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


export default function Comment({ comment, question, productId }) {
  useFetchProduct()
  useFetchProducts()
  const product = useProduct()

    const [tab, setTab] = useState(1)
    const [oneStar, setOneStar] = useState(0)
    const [twoStar, setTwoStar] = useState(0)
    const [threeStar, setThreeStar] = useState(0)
    const [fourStar, setFourStar] = useState(0)
    const [fiveStar, setFiveStar] = useState(0)
    const [star, setStar] = useState(0)
    const [showQuestionForm, setShowQuestionForm] = useState(false)
    const [showReviewForm, setShowReviewForm] = useState(false)
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const [contentQuestion, setcontentQuestion] = useState()
    const [contentReview, setContentReview] = useState()
    const dispatch = useDispatch()
    const userLogin = JSON.parse(localStorage?.getItem('USER_LOGIN'))
    const [currentPage, setCurrentPage] = useState(1);

    //////
    const listInvoice = useListInvoice()
    useFetchListInvoice()
    //////

    useEffect(() => {
        let oneStarTemp = 0, twoStarTemp = 0, threeStarTemp = 0, fourStarTemp = 0, fiveStarTemp = 0
        let count = 0
        comment?.map((item) => {
            if (item?.star === 1) {
                oneStarTemp++
                count++
            }
            if (item?.star === 2) {
                twoStarTemp++
                count++
            }
            if (item?.star === 3) {
                threeStarTemp++
                count++
            }
            if (item?.star === 4) {
                fourStarTemp++
                count++
            }
            if (item?.star === 5) {
                fiveStarTemp++
                count++
            }
        })

        if (comment) {
            if (comment?.length) {
                count = comment?.reduce((total, star) => {
                return total + star?.star
                }, 0)
            }
        }
    
        setOneStar(oneStarTemp)
        setTwoStar(twoStarTemp)
        setThreeStar(threeStarTemp)
        setFourStar(fourStarTemp)
        setFiveStar(fiveStarTemp)
        setStar((((count / (comment?.length || 1)) / 0.5) * 0.5))

    }, [comment, question])
    

    const handleChangeTab = (tab) => {
        setTab(tab)
    }

    const handleSubmitQuestion = async (e) => {
        e.preventDefault();
        if (!userLogin) {
            showToastError("You must login to ask a question")
            return;
        }

        try {
            await questionApi.addQuestion({
                productId,
                userId: userLogin?._id,
                question: contentQuestion,
            })
            showToastSuccess("Add successul question")
            dispatch(fetchProduct(productId))
        } catch (err) {
            console.log(err)
            showToastError("Add failed question")
        }
    }

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!userLogin) {
        showToastError("You must login to rate this product")
        return;
        }

        try {
        await commentApi.addComment({
            productId,
            userId: userLogin?._id,
            content: contentReview,
            star: value,
        })
        showToastSuccess("Submit a successful review")
        dispatch(fetchProduct(productId))
        } catch (err) {
        console.log(err)
        showToastError("Submit a failed review")
        }
    }
    // phân trang
    const commentsPerPage = 4;
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comment?.slice(indexOfFirstComment, indexOfLastComment);
    const currentQuestions = question?.slice(indexOfFirstComment, indexOfLastComment);



  return (
    <div id="product-review" className="w-full bg-[#F5F5F5] mt-14 p-6 rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-medium uppercase">product reviews</h1>
      </div>

      <div className="flex justify-between p-5 items-center bg-white rounded-lg">
        <div className="flex">
          <div className="flex items-center border-r border-gray-300 pr-5">
            <div className="flex flex-col mr-2 justify-center items-center">
              <div className="flex justify-center items-center text-[#EF4444]">
                <span className="text-2xl">{star.toFixed(1)}</span>
                <p>/5</p>
              </div>
              <Star
                numberStar={star || 0}
                size="2xl"
              />
            </div>
            <span className="opacity-70 text-md mt-10">{comment?.length} reviews</span>
          </div>

          <div className="pl-5">
            <div className="flex items-center">
              <div className="flex items-center">
                <Star
                  numberStar={5}
                />
              </div>
              <span className="text-sm-md text-yellow-2 px-2">({fiveStar})</span>
              <div>

              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <Star
                  numberStar={4}
                />
              </div>

              <span className="text-sm-md text-yellow-2 px-2">({fourStar})</span>

              <div>

              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <Star
                  numberStar={3}
                />
              </div>

              <span className="text-sm-md text-yellow-2 px-2">({threeStar})</span>

              <div>

              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <Star
                  numberStar={2}
                />
              </div>

              <span className="text-sm-md text-yellow-2 px-2">({twoStar})</span>

              <div>

              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                <Star
                  numberStar={1}
                />
              </div>

              <span className="text-sm-md text-yellow-2 px-2">({oneStar})</span>

              <div>

              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <button
            onClick={() => {
              setShowQuestionForm(true)
              setShowReviewForm(false)
            }}

            className="px-4 py-2 text-[#62B4FF] border-[#62B4FF] border-2 rounded-lg uppercase">
            Make a question
          </button>
          {
            
            listInvoice?.data?.some(invoice => invoice.status === 'DELIVERED' && invoice.userId === userLogin?._id && invoice.product?.includes(product?.data?._id)) && (
              <button 
                onClick={() => {
                  setShowQuestionForm(false)
                  setShowReviewForm(true)
                }}
                className="mt-3 px-4 py-2 text-white font-medium rounded-lg hover:opacity-80 uppercase bg-[#62B4FF] hover:bg-[#62B4FF]">
                Write a review
              </button>
            )
          }
          

          {/* <button 
            onClick={() => {
              setShowQuestionForm(false)
              setShowReviewForm(true)
            }}
          className="mt-3 px-4 py-2 text-white font-medium rounded-lg hover:opacity-80 uppercase bg-[#62B4FF] hover:bg-[#62B4FF]">
            Write a review
          </button> */}
        </div>
      </div>

      {
        showQuestionForm && (
          <div className="">
            <form>
              <textarea
                className="w-full border border-gray-300 mt-4 p-4 h-40 rounded-lg"
                placeholder='Your question...'
                onChange={e => setcontentQuestion(e.target.value)}
              />
              <button
                className="mt-2 px-4 py-2 text-white bg-[#62B4FF] text-lg rounded-lg hover:bg-[#62B4FF] hover:opacity-80"
                onClick={e => handleSubmitQuestion(e)}
              >
                Submit question
              </button>
            </form>
          </div>
        )
      }

      {
        showReviewForm && (
          <div className="">
            <div className="bg-white border border-gray-300 mt-4 p-4 rounded-lg flex justify-center flex-col">
                <Box
                    sx={{
                    width: 200,
                    display: 'flex',
                    alignItems: 'center',
                    }}
                >
                    <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                        {value !== null && (
                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                </Box>
                <form>
                    <textarea
                        className="w-full border border-gray-300 mt-4 p-4 h-40 rounded-lg"
                        placeholder='Your review...'
                        onChange={e => setContentReview(e.target.value)}
                    />
                    <button
                        className="mt-2 px-4 py-2 text-white bg-[#62B4FF] text-lg rounded-lg hover:bg-[#62B4FF] hover:opacity-80"
                        onClick={e => handleSubmitReview(e)}
                    >
                        Submit review
                    </button>
                </form>
            </div>
            
          </div>
        )
      }

      <div className="flex items-center my-6">
        <div
          className={classnames(
            "text-md mr-6 py-2 cursor-pointer",
            { "text-[#62B4FF] font-bold opacity-80 border-b-2 border-[#62B4FF]": tab === 1 }
          )}

          onClick={() => handleChangeTab(1)}
        >
          Review ({comment?.length || 0})
        </div>
        <div
          className={classnames(
            "text-md py-2 cursor-pointer",
            { "text-[#62B4FF] font-bold opacity-80 border-b-2 border-[#62B4FF]": tab === 2 }
          )}
          onClick={() => handleChangeTab(2)}
        >
          Question ({question?.length || 0})
        </div>
      </div>
      {
        tab === 1 ? (
          currentComments?.map((item, index) => {
            return <UserComment createdAt={item?.createAt} key={index} comment={item?.content} name={item?.userId?.nameAccount} numOfStar={item?.star} />
          })
        ) : null
      }
      {
        tab === 2 ? (
          currentQuestions?.map((item, index) => {
            return <UserQuestion question={item} productId={productId} />
          })
        ) : null
      }
      {tab !== 1 && (
        <ReactPaginate
          previousLabel={"Previous"}
          previousClassName="mr-2 border px-3 py-1 rounded-lg hover:bg-[#349eff] hover:text-white"
          nextLabel={"Next"}
          nextClassName="ml-2 border px-3 py-1 rounded-lg hover:bg-[#349eff] hover:text-white"
          pageCount={Math.ceil(question?.length / commentsPerPage)}
          pageClassName="px-3 py-1"
          onPageChange={page => setCurrentPage(page.selected + 1)}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive border px-3 py-1 rounded-lg bg-[#62B4FF] text-white"}
          className="flex justify-end w-full  my-3"
        />
      )}
      {tab !== 2 && (
        <ReactPaginate
          previousLabel={"Previous"}
          previousClassName="mr-2 border px-3 py-1 rounded-lg hover:bg-[#349eff] hover:text-white"
          nextLabel={"Next"}
          nextClassName="ml-2 border px-3 py-1 rounded-lg hover:bg-[#349eff] hover:text-white"
          pageCount={Math.ceil(comment?.length / commentsPerPage)}
          pageClassName="px-3 py-1"
          onPageChange={page => setCurrentPage(page.selected + 1)}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive border px-3 py-1 rounded-lg bg-[#62B4FF] text-white"}
          className="flex justify-end w-full  my-3"
        />
      )}
     
    </div>
  )
}
