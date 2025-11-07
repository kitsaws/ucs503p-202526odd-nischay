import { Users } from 'lucide-react'

const MobileLogo = ({ className = '' }) => {
    return (
        <div className={`flex items-center gap-2 cursor-pointer ${className}`}>
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                <Users size={20} className="text-white" />
            </div>
            <span className='text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                SQUAD UP
            </span>
        </div>
    )
}

export default MobileLogo
