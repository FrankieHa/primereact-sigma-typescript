import React, { useState } from 'react'
import classNames from 'classnames'

export const AppInlineProfile = () => {
    const [expanded, setExpanded] = useState(false);

    function onClick(event: React.MouseEvent) {
        setExpanded(!expanded)
        event.preventDefault()
    }

    return (
        <div className="profile">
            <div>
                <img src="assets/layout/images/profile.png" alt="" />
            </div>
            {/* eslint-disable */}
            <a className="profile-link" onClick={onClick}>
                <span className="username">Claire Williams</span>
                <i className="pi pi-fw pi-cog" />
            </a>
            {/* eslint-disable */}
            <ul className={classNames({ 'profile-expanded': expanded })}>
                <li><a><i className="pi pi-fw pi-user" /><span>Account</span></a></li>
                <li><a><i className="pi pi-fw pi-inbox" /><span>Notifications</span><span className="menuitem-badge">2</span></a></li>
                <li><a><i className="pi pi-fw pi-power-off" /><span>Logout</span></a></li>
            </ul>
        </div>
    )
}
