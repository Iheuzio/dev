import React from 'react';
import Connections from './connections.jsx';

const Introduction = () => {
    return (
        <div>
            <section className="introduction">
                <h1>
                    Christopher Bartos
                </h1>
                <h2>
                    Computer Science Student at Dawson College.
                </h2>
                <p>
                    I am interested in working with data, economics, and finance.
                    <br />
                    <br />
                    I am currently learning about data science and machine learning.
                    <br />
                    <br />
                    My alias online is Iheuzio. Discord is the best way to contact me. <b>@iheuzio</b>
                </p>
            <footer>
                <Connections />
            </footer>
            </section>
        </div>
    );
}

export default Introduction;