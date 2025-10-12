import { useParams } from 'react-router-dom'
import Layout from '../layouts/Layout'
import { useEffect, useState } from 'react';
import api from '../services/api';

const TeamDisplay = () => {
    const { id } = useParams();
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
            } finally{
                setLoading(false);
            }
        }

        fetchTeam();
    }, [id])

    if(loading) return <p>Loading...</p>
    return (
        <Layout>
            <span className='mx-auto text-4xl font-bold'>
                Under Development
            </span>
        </Layout>
    )
}

export default TeamDisplay
