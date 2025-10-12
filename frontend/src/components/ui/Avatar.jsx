const Avatar = ({ member, size }) => {
    const initials = member.name.split(' ').map(n => n[0]).join('').toUpperCase();
    return (
        <div className={`border-2 border-border rounded-full  ${size ? size : 'size-8 '} flex justify-center items-center bg-primary text-white font-bold`}>
            {member.profilePic && member.profilePic.length != 0 ? (<img src={member.profilePic} className='w-full h-full object-contain rounded-full' />) : ( initials )}
        </div>
    )
}

export default Avatar
