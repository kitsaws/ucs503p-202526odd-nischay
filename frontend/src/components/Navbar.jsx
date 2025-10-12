import { NavLink, useNavigate } from 'react-router-dom'
import Logo from './ui/Logo'
import { Calendar, Users, CircleUser, LogIn, LogOut } from 'lucide-react'
import { Button } from './ui/Button'
import { useUser } from '../context/userContext'
import Avatar from './ui/Avatar'
import api from '../services/api'
import { toast } from 'react-toastify'

const Navbar = () => {
    const { user, setUser } = useUser();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const res = await api.get('/auth/logout');
            setUser(null);
            navigate('/')
        } catch (err) {
            toast.error('Logout failed');
            console.error('Logout Failed', err.response?.data || err.message);
        }
    }

    return (
        <nav className='w-full px-20 py-4 flex justify-between items-center border-b border-border bg-[hsl(0_0%_100%)]/50 backdrop-blur-sm sticky top-0 z-50'>
            <NavLink to={'/'} className={'flex gap-1'}>
                <Logo className='' />
            </NavLink>
            <div className='flex gap-5'>
                <Button variant={'ghost'} onClick={() => navigate('/events')}>
                    <Calendar />
                    Events
                </Button>
                <Button variant={'ghost'} onClick={() => navigate('/teams')}>
                    <Users />
                    Teams
                </Button>
            </div>
            {user ?
                <div className='flex gap-2 justify-center items-center'>
                    <Button variant={'border'} className={'border-0'} onClick={() => navigate(`/profile/${user._id}`)}>
                        <div className="pfp flex justify-center items-center">
                            <Avatar member={user} size={'size-10'} />
                        </div>
                    </Button>
                    <Button variant={'outline'} onClick={handleLogout} className={'p-2 text-red-500 border-red-500'}>
                        <LogOut size={20} />
                    </Button>
                </div>
                :
                <Button onClick={() => navigate('/login')}>
                    <LogIn />
                    Sign In
                </Button>
            }
        </nav>
    )
}
export default Navbar
