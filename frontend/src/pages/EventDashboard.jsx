import { Funnel, Search } from 'lucide-react'
import { Input } from '../components/ui/FormElements';
import Layout from '../layouts/Layout';
import Dropdown from '../components/ui/Dropdown';
import { useEvent } from '../context/eventContext'
import { useEffect, useState } from 'react';
import Card from '../components/EventsPage/Card';

const EventDashboard = () => {
  const { events, loading } = useEvent();
  const [filtered, setFiltered] = useState(events);
  useEffect(() => {
    setFiltered(events);
  }, [events])

  const categoryFilter = (category) => {
    if (category === 'All Items') setFiltered(events);
    else setFiltered(events.filter(event => event.category === category));
  }
  const searchFilter = (search) => {
    if(search === '') setFiltered(events);
    else setFiltered(events.filter(event => event.title.toLowerCase().includes(search)));
  }

  if (loading) return <p>Loading...</p>
  return (
    <Layout>
      <section>
        <h2 className='text-3xl md:text-4xl font-bold mb-2'>Discover Events</h2>
        <p className='text-lg text-muted-foreground mb-4'>Find hackathons, competitions, and workshops to join and grow your skills</p>
        <div className='flex flex-col md:flex-row gap-4'>
          <Input type="text" name='search' placeholder='Search events...' onChange={(e) => searchFilter(e.target.value.toLowerCase()) } />
          <Dropdown options={['All Items', 'Hackathon', 'Competition', 'Workshop']} onSelect={categoryFilter} >
            <Funnel />
          </Dropdown>
        </div>
        <p className='text-md text-muted-foreground my-6'>Showing {filtered.length} of {events.length} events</p>
        <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
          {filtered.map((event, index) => (
            <Card key={index} event={event} />
          ))}
        </div>
      </section>

    </Layout>
  )
}

export default EventDashboard
