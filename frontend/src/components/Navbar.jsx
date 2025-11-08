import { NavLink, useNavigate } from 'react-router-dom'
import Logo from './ui/Logo'
import MobileLogo from './ui/MobileLogo'
import { Calendar, House, Users, LogIn, Menu, X } from 'lucide-react'
import { Button } from './ui/Button'
import { useUser } from '../context/userContext'
import Avatar from './ui/Avatar'
import { useState, useEffect } from 'react'

const Navbar = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); // sidebar toggle

    // prevent body scroll when sidebar is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    }, [isOpen]);

    return (
        <nav className="w-full px-6 py-2 md:px-10 md:py-4 flex justify-between items-center border-b border-border bg-[hsl(0_0%_100%)]/50 backdrop-blur-sm sticky top-0 z-50">
            {/* Logo */}
            <NavLink to="/" className="flex gap-1">
                <Logo className="hidden md:flex" />
                <MobileLogo className="flex md:hidden" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="md:flex gap-5 hidden">
                <Button variant="ghost" onClick={() => navigate('/events')}>
                    <Calendar />
                    Events
                </Button>
                <Button variant="ghost" onClick={() => navigate('/teams')}>
                    <Users />
                    Teams
                </Button>
            </div>

            {/* Desktop User Controls */}
            <div className="hidden md:block">
                {user ? (
                    <div className="flex gap-2 justify-center items-center">
                        <Button
                            variant="border"
                            className="border-0 p-0"
                            onClick={() => navigate(`/profile/${user._id}`)}
                        >
                            <Avatar member={user} size="size-10" />
                        </Button>
                    </div>
                ) : (
                    <Button onClick={() => navigate('/login')}>
                        <LogIn />
                        Sign In
                    </Button>
                )}
            </div>

            {/* Mobile Menu Icon */}
            <div className="block md:hidden">
                <Button variant="ghost" onClick={() => setIsOpen(true)}>
                    <Menu />
                </Button>
            </div>

            {/* Overlay */}
            <div
                onClick={() => setIsOpen(false)}
                className={`fixed inset-0 bg-black z-40 h-screen w-screen transition-opacity duration-300 ease-in-out 
          ${isOpen ? "opacity-40 visible" : "opacity-0 invisible"}`}
            />
            <div className={`bg-background z-100 fixed top-0 right-0 h-screen w-[70vw] px-6 py-4 flex flex-col gap-10 shadow-lg transition-all ease-in-out duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <MobileLogo />
                <div className="flex flex-col gap-2">
                    <Button variant="outline" className='justify-center' onClick={() => navigate('/')}>
                        <House />
                        Home
                    </Button>
                    <Button variant="outline" className='justify-center' onClick={() => navigate('/events')}>
                        <Calendar />
                        Events
                    </Button>
                    <Button variant="outline" className='justify-center' onClick={() => navigate('/teams')}>
                        <Users />
                        Teams
                    </Button>
                </div>
                {!user ?
                    (
                        <div className='mt-auto mb-6'>
                            <div className='w-full border border-muted-foreground opacity-40' />
                            <Button
                                className='w-full justify-center mt-6'
                                onClick={() => navigate('/login')}
                            >
                                <LogIn />
                                Sign In
                            </Button>
                        </div>
                    ) : (
                        <Button
                            variant="ghost"
                            className="mt-auto bg-muted w-full px-6 py-4"
                            onClick={() => navigate(`/profile/${user._id}`)}
                        >
                            <Avatar member={user} size="size-10" />
                            {user.name}
                        </Button>
                    )}
            </div>
        </nav>
    );
};

export default Navbar;
