import { useUser } from '../context/userContext'
import Layout from '../layouts/Layout'
import Avatar from '../components/ui/Avatar';
import { Label, Input } from '../components/ui/FormElements';
import { useState } from 'react';

const EditProfile = () => {
    const { user } = useUser();
    const [basicInfoForm, setBasicInfoForm] = useState({
    fullName: "",
    email: "",
    branch: "",
    year: "",
    bio: "",
  })
  const handleBaiscInfoChange = (e) => {
    const { name, value } = e.target;
    setBasicInfoForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(basicInfoForm);
    return (
        <Layout>
            <section className='px-50 flex flex-col gap-4'>
                <h2 className='text-4xl font-bold mb-4'>My Profile</h2>
                <div className='flex gap-2 rounded-xl border-2 border-border px-8 py-6'>
                    <div className="pfp flex justify-center items-center">
                        <Avatar member={user} size={'size-26'} />
                    </div>
                    <div className="min-h-[95%] border border-muted mx-4" />
                    <div className='flex flex-col gap-2 justify-center'>
                        <h3 className='text-2xl font-semibold'>{user.name}</h3>
                        <div className='university text-lg text-muted-foreground'>
                            {user.university && (<p>{user.university}</p>)}
                            <p>
                                {user.branch && (<span>{user.branch}</span>)}
                                {user.year && (<span>•{user.year}</span>)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className='rounded-xl border-2 border-border px-10 py-8 space-y-4'>
                    <h3 className='text-xl font-semibold'>Basic Information</h3>
                    <form className='grid grid-cols-2 grid-rows-3 space-x-4'>
                        <Label htmlFor='fullName'>
                            Full Name
                            <Input name='fullName' id='fullName' onChange={handleBaiscInfoChange} />
                        </Label>
                        <Label htmlFor='email'>
                            Email
                            <Input name='email' id='email' onChange={handleBaiscInfoChange} />
                        </Label>
                        <Label htmlFor='branch'>
                            Branch
                            <Input name='branch' id='branch' onChange={handleBaiscInfoChange} />
                        </Label>
                        <Label htmlFor='year'>
                            Year
                            <Input name='year' id='year' onChange={handleBaiscInfoChange} />
                        </Label>
                        <Label htmlFor='bio' className='col-span-2'>
                            Bio
                            <textarea name="bio" id='bio' onChange={handleBaiscInfoChange} className="block border border-border w-full min-h-25 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 ring-primary1"></textarea>
                        </Label>
                    </form>
                </div>
            </section>
        </Layout>
    )
}

export default EditProfile
