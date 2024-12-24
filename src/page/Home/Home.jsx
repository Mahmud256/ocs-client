import React from 'react';
import Banner from '../../components/Banner/Banner';
import Testimonials from '../Testimonials/testimonials';
import FAQs from '../FAQs/FAQs';
import Contact from '../Contact/Contact';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';

const Home = () => {
    return (
        <div className='min-h-screen'>
            <Banner></Banner>
            <FeaturedProducts/>
            <Testimonials/>
            <FAQs/>
            <Contact/>
        </div>
    );
};

export default Home;