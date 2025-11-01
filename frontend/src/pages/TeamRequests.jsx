import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../layouts/Layout'
import { useEffect, useState } from 'react';
import api from '../services/api';
import { Github, Linkedin, Mail, ExternalLink, Check, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { Button } from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';

const TeamRequests = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleAccept = async (memberId) => {
        try {
            const res = await api.post(`/teams/${id}/acceptReq/${memberId}`);
            console.log(res.data);
            toast.success('New member added!')
        } catch (err) {
            console.error('Could not fetch team info', err.response?.data || err.message);
            toast.error('Something went wrong')
        }
    }
    
    const handleReject = async (memberId) => {
        try {
            const res = await api.post(`/teams/${id}/rejectReq/${memberId}`);
            console.log(res.data);
            toast.error('Request removed.')
        } catch (err) {
            console.error('Could not fetch team info', err.response?.data || err.message);
            toast.error('Something went wrong')
        }
    }

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
    console.log({ team });

    if (loading) return <p>Loading...</p>;
    if (!team) return <p>Team not found.</p>;

    return (
        <Layout>
            <Button
                variant='ghost'
                className='w-fit mb-4'
                onClick={() => navigate(`/team/${id}`)}
            >
                ← Back to Dashboard
            </Button>
            <div className="rounded-xl border flex flex-col gap-4 border-border p-8">
                <h3 className='text-xl font-semibold mb-2'>Requests</h3>
                <div className='flex flex-col justify-between items-center'>
                    { team.requests.length == 0 ? (<p>No requests...</p>) : (
                    team.requests.map(request => {
                        const member = request.userId; // The populated user document
                        if (!member) return null; // safety check

                        return (
                            <div className='w-full flex gap-10'>
                                <div key={member._id} className='rounded-xl flex-1 flex gap-5 bg-muted p-5 w-full'>
                                    {/* Avatar */}
                                    <div className="pfp flex justify-center items-center">
                                        <Avatar member={member} size={'size-16'} />
                                    </div>
                                    <div className='flex flex-1 justify-between items-center'>
                                        {/* Left: Member info */}
                                        <div className='flex flex-col gap-1 max-w-1/2'>
                                            <span className='flex gap-2 items-center'>
                                                <p className='font-semibold text-lg'>{member.name}</p>
                                                {team.leaderId?._id === member._id && (
                                                    <p className='w-fit rounded-full text-white bg-accent text-xs px-2 py-1'>Leader</p>
                                                )}
                                                <Button
                                                    variant={'outline'}
                                                    onClick={() => navigate(`/profile/${member._id}`)}
                                                    className={'p-1'}
                                                    size={'sm'}
                                                >
                                                    <ExternalLink size={20} />
                                                </Button>
                                            </span>

                                            {member.bio?.length > 0 && <p className='text-muted-foreground'>{member.bio}</p>}

                                            {member.skills?.length > 0 && (
                                                <div className='mt-1 flex flex-wrap gap-1 w-full'>
                                                    {member.skills.map((skill, index) => (
                                                        <p key={index} className='w-fit rounded-full font-medium text-xs text-muted-foreground bg-muted px-2 py-1 border'>
                                                            {skill}
                                                        </p>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Right: Social buttons */}
                                        <div className='socials h-fit flex justify-end gap-2'>
                                            {/* Email */}
                                            {member.socials?.email && (
                                                <Button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(member.socials.email)
                                                            .then(() => toast.success('Email Copied!'))
                                                            .catch(err => {
                                                                toast.error("Couldn't copy email");
                                                                console.error('Failed to copy: ', err);
                                                            });
                                                    }}
                                                    variant='outline'
                                                    className='p-2 hover:bg-secondary text-secondary border-secondary'
                                                >
                                                    <Mail size={20} />
                                                </Button>
                                            )}

                                            {/* LinkedIn */}
                                            {member.socials?.linkedin && (
                                                <Button
                                                    variant='outline'
                                                    className='p-2 hover:bg-secondary text-secondary border-secondary'
                                                    onClick={() => {
                                                        const link = member.socials.linkedin.startsWith('http')
                                                            ? member.socials.linkedin
                                                            : `https://${member.socials.linkedin}`;
                                                        window.open(link, '_blank', 'noopener,noreferrer');
                                                    }}
                                                >
                                                    <Linkedin size={20} />
                                                </Button>
                                            )}

                                            {/* GitHub */}
                                            {member.socials?.github && (
                                                <Button
                                                    variant='outline'
                                                    className='p-2 hover:bg-secondary text-secondary border-secondary'
                                                    onClick={() => {
                                                        const link = member.socials.github.startsWith('http')
                                                            ? member.socials.github
                                                            : `https://${member.socials.github}`;
                                                        window.open(link, '_blank', 'noopener,noreferrer');
                                                    }}
                                                >
                                                    <Github size={20} />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                < div className='my-auto space-x-2' >
                                    <Button
                                        variant={'outline'}
                                        className={'p-2 text-green-500 border-green-500 hover:bg-green-500'}
                                        onClick={() => handleAccept(member._id)}
                                    >
                                        <Check />
                                    </Button>
                                    <Button
                                        variant={'outline'}
                                        className={'p-2 text-red-500 border-red-500 hover:bg-red-500'}
                                        onClick={() => handleReject(member._id)}
                                    >
                                        <X />
                                    </Button>
                                </div >
                            </div>
                        );
                    }))}
                </div>
            </div>
        </Layout>
    )





}

export default TeamRequests
