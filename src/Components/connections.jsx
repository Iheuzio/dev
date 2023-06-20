import React from 'react';

const Connections = () => {
    return (
        <div>
            <section className="connections">
                <ul id="connections_nav">
                    <li>
                        <a href="https://github.com/Iheuzio" target="_blank" rel="noopener noreferrer" id="nav_link">
                            <div id="element">
                                <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" />
                                <p>Github</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/christopher-bartos-92b8a8273/" target="_blank" rel="noopener noreferrer" id="nav_link">
                            <div id="element">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/600px-LinkedIn_logo_initials.png" alt="LinkedIn" />
                                <p>LinkedIn</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.kaggle.com/christopherbartos/" target="_blank" rel="noopener noreferrer" id="nav_link">
                            <div id="element">
                                <img src="https://www.kaggle.com/static/images/favicon.ico" alt="Kaggle" />
                                <p>Kaggle</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href="https://gitlab.com/Christopher-" target="_blank" rel="noopener noreferrer" id="nav_link">
                            <div id="element">
                                <img src="https://about.gitlab.com/images/press/logo/png/gitlab-icon-rgb.png" alt="GitLab" />
                                <p>GitLab</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    );
}

export default Connections;