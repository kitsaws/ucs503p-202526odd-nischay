import Layout from "../layouts/Layout"
import { Button } from "../components/ui/Button"
import { Label, Input } from '../components/ui/FormElements'
import Dropdown from '../components/ui/Dropdown'
import { Plus, X } from 'lucide-react'
import { useState } from "react"
import { useUser } from "../context/userContext"
import api from '../services/api'
import { useNavigate } from "react-router-dom"
import { useEvent } from "../context/eventContext"

const CreateTeam = () => {
    const { events, loading } = useEvent();
    const navigate = useNavigate();

    const eventNames = events.map(event => event.title);
    const { user } = useUser();
    const [teamName, setTeamName] = useState("");
    const [teamDescription, setTeamDescription] = useState("");
    const [event, setEvent] = useState(null);
    const [teamSize, setTeamSize] = useState(0)
    const [selectedRoles, setSelectedRoles] = useState([]);

    const roles = [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Software Engineer",
        "Data Scientist",
        "Machine Learning Engineer",
        "DevOps Engineer",
        "Cloud Engineer",
        "UI/UX Designer",
        "Cybersecurity Specialist"
    ];

    const handleAddRole = (role) => {
        // Prevent duplicates
        if (!selectedRoles.includes(role)) {
            setSelectedRoles((prev) => [...prev, role]);
        }
    };
    const handleRemoveRole = (role) => {
        setSelectedRoles((prev) => prev.filter((r) => r !== role));
    };

    const handleSubmit = async () => {
        if (!user) return alert("You must be logged in!");

        if (!teamName || !event || selectedRoles.length === 0) {
            return alert("Please fill in all required fields");
        }
        if (teamSize === 0){
            return alert('Team size ')
        }

        try {
            const payload = {
                teamName,
                teamSize,
                description: teamDescription,
                event,
                roles: selectedRoles,
            };
            // console.log('payload-> ', payload);

            const res = await api.post(`/teams/${user._id}/create-team`, payload);
            // console.log("Team created:", res.data._id);
            alert("Team created successfully!");

            navigate(`/team/${res.data._id}`);
            // Optional: redirect user to dashboard or team page
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert("Failed to create team");
        }
    };

    const handleTeamSize = (size) => {
        if (size === '' || /^\d+$/.test(size)) {
            setTeamSize(size === '' ? 0 : Number(size));
        }
    }


    if (loading) return <p>Loading...</p>
    return (
        <Layout>
            <div className="mx-50 mb-10">
                <Button
                variant='ghost'
                className='w-fit'
                onClick={() => navigate('/events')}
                >
                    ← Back to Dashboard
                </Button>
                <div className="mt-6">
                    <h2 className="text-4xl font-bold mb-4">Create a Team</h2>
                    <p className="text-muted-foreground">Find teammates who share your passion and skills</p>
                </div>
                <div className="rounded-xl border flex flex-col gap-4 border-border p-5 my-8">
                    <Label htmlFor="team-name">
                        Team Name <span className="text-red-500">*</span>
                        <Input type="text" name='team-name' id='team-name' placeholder='Enter your team name' onChange={(e) => setTeamName(e.target.value)} />
                    </Label>
                    <Label htmlFor="event">
                        Event <span className="text-red-500">*</span>
                        <Dropdown
                            options={eventNames}
                            defaultDisplay="Select an Event"
                            onSelect={(title) => {
                                const selected = events.find(e => e.title === title);
                                if (selected) setEvent(selected._id);
                            }}
                            className="w-full"
                        />
                    </Label>
                    <Label htmlFor="team-size">
                        Team Size <span className="text-red-500">*</span>
                        <Input type="text" name='team-size' id='team-size' placeholder='Enter your team size' onChange={(e) => handleTeamSize(e.target.value)} />
                    </Label>
                    <Label htmlFor="team-description">
                        Team Description
                        <textarea name="team-description" id='team-description' onChange={(e) => setTeamDescription(e.target.value)} className="block border border-border w-full min-h-25 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 ring-primary1"></textarea>
                    </Label>
                    <Label htmlFor="roles">
                        Roles Needed <span className="text-red-500">*</span>
                        <p className="text-md text-muted-foreground font-normal">Add roles you're looking for in your team</p>
                        <div className="flex gap-2 mt-4">
                            <Input type="text" name='roles' id='roles' placeholder='Add custom roles...' />
                            <div className="size-10 flex justify-center items-center rounded-lg bg-primary text-white hover:bg-primary-glow">
                                <Plus />
                            </div>
                        </div>
                        <div className="mt-4">
                            <p>Suggested Roles:</p>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {roles.map((role, index) => (
                                    <Button key={index} variant={'outline'} size={'sm'} onClick={() => handleAddRole(role)}><Plus />{role}</Button>
                                ))}
                            </div>
                        </div>
                        {selectedRoles.length !== 0 &&
                            <>
                                <p>Selected Roles: </p>
                                <div id="selected-roles" className="mt-2 flex flex-wrap gap-2">
                                    {selectedRoles.map((role, index) => (
                                        <Button key={index} variant={'default'} size={'sm'} onClick={() => handleRemoveRole(role)}>{role}<X /></Button>
                                    ))}
                                </div>
                            </>
                        }
                    </Label>
                    <Button size={'lg'} className={'flex justify-center items-center'} onClick={handleSubmit} >Create Team</Button>
                </div>
            </div>
        </Layout>
    )
}

export default CreateTeam
