import "react-responsive-carousel/lib/styles/carousel.min.css"; // Requires a loader
import { Carousel } from 'react-responsive-carousel';
import Marquee from "react-fast-marquee";
import img1 from '../../assets/b1.jpg';
import img2 from '../../assets/b2.jpg';
import img3 from '../../assets/b3.jpg';
import img5 from '../../assets/b4.jpg';
import img6 from '../../assets/b5.jpg';

import ad1 from '../../assets/ad1.jpg';
import ad2 from '../../assets/ad2.jpg';
import ad3 from '../../assets/ad3.jpg';
import ad5 from '../../assets/ad5.jpg';
import ad6 from '../../assets/ad6.jpg';
import ad7 from '../../assets/ad7.jpg';
import ad8 from '../../assets/ad8.jpg';
import ad9 from '../../assets/ad9.jpg';
import ad10 from '../../assets/ad10.jpg';
import ad11 from '../../assets/ad11.jpg';
import ad12 from '../../assets/ad12.jpg';
import ad13 from '../../assets/ad13.jpg';

const Banner = () => {
    const images = [img1, img2, img3, img5, img6];
    const advertise1 = [ad1, ad2, ad3];
    const advertise2 = [ad12, ad11, ad13];
    const advertise3 = [ad5, ad6, ad7, ad8, ad9, ad10];

    return (
        <div className="space-y-8">
            {/* Top Section with Two Grids and a Carousel */}
            <div className="flex flex-col lg:flex-row justify-center gap-6 lg:items-start items-center">
                {/* First Image Grid */}
                <div className="grid grid-cols-2 w-full max-w-md mx-auto gap-2">
                    <img
                        src={advertise1[0]}
                        alt="Ad Image 1"
                        className="w-full h-full object-cover"
                    />
                    <div className="flex flex-col gap-2">
                        <img
                            src={advertise1[1]}
                            alt="Ad Image 2"
                            className="w-full h-1/2 object-cover"
                        />
                        <img
                            src={advertise1[2]}
                            alt="Ad Image 3"
                            className="w-full h-1/2 object-cover"
                        />
                    </div>
                </div>

                {/* Carousel Section */}
                <div className="w-full lg:w-1/2 max-w-lg">
                    <Carousel showThumbs={false} autoPlay interval={3000} infiniteLoop>
                        {images.map((image, index) => (
                            <div key={index}>
                                <img src={image} alt={`Banner ${index + 1}`} />
                            </div>
                        ))}
                    </Carousel>
                </div>

                {/* Second Image Grid */}
                <div className="grid grid-cols-2 w-full max-w-md mx-auto gap-2">
                    <div className="flex flex-col gap-2">
                        <img
                            src={advertise2[1]}
                            alt="Ad Image 4"
                            className="w-full h-1/2 object-cover"
                        />
                        <img
                            src={advertise2[2]}
                            alt="Ad Image 5"
                            className="w-full h-1/2 object-cover"
                        />
                    </div>
                    <img
                        src={advertise2[0]}
                        alt="Ad Image 6"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Bottom Section with Marquee */}
            <Marquee direction="right">
                <div className="marquee-content flex gap-4">
                    {/* Dynamically render each image or tag */}
                    {advertise3.map((src, index) => (
                        <div className="marquee-tag" key={index}>
                            <img
                                src={src}
                                alt={`Ad Image ${index + 1}`}
                                className="w-64 h-32 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </Marquee>

        </div>
    );
};

export default Banner;
