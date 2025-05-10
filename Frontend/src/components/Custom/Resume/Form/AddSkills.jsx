import React, { useContext, useEffect, useState } from 'react'
import { Input } from '../../../ui/input'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '../../../ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'
const AddSkills = () => {
    const [skillsList, setSkillsList] = useState([{
        name: '',
        rating: 0
    }])
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const handleChange = (index, name, value) => {
        const newEntries = skillsList.slice()
        newEntries[index][name] = value
        setSkillsList(newEntries)
    }

    const AddNewSkills = () => {
        setSkillsList([...skillsList, {

        }])
    }
    const RemoveSkills = () => {
        setSkillsList((skillsList) => skillsList.slice(0, -1));
    }
    const saveHandler = () => {

    }
    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        })
    }, [skillsList])
    return (
        <div>
            <div className="p-5 rounded-lg"></div>
            <h2 className="font-bold text-lg">Skills</h2>
            <p>Add your Skills</p>
            <div>
                {skillsList.map((item, index) => (
                    <div className='flex justify-between border rounded-lg p-3 mb-2'>
                        <div>
                            <label className=' text-xs'>Name</label>
                            <Input onChange={(e) => handleChange(index, 'name', e.target.value)} className="w-full" />
                        </div>
                        <Rating style={{ maxWidth: 120 }} value={item.rating} onChange={(v) => handleChange(index, 'rating', v)} />
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        className=" text-primary"
                        onClick={AddNewSkills}
                    >
                        + Add More Skills{" "}
                    </Button>
                    {skillsList.length > 1 && (
                        <Button
                            variant="outline"
                            className=" text-primary"
                            onClick={RemoveSkills}
                        >
                            Remove
                        </Button>
                    )}
                </div>
                <Button onClick={saveHandler}>
                    Save {loading && <LoaderCircle className=" animate-spin" />}
                </Button>
            </div>
        </div>
    )
}

export default AddSkills