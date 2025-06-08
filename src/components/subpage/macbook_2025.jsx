import { useState } from "react";
import Loading from "../loading";

function MacBook_2025({ project }) {

    const [loading, setLoading] = useState(true); // State to track image loading
    const hostingURL = process.env.REACT_APP_HOSTING_URL;

    // Check if project is found
    if (!project) {
        return <Loading />;
    }

    // Handle the image load event
    const handleImageLoad = () => {
        setLoading(false); // Once the image is loaded, hide the spinner
    };

    return (
        <>
            <div className="macbook !p-0 sm:px-[4%]">
                <div className="screen">
                    <div className="viewport overflow-hidden">
                        <div className="relative">
                            {/* Display spinner while loading */}
                            {loading && (
                                <svg
                                    className="mr-3 size-5 animate-spin absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 118 8A8 8 0 014 12z"
                                    ></path>
                                </svg>
                            )}

                            {/* Render images after loading */}
                            <img   src={`${hostingURL}/${project.projectYear}/${project.thumbnailImage1}`} alt="" />
                            {/* <img
                                src={`${hostingURL}/${project.projectYear}/${project.fullImage}`}
                                alt=""
                                className="absolute w-1/4 right-[0%] top-[50%] -mt-[240%]"
                                onLoad={handleImageLoad}
                            />
                            <img
                                src={`${hostingURL}/${project.projectYear}/${project.fullImage}`}
                                alt=""
                                className="absolute w-1/4 left-[50%] top-[15%] -mt-[45%]"
                                onLoad={handleImageLoad}
                            />
                            <img
                                src={`${hostingURL}/${project.projectYear}/${project.fullImage}`}
                                alt=""
                                className="absolute w-1/4 left-[25%] top-[50%] mt-[50%]"
                                onLoad={handleImageLoad}
                            />
                            <img
                                src={`${hostingURL}/${project.projectYear}/${project.fullImage}`}
                                alt=""
                                className="w-1/4 absolute left-[0%] top-[75%] -mt-[75%]"
                                onLoad={handleImageLoad}
                            />
                            <img
                                src={`${hostingURL}/${project.projectYear}/${project.fullImage}`}
                                alt=""
                                className="absolute w-1/4 left-[100%] -top-[100%] -mt-[100%]"
                                onLoad={handleImageLoad}
                            /> */}
                        </div>
                    </div>
                </div>
                <div className="base"></div>
                <div className="notch"></div>
            </div>
        </>
    );
}

export default MacBook_2025;
