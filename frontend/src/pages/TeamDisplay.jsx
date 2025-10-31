import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../layouts/Layout'
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Button } from '../components/ui/Button';

const TeamDisplay = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    // Team Schema -> 
    // {
    //     eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    //     teamName: { type: String, required: true },
    //     leaderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    //     members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    //     rolesNeeded: { type: [String], default: [] },
    //     description: { type: String },
    //     // university: { type: String, required: true },
    //     requests: [
    //       {
    //         userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //         status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
    //       },
    //     ],
    //   },

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await api.get(`/teams/${id}`);
                console.log(res.data);
                setTeam(res.data);
            } catch (err) {
                console.error('Could not fetch team info', err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchTeam();
    }, [id])
    console.log({team});

    if (loading) return <p>Loading...</p>
    return (
        <Layout>
            <Button
                variant='ghost'
                className='w-fit'
                onClick={() => navigate('/events')}
            >
                ← Back to Dashboard
            </Button>
            <div className="rounded-xl border flex flex-col gap-4 border-border p-5 my-8">
                <div>
                    <div>
                        <h2 className='text-3xl font-bold mb-2'>{team.teamName}</h2>
                        <p className="text-muted-foreground">{team.eventId.title}</p>
                    </div>
                    <Users/>
                </div>
            </div>
        </Layout>
    )
}

export default TeamDisplay
