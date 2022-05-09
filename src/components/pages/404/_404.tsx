import { Link } from 'react-router-dom'

export default function _404() {
    return (
        <div className='h-screen w-screen flex flex-col gap-2 justify-center items-center'>
            <h2 className='text-2xl '>😭 page not found.</h2>
            <h3 className='text-xl '><Link to="/">Go Back 👈</Link></h3>

            <div className='bg-green-300 p-2 w-full flex flex-col md:flex-row'>
                <div className='bg-blue-300'>
                    <h1 className='bg-red-300'>hello</h1>
                </div>
                <div className='bg-indigo-300'>
                    <input type="text" placeholder='search here..' />
                </div>
            </div>



            <div className="m-3 flex flex-col md:flex-row">
                {/* <!-- Section 1 --> */}
                <div >
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci ad aliquam eum, officiis quas aliquid veniam asperiores nostrum corporis exercitationem illo est doloribus dolor explicabo! Neque quibusdam laborum architecto. Nostrum.</p>
                </div>

                {/* <!-- Section 1 --> */}
                <div >
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci ad aliquam eum, officiis quas aliquid veniam asperiores nostrum corporis exercitationem illo est doloribus dolor explicabo! Neque quibusdam laborum architecto. Nostrum.</p>
                </div>

                {/* <!-- Section 1 --> */}
                <div >
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci ad aliquam eum, officiis quas aliquid veniam asperiores nostrum corporis exercitationem illo est doloribus dolor explicabo! Neque quibusdam laborum architecto. Nostrum.</p>
                </div>
            </div>

        </div>
    )
}
