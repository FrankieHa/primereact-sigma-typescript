import React, { useState,  } from 'react'
import classNames from 'classnames'
import { AppTopbar } from './AppTopbar'
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel'
import { AppInlineProfile } from './AppInlineProfile'
import { AppMenu } from './AppMenu'
import { MenuItem } from 'primereact/components/menuitem/MenuItem'
import { Route } from 'react-router-dom'
import { DataDemo } from './components/DataDemo'
import { DataHooksDemo } from './components/DataHooksDemo'

import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'fullcalendar/main.css'
import './layout/layout.css'
import './App.css'

interface AppState {
    layoutMode: string
    layoutColorMode: string
    staticMenuInactive: boolean
    overlayMenuActive: boolean
    mobileMenuActive: boolean
}

const App = () => {
    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('dark');
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);

    let menuClick: boolean = false
    let layoutMenuScroller!: ScrollPanel | null
    let menu!: Array<MenuItem>

    menu = [
        {
            label: 'Menu Modes', icon: 'pi pi-fw pi-cog',
            items: [
                { label: 'Static Menu', icon: 'pi pi-fw pi-bars', command: () => setLayoutMode('static') },
                { label: 'Overlay Menu', icon: 'pi pi-fw pi-bars', command: () => setLayoutMode('overlay') }
            ]
        },
        {
            label: 'Menu Colors', icon: 'pi pi-fw pi-align-left',
            items: [
                { label: 'Dark', icon: 'pi pi-fw pi-bars', command: () => setLayoutColorMode('dark') },
                { label: 'Light', icon: 'pi pi-fw pi-bars', command: () => setLayoutColorMode('light') }
            ]
        },
        {
            label: 'Components', icon: 'pi pi-fw pi-globe',
            //                label: 'Components', icon: 'pi pi-fw pi-globe', badge: '9',
            items: [
                { label: 'Data', icon: 'pi pi-fw pi-align-justify', command: () => { window.location.href = "#/data" } },
                { label: 'Data - Hooks', icon: 'pi pi-fw pi-align-justify', command: () => { window.location.href = "#/datahooks" } }
            ]
        }
    ]

    function onWrapperClick(event: React.MouseEvent) {
        if (!menuClick) {

            setOverlayMenuActive(false)
            setMobileMenuActive(false)

        }

        menuClick = false
    }

    function onToggleMenu(event: React.MouseEvent) {
        menuClick = true

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                setOverlayMenuActive(!overlayMenuActive)
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive(!staticMenuInactive)
            }
        }
        else {
            setMobileMenuActive(!mobileMenuActive)
        }

        event.preventDefault()
    }

    function isDesktop(): boolean {
        return window.innerWidth > 1024
    }

    function onSidebarClick(event: React.MouseEvent) {
        menuClick = true
        setTimeout(() => {
            if (layoutMenuScroller) {
                // Workaround because file ScrollPanel.d.ts is missing moveBar() function definition
                (layoutMenuScroller as any)["moveBar"]()
                //                this.layoutMenuScroller.moveBar()
            }
        }, 500)
    }

    function onMenuItemClick(event: { originalEvent: Event, item: MenuItem }) {
        if (!event.item.items) {
            setOverlayMenuActive(false)
            setMobileMenuActive(false)
        }
    }

    let logo = layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg' : 'assets/layout/images/logo.svg'

    let wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive
    })

    let sidebarClassName = classNames("layout-sidebar", { 'layout-sidebar-dark': layoutColorMode === 'dark' })

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <AppTopbar onToggleMenu={onToggleMenu} />

            <div className={sidebarClassName} onClick={onSidebarClick}>

                <ScrollPanel ref={(el) => layoutMenuScroller = el} style={{ height: '100%' }}>
                    <div className="layout-sidebar-scroll-content" >
                        <div className="layout-logo">
                            <img alt="Logo" src={logo} />
                        </div>
                        <AppInlineProfile />
                        <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
                    </div>
                </ScrollPanel>
            </div>

            <div className="layout-main">
                <Route path="/data" component={DataDemo} />
                <Route path="/datahooks" component={DataHooksDemo} />
            </div>

        </div>
    )
}

export default App
