import { Calendar, Shield, Sparkles, Target, Text, Users, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import heroImage from '../assets/heroImage.png'
import Card from "../components/HomePage/Card"
import { Button } from "../components/ui/Button"
import Layout from "../layouts/Layout"

const Home = () => {
    const cardContents = [
        {
            logo: <Users />,
            title: 'Team Formation',
            desc: 'Connect with talented individuals and form the perfect team for your next event'
        },
        {
            logo: <Calendar />,
            title: 'Event Management',
            desc: 'Organizations can easily create and manage hackathons, competitions, and workshops'
        },
        {
            logo: <Text />,
            title: 'Real-Time Chat',
            desc: 'Collaborate seamlessly with built-in team messaging and communication tools'
        },
        {
            logo: <Target />,
            title: 'Smart Matching',
            desc: 'Find team members with complementary skills and shared interests'
        },
        {
            logo: <Shield />,
            title: 'Secure Platform',
            desc: 'Professional-grade security to protect your data and communications'
        },
        {
            logo: <Zap />,
            title: 'Instant Updates',
            desc: 'Stay informed with real-time notifications about teams, events, and opportunities'
        }
    ];

    return (
        <Layout className='p-0'>
            <div>
                <section className="relative overflow-hidden px-6">
                    <div className="absolute inset-0 gradient-hero opacity-10 pointer-events-none" />
                    <div className="container mx-auto px-4 py-20 lg:py-32">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8 animate-fade-in">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                                    <Sparkles className="h-4 w-4" />
                                    <span className="text-sm font-medium">Your Campus Collaboration Hub</span>
                                </div>

                                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                                    Find Your Next
                                    <span className="block bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
                                        Hackathon Squad
                                    </span>
                                </h1>

                                <p className="text-xl text-muted-foreground">
                                    Connect with talented students, discover exciting campus events, and form winning teams.
                                    Your next big win starts here.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link to="/events">
                                        <Button size='lg' asChild >
                                            <Calendar className="h-5 w-5" />
                                            Explore Events
                                        </Button>
                                    </Link>
                                    <Link to="/create-team">
                                        <Button size="lg" variant="outline" asChild >
                                            <Users className="h-5 w-5" />
                                            Form a Team
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="relative animate-float">
                                <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl rounded-full" />
                                <img
                                    src={heroImage}
                                    alt="Students collaborating at hackathon"
                                    className="relative rounded-2xl shadow-2xl border border-border"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="bg-background w-full px-6 py-20 flex flex-col gap-5 justify-center items-center">
                    <h2 className="text-4xl font-bold">Everything You Need to Build Your Squad</h2>
                    <p className="text-xl text-muted-foreground">Powerful features designed to help teams collaborate and organizations manage events seamlessly</p>
                    <div className="card-container mt-16 flex flex-wrap gap-6 justify-evenly w-full">
                        {cardContents.map((card, index) => (
                            <Card key={index} logo={card.logo} title={card.title} desc={card.desc} />
                        ))}
                    </div>
                </section>

                <section className="py-20 px-6">
                    <div className="container mx-auto px-4">
                        <div className="relative overflow-hidden rounded-2xl gradient-hero p-12 text-center text-white">
                            <div className="relative z-10">
                                <h2 className="text-3xl lg:text-4xl font-bold mb-8">
                                    Ready to Squad Up?
                                </h2>
                                <p className="text-lg mb-8 opacity-90">
                                    Join our community of innovators, creators, and problem-solvers building the future together
                                </p>
                                <Link to="/login">
                                    <Button size={'lg'} className={'bg-blue-500'}>
                                        Create an Account
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>

    )
}

export default Home
