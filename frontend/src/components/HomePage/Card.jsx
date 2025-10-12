import { useState } from 'react'

const Card = ({ logo, title, desc }) => {
    const [hovering, setHovering] = useState(false);
    return (
        <div
            className='card w-112 p-6 flex flex-col gap-2 rounded-xl border border-border bg-white shadow-muted-foreground hover:shadow-md hover:-translate-y-1'
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
        >
            <div className={`size-12 rounded-xl ${hovering ? 'bg-primary-glow' : 'bg-primary'} text-white flex justify-center items-center`}>
                {logo}
            </div>
            <p className='text-xl font-medium'>{title}</p>
            <p className=''>{desc}</p>
        </div>
    )
}

export default Card
