const SkillsPreview = ({ resumeInfo }) => {
    return (
        <div>
            <div className="my-6">
                <div className="text-center">
                    <div className="inline-block">
                        <h2 className="text-center font-bold text-sm mb-2" style={{ color: resumeInfo?.headingColor }}>
                            Skills
                        </h2>
                        <hr className="border-[2px] border-gray-600 w-[80%] mx-auto rounded-xl" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 my-4">
            {
                resumeInfo?.skills.map((skills, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <h2 className="text-xs">{skills.name}</h2>
                        <div className="h-2 w-[120px] bg-gray-200">
                            <div className="h-2 bg-gray-600" style={{width:skills.rating*20+"%"}}>

                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default SkillsPreview