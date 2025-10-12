import { Users } from 'lucide-react'

const Logo = () => {
    return (
        <div className='flex items-center gap-2 cursor-pointer'>
            <div className="size-10 rounded-lg bg-primary flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
            </div>
            <span className='text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                SQUAD UP
            </span>
        </div>
    )
}

export default Logo
