import Avatar from "./Avatar"

const AvatarContainer = ({members}) => {
  return (
    <div className="flex -space-x-4 my-1">
        {members.map((member, index) => (
            <Avatar key={index} member={member} />
        ))}
    </div>
  )
}

export default AvatarContainer
