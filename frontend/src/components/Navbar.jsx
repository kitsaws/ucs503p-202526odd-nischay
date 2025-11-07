import { NavLink, useNavigate } from 'react-router-dom'
import Logo from './ui/Logo'
import MobileLogo from './ui/MobileLogo'
import { Calendar, Users, CircleUser, LogIn, LogOut, Menu } from 'lucide-react'
import { Button } from './ui/Button'
import { useUser } from '../context/userContext'
import Avatar from './ui/Avatar'
import api from '../services/api'
import { toast } from 'react-toastify'

const Navbar = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <nav className='w-full px-6 py-2 md:px-10 md:py-4 flex justify-between items-center border-b border-border bg-[hsl(0_0%_100%)]/50 backdrop-blur-sm sticky top-0 z-50'>
            <NavLink to={'/'} className={'flex gap-1'}>
                <Logo className='hidden md:flex' />
                <MobileLogo className='flex md:hidden' />
            </NavLink>
            <div className='md:flex gap-5 hidden'>
                <Button variant={'ghost'} onClick={() => navigate('/events')}>
                    <Calendar />
                    Events
                </Button>
                <Button variant={'ghost'} onClick={() => navigate('/teams')}>
                    <Users />
                    Teams
                </Button>
            </div>
            <div className='hidden md:block'>
                {user ?
                    <div className='flex gap-2 justify-center items-center'>
                        <Button variant={'border'} className={'border-0 p-0'} onClick={() => navigate(`/profile/${user._id}`)}>
                            <div className="pfp flex justify-center items-center">
                                <Avatar member={user} size={'size-10'} />
                            </div>
                        </Button>
                    </div>
                    :
                    <Button onClick={() => navigate('/login')}>
                        <LogIn />
                        Sign In
                    </Button>
                }
            </div>
            <div className='block md:hidden'>
                <Menu />
            </div>
        </nav>
    )
}
export default Navbar
