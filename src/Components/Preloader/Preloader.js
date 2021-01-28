import React from 'react';
import ContentLoader from 'react-content-loader';

const Preloader = () => {
    const repeat = [1, 1, 1, 1];
    return (
        <div className="row">
            {
                repeat.map((item, index) =>
                    <div className="col-md-3 col-6" key={index}>
                        <ContentLoader
                            viewBox="0 0 235 300"
                            speed={3}
                        >
                            <rect x="0" y="0" rx="5" ry="5" width="100%" height="157" />
                            <rect x="0" y="164" rx="0" ry="0" width="100%" height="8" />

                        </ContentLoader>
                    </div>
                )
            }
        </div>
    );
};

export default Preloader;