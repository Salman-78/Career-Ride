export default {
    firstName: 'James',
    lastName: 'Carter',
    jobTitle: 'full stack developer',
    address: '525 N tryon Street, NC 28117',
    phone: '(123)-456-7890',
    email: 'exmaple@gmail.com',
    headingColor: "#4b5563",
    subHeadingColor: "#4b5563",

    ResumeName: "TCS Resume",

    summary: 'Lorem ipsum dolor sit amet, consequat. velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    experience: [
        {
            id: 1,
            title: 'Full Stack Developer',
            companyName: 'Amazon',
            city: 'New York',
            state: 'NY',
            startDate: 'Jan 2021',
            endDate: '',
            currentlyWorking: true,
            workSummary: ' Designed, developed, and maintained full-stack applications using React and Node.js.\n' +
                '• Implemented responsive user interfaces with React, ensuring seamless user experiences across\n' +
                'various devices and browsers.\n' +
                '• Maintaining the React Native in-house organization application.' +
                '• CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end' +
                'and back-end systems.'
        },
        {
            id: 2,
            title: 'Frontend Developer',
            companyName: 'Google',
            city: 'Charlotte',
            state: 'NC',
            startDate: 'May 2019',
            endDate: 'Jan 2021',
            currentlyWorking: false,
            workSummary: ' Designed, developed, and maintained full-stack applications using React and Node.js.' +
                '• Implemented responsive user interfaces with React, ensuring seamless user experiences across' +
                'various devices and browsers.' +
                '• Maintaining the React Native in-house organization application.' +
                '• CreatedRESTfulAPIs withNode.js and Express,facilitating data communicationbetween the front-end' +
                'and back-end systems.'
        }
    ],
    education: [
        {
            id: 1,
            universityName: 'Gurunanak Institute Of technology',
            startDate: 'Aug 2021',
            endDate: 'Dec:2025',
            degree: 'Master',
            major: 'Computer Science',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
        },
        {
            id: 2,
            universityName: 'Howard university of Chhapra',
            startDate: 'Aug 2018',
            endDate: 'Dec:2019',
            degree: 'Master',
            major: 'Computer Science',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud'
        }
    ],
    skills: [
        {
            id: 1,
            name: 'Angular',
            rating: 1,
        },
        {
            id: 1,
            name: 'React',
            rating: 1,
        },
        {
            id: 1,
            name: 'MySql',
            rating: 1,
        },
        {
            id: 1,
            name: 'React Native',
            rating: 1,
        }
    ]
}