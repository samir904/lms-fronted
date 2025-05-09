import React, { useEffect } from 'react'
import HomeLayouts from '../../Layouts/HomeLayouts'
import { Chart as chartJs, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteCourse, getAllcourse } from '../../Redux/Slices/CourseSlice'
import { getStatsData } from '../../Redux/Slices/StatsSlice'
import { getPaymentRecord } from '../../Redux/Slices/RazorpaySlice'
import { Bar, Pie } from 'react-chartjs-2'
import GroupIcon from '@mui/icons-material/Group';
export default function AdminDashboard() {
  chartJs.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip)


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { allusersCount, subscribedCount } = useSelector((state) => state.stat);
  const { allPayments, finalMonths, monthlySalesRecord } = useSelector((state) => state.razorpay);

  const userdata = {
    labels: ["Registred user ", "Enrolled user"],
    datasets: [
      {
        label: "user details",
        data: [allusersCount, subscribedCount],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"]
      }
    ],
  };

  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    fontColor: "white",
    datasets: [
      {
        label: "sales / Month",
        data: [12,0,0,0,0,0,0,0,0,0,0,0],//monthlySalesRecord
        backgroundColor: ["rgb(255,99,132)"],
        borderColor: ["white"],
        borderWidth: 2
      }
    ]
  }

  const myCourses = useSelector((state) => state?.course?.courseData)

  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete the course ?")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        await dispatch(getAllcourse());
      }
    }
  }
  async function method() {
    await dispatch(getAllcourse());
    await dispatch(getStatsData());
    await dispatch(getPaymentRecord());
  }

  useEffect(() => {
    //method()
  }, [])

  return (
    <HomeLayouts>
      <div className='min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white  ' >
        <h1 className='text-center text-5xl font-semibold text-yellow-500'>
          Admin Dashboard
        </h1>
        <div className='grid grid-cols-2 gap-5 m-auto mx-10 ' >
          <div className='flex flex-col items-center gap-10 p-5 shadow-lg rounded-md ' >
            <div className='w-80 h-80   ' >
              <Pie data={userdata} />

            </div>
            <div className='grid grid-cols-2 gap-5' >
              <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md    ' >
                <div className='flex flex-col items-center' >
                  <p className='font-semibold' >
                    Registere users
                  </p>
                  <h3 className='tex-4xl font-bold' >
                    {allusersCount}
                  </h3>

                </div>
                <GroupIcon className='text-yellow-500' />
              </div>
              <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md    ' >
                <div className='flex flex-col items-center' >
                  <p className='font-semibold' >
                    Subscribed users
                  </p>
                  <h3 className='tex-4xl font-bold' >
                    {subscribedCount}
                  </h3>

                </div>
                <GroupIcon className='text-green-500' />
              </div>

            </div>
          </div>

          <div className='flex flex-col gap-10 shadow-lg rounded-md ' >
            <h1 className='h-80 w-full realtive ' >
                  <Bar className='absolute  h-80 w-full ' data={salesData} />
            </h1>
          </div>
          <div className='grid absolute pt-95 pl-206  grid-cols-2 gap-5 ' >
          <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md    ' >
                <div className='flex flex-col items-center' >
                  <p className='font-semibold' >
                    Subscription count
                  </p>
                  <h3 className='tex-4xl font-bold' >
                    {allusersCount}
                  </h3>

                </div>
                <GroupIcon className='text-yellow-500' />
              </div>
              <div className='flex items-center justify-between p-5 gap-5 rounded-md shadow-md    ' >
                <div className='flex flex-col items-center' >
                  <p className='font-semibold' >
                    Total revenue
                  </p>
                  <h3 className='tex-4xl font-bold' >
                    {subscribedCount}
                  </h3>

                </div>
                <GroupIcon className='text-green-500' />
              </div>
          </div>
        </div>
        <div className='m-[10%] w-[80%] flex flex-col self-center items-center justify-center gap-10 mb-10  ' >
            <div className='flex w-full items-center justify-between  ' >
                  <h1 className='text-center text-3xl font-semibold ' >
                    Course Overview
                  </h1>
                  <button
                  className='w-fit bg-yellow-500 hover:bg-yellow-600  transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer '
                  onClick={()=>navigate("/course/create")}
                  >
                      Create new course
                  </button>
            </div>
            <table className='table  overflow-x-scroll ' >
                  <thead>
                    <tr>
                      <th>S no</th>
                      <th>Course Title</th>
                      <th>Course Category </th>
                      <th> Instructor</th>
                      <th>Total Lectures </th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myCourses?.map((course,idx)=>{
                      return(
                        <tr key={course._id} >
                            <td>
                              {idx+1}
                            </td>
                            <td>
                              <textarea value={course.title} readOnly  className='w-40 h-auto bg-transparent resize-none '  >  </textarea>
                            </td>
                            <td>
                              {course.category}
                            </td>
                            <td>
                              {course.createdBy}
                            </td>
                            <td>
                              {course.numberOfLectures}
                            </td>
                            <td className='mx-w-28 overflow-hidden text-ellipsis whitespace-nowrap ' >
                                    <textarea
                                    readOnly
                                    className='w-80 h-auto bg-transparent resize-none '
                                    value={course.description}
                                    >

                                    </textarea>
                            </td>
                            <td className='flex items-center gap-4 ' >
                                <button
                                className='bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl px-4 py-2 rounded-md  font-bold '
                                 onClick={()=>navigate("/course/displaylectures",{state:{...course}})} >
                                      playIcon
                                </button>
                                <button
                                className='bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl px-4 py-2 rounded-md  font-bold '
                                 onClick={()=>onCourseDelete(course?._id)} >
                                      trash
                                </button>
                            </td>
                        </tr>
                      )
                    })}
                  </tbody>
            </table>
        </div>
      </div>
    </HomeLayouts>
  )
}
