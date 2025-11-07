import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify'

const Layout = ({ className, children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className={`flex-1 ${className ? className : 'px-6 xl:px-10 2xl:px-20 py-8'}`}>
        {children}
      </div>
      <Footer />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </div>
  )
}

export default Layout
