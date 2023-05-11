import person from '../../../assets/images/about_us/person.jpg';
import parts from '../../../assets/images/about_us/parts.jpg';

const About = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className='lg:w-2/2 relative'>
                    <img src={person} className="w-3/4 rounded-lg shadow-2xl" />
                    <img src={parts} className="w-1/2 absolute right-20 top-1/2 rounded-lg shadow-2xl border-8 border-white" />
                </div>
                <div className='space-y-6 p-4'>
                    <h3 className='font-bold text-orange-500 text-3xl uppercase'>About us</h3>
                    <h1 className="text-6xl font-bold ">We are qualified & of experience in this field</h1>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.</p>
                    <p>the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable.</p>
                    <button className="btn btn-primary">Get more info</button>
                </div>
            </div>
        </div>
    );
};

export default About;