import { Funnel, CirclePlus } from 'lucide-react'
import { Input } from '../components/ui/FormElements';
import Layout from '../layouts/Layout';
import Dropdown from '../components/ui/Dropdown';
import { useTeam } from '../context/teamContext'
import { useEffect, useState } from 'react';
import Card from '../components/TeamsPage/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const TeamDashboard = () => {
    const navigate = useNavigate();
    const { teams, loading } = useTeam();
    const [filtered, setFiltered] = useState(teams);
    useEffect(() => {
        setFiltered(teams);
        // console.log(teams);
    }, [teams, loading])

    const categoryFilter = (category) => {
        if (category === 'All Teams') setFiltered(teams);
        else if (category === 'Recruiting') setFiltered(teams.filter(team => team.teamSize !== team.members.length));
        else setFiltered(teams.filter(team => team.teamSize === team.members.length));
    }
    const searchFilter = (search) => {
        if (search === '') setFiltered(teams);
        else setFiltered(teams.filter(team =>
            team.teamName.toLowerCase().includes(search) ||
            team.rolesNeeded.some(role => (role.toLowerCase().includes(search))) ||
            team.eventId.title.toLowerCase().includes(search)
        ));
    }

    if (loading) return <p>Loading...</p>
    return (
        <Layout>
            <section>
                <div className='flex justify-between'>
                    <div>
                        <h2 className='text-4xl font-bold mb-2'>Find Your Team</h2>
                        <p className='text-muted-foreground mb-4'>Join existing teams or create your own for upcoming events</p>
                    </div>
                    <Button
                        className='h-fit'
                        onClick={() => navigate('/create-team')}
                    >
                        <CirclePlus />
                        Create Team
                    </Button>
                </div>
                <div className='flex gap-5'>
                    <Input type="text" name='search' placeholder='Search teams by name, event, or skills needed...' onChange={(e) => searchFilter(e.target.value.toLowerCase())} />
                    <Dropdown options={['All Teams', 'Recruiting', 'Full']} onSelect={categoryFilter} >
                        <Funnel />
                    </Dropdown>
                </div>
                <p className='text-md text-muted-foreground my-6'>Showing {filtered.length} of {teams.length} teams</p>
                <div className='flex flex-wrap items-center gap-4'>
                    {filtered.map((team, index) => (
                        <Card key={index} team={team} />
                    ))}
                </div>
            </section>

        </Layout>
    )
}

export default TeamDashboard
