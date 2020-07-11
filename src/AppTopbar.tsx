import React from 'react'
import { InputText } from 'primereact/inputtext'

interface Props {
    onToggleMenu: React.MouseEventHandler
}

export const AppTopbar = (props: Props) => {
    return (
        <div className="layout-topbar clearfix">
            {/* eslint-disable */}
            <a className="layout-menu-button" onClick={props.onToggleMenu}>
                <span className="pi pi-bars" />
            </a>
            <div className="layout-topbar-icons">
                <span className="layout-topbar-search">
                    <InputText type="text" placeholder="Search" />
                    <span className="layout-topbar-search-icon pi pi-search" />
                </span>
                <a>
                    <span className="layout-topbar-item-text">Events</span>
                    <span className="layout-topbar-icon pi pi-calendar" />
                    <span className="layout-topbar-badge">5</span>
                </a>
                <a>
                    <span className="layout-topbar-item-text">Settings</span>
                    <span className="layout-topbar-icon pi pi-cog" />
                </a>
                <a>
                    <span className="layout-topbar-item-text">User</span>
                    <span className="layout-topbar-icon pi pi-user" />
                </a>
                {/* eslint-disable */}
            </div>
        </div>
    )
}
