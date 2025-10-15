import { Badge, Calendar, Clock, MapPin, Users } from 'lucide-react'
import { Button } from '../ui/Button'

const Card = ({ event }) => {
    return (
        <div className="w-110 h-96 rounded-xl overflow-hidden hover-lift border border-border">
            <div className="h-2 bg-primary"></div>
            <div className="p-6 flex flex-col justify-between h-full">
                <div className='max-h-50 space-y-4'>
                    <div className="flex items-start justify-between">
                        <div className="space-y-2">
                            <p className='text-xs rounded-full px-3 py-1 bg-muted w-fit'>
                                {event.category}
                            </p>
                            <h3 className="text-xl font-semibold">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">{event.organizer}</p>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>

                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span>
                                {event.participants}/{event.maxParticipants} participants
                            </span>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex gap-4 mb-2">
                    <Button variant="default" className="justify-center items-center flex-1">
                        View Details
                    </Button>
                    <Button variant="outline" className="justify-center items-center flex-1">
                        Join Event
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Card
