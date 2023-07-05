import React, { useState } from 'react'
import { formatDDMMYYYYHHmm } from '../../../utils/formatDatetime'
import questionApi from '../../../api/questionApi'
import { useDispatch } from 'react-redux'
import { fetchProduct } from '../../../store/product'
import { showToastError, showToastSuccess } from './../../CustomToast/CustomToast';
import ActionGroup from './../../ActionGroup/ActionGroup';



export default function UserQuestion({ question, productId }) {

    const dispatch = useDispatch()
    const userLogin = JSON.parse(localStorage?.getItem('USER_LOGIN'))
    const [answer, setAnswer] = useState()

    const handleReply = async (e) => {
        e.preventDefault();
        try {
            await questionApi.editQuestion(question?._id, {
                answer
            })
            dispatch(fetchProduct(productId))
            showToastSuccess("Add successful answer")
        } catch (err) {
            console.log(err)
            showToastError("Add failed answer")
        }
    }

    const onDelete = async () => {
        // try {
        //     await questionApi.deleteQuestion(question?._id)
        //     dispatch(fetchProduct(productId))
        //     showToastSuccess("Delete successful answer")
        // } catch (err) {
        //     console.log(err)
        //     showToastError("Delete failed answer")
        // }
        try {
            if ((userLogin?._id === question?.userId?._id) || (userLogin?.role === 'ADMIN') ) {
                await questionApi.deleteQuestion(question?._id)
                dispatch(fetchProduct(productId))
                showToastSuccess("Delete successful answer")
            } else {
                showToastError("You can only delete your own questions")
            }
        } catch (err) {
            console.log(err)
            showToastError("Delete failed answer")
        }
    }

    return (
        <div className="group max-w-screen-xl w-full mx-auto border-t border-gray-300 py-8 pl-6 relative">
            <div className="flex items-center justify-between mb-2">
                <div className="flex">
                    <img  className="userShowImg" src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_3.jpg" alt=""/>
                    <div className="ml-2">
                        <div className="text-yellow-2 text-md">{question?.userId?.nameAccount}</div>
                        <p className="text-md opacity-80 mb-3 font-medium">
                            {question?.question}
                        </p>
                    </div>
                </div>
                <div className="opacity-80 text-sm-md">{formatDDMMYYYYHHmm(question?.questionDate)}</div>
            </div>
           
            {
                question?.answer && (
                    <div className="ml-12">
                        <div className="border-b-[1px] border-l-[1px] rounded-bl-lg border-gray-300 absolute ml-[-32px] mt-[-36px]  w-8 h-14"></div>
                        <div className="mt-4">
                            <div className="w-full flex items-center justify-between">
                                <div className="flex">
                                    <img  className="userShowImg" src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_3.jpg" alt=""/>
                                    <div className="ml-2">
                                        <div className="text-yellow-2 text-md">4HShoe Store</div>
                                        <p className="">
                                            {question?.answer}
                                        </p>
                                    </div>
                                </div>
                                <div className="opacity-80 text-sm-md">{formatDDMMYYYYHHmm(question?.answerDate)}</div>
                                {/* chưa fix lỗi */}
                            </div>
                        </div>
                    </div>
                )
            }

            {
                !question?.answer && userLogin?.role === 'ADMIN' && (
                    <form type="submit">
                        <div className="flex ml-12 mt-4">
                            <div className="border-b-[1px] border-l-[1px] rounded-bl-lg border-gray-300 absolute ml-[-32px] mt-[-36px]  w-8 h-14"></div>

                            <img  className="userShowImg" src="https://nhadepso.com/wp-content/uploads/2023/03/loa-mat-voi-101-hinh-anh-avatar-meo-cute-dang-yeu-dep-mat_3.jpg" alt=""/>
                            <div className="w-full ml-2">
                                <textarea
                                    className="rounded-lg border border-gray-300 w-full h-30 p-4"
                                    onChange={(e) => setAnswer(e.target.value)}
                                />
                                <button
                                    onClick={(e) => handleReply(e)}
                                    className="px-4 py-2 mt-1 rounded-lg uppercase text-white bg-[#62B4FF] hover:opacity-80"
                                >
                                    Submit
                                </button>

                            </div>
                           
                        </div>
                    </form>
                )
            }

            <div className="absolute right-0 hidden group-hover:block">
                <ActionGroup showEye={false} showEdit={false} onDelete={onDelete} />
            </div>
            {/* fix lỗi chẹk quyền */}
        </div>
    )
}
