import React from 'react'
import classNames from 'classnames'
import { AppTopbar } from './AppTopbar'
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel'
import { AppInlineProfile } from './AppInlineProfile'
import { AppMenu } from './AppMenu'
import { MenuItem } from 'primereact/components/menuitem/MenuItem'
import { Route } from 'react-router-dom'
import {DataDemo} from './components/DataDemo'

import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'fullcalendar/dist/fullcalendar.css'
import './layout/layout.css'
import './App.css'

interface AppProps {
}

interface AppState {
    layoutMode: string
    layoutColorMode: string
    staticMenuInactive: boolean
    overlayMenuActive: boolean
    mobileMenuActive: boolean
}

class App extends React.Component<AppProps, AppState> {

    private menuClick: boolean = false
    private layoutMenuScroller!: ScrollPanel | null
    private menu!: Array<MenuItem>

    constructor(props: AppProps) {
        super(props)
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false
        }

        this.onWrapperClick = this.onWrapperClick.bind(this)
        this.onToggleMenu = this.onToggleMenu.bind(this)
        this.onSidebarClick = this.onSidebarClick.bind(this)
        this.onMenuItemClick = this.onMenuItemClick.bind(this)

        this.createMenu()
    }

    createMenu() {
        this.menu = [
            {
                label: 'Menu Modes', icon: 'pi pi-fw pi-cog',
                items: [
                    { label: 'Static Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutMode: 'static' }) },
                    { label: 'Overlay Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutMode: 'overlay' }) }
                ]
            },
            {
                label: 'Menu Colors', icon: 'pi pi-fw pi-align-left',
                items: [
                    { label: 'Dark', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutColorMode: 'dark' }) },
                    { label: 'Light', icon: 'pi pi-fw pi-bars', command: () => this.setState({ layoutColorMode: 'light' }) }
                ]
            },
            {
                label: 'Components', icon: 'pi pi-fw pi-globe',
                //                label: 'Components', icon: 'pi pi-fw pi-globe', badge: '9',
                items: [
                    { label: 'Data', icon: 'pi pi-fw pi-align-justify', command: () => { window.location.href = "#/data" } },
                    { label: '123456789012345678901234567890', icon: 'pi pi-fw pi-align-justify', command: () => { window.location.href = "#/123" } }
                ]
            }
        ]
    }

    onWrapperClick(event: React.MouseEvent) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }

        this.menuClick = false
    }

    onToggleMenu(event: React.MouseEvent) {
        this.menuClick = true

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                })
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                })
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive
            this.setState({
                mobileMenuActive: !mobileMenuActive
            })
        }

        event.preventDefault()
    }

    isDesktop(): boolean {
        return window.innerWidth > 1024
    }

    onSidebarClick(event: React.MouseEvent) {
        this.menuClick = true
        setTimeout(() => {
            if (this.layoutMenuScroller) {
                // Workaround because file ScrollPanel.d.ts is missing moveBar() function definition
                (this.layoutMenuScroller as any)["moveBar"]()
                //                this.layoutMenuScroller.moveBar()
            }
        }, 500)
    }

    onMenuItemClick(event: { originalEvent: Event, item: MenuItem }) {
        if (!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }
    }

    render() {
        let logo = this.state.layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg' : 'assets/layout/images/logo.svg'

        let wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        })

        let sidebarClassName = classNames("layout-sidebar", { 'layout-sidebar-dark': this.state.layoutColorMode === 'dark' })

        return (
            <div className={wrapperClass} onClick={this.onWrapperClick}>
                <AppTopbar onToggleMenu={this.onToggleMenu} />

                <div className={sidebarClassName} onClick={this.onSidebarClick}>

                    <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{ height: '100%' }}>
                        <div className="layout-sidebar-scroll-content" >
                            <div className="layout-logo">
                                <img alt="Logo" src={logo} />
                            </div>
                            <AppInlineProfile />
                            <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
                        </div>
                    </ScrollPanel>
                </div>

                <div className="layout-main">
                    <Route path="/data" component={DataDemo} />
                </div>

            </div>
        )
    }
}

export default App
