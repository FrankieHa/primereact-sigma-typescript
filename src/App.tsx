import React, { Component, createRef } from 'react';
import classNames from 'classnames';
import { AppTopbar } from './AppTopbar';
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel';
import {AppInlineProfile} from './AppInlineProfile';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'fullcalendar/dist/fullcalendar.css';
import './layout/layout.css';
import './App.css';

interface AppProps {
}

interface AppState {
    layoutMode: string;
    layoutColorMode: string;
    staticMenuInactive: boolean;
    overlayMenuActive: boolean;
    mobileMenuActive: boolean;
}

class App extends React.Component<AppProps, AppState> {

    private menuClick: boolean = false;
    private layoutMenuScroller: any;

    constructor(props: AppProps) {
        super(props);
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false
        };

        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);

        this.createMenu();
    }

    createMenu() {
    }

    onWrapperClick(event: React.MouseEvent) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            });
        }

        this.menuClick = false;
    }

    onToggleMenu(event: React.MouseEvent) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });
        }

        event.preventDefault();
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    onSidebarClick(event: React.MouseEvent) {
        this.menuClick = true;
        setTimeout(() => {
            if (this.layoutMenuScroller) {
                // Workaround because file ScrollPanel.d.ts is missing moveBar() function definition
                this.layoutMenuScroller["moveBar"]();
//                this.layoutMenuScroller.moveBar();
            }
        }, 500);
    }

    render() {
        let logo = this.state.layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg' : 'assets/layout/images/logo.svg';

        let wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });

        let sidebarClassName = classNames("layout-sidebar", { 'layout-sidebar-dark': this.state.layoutColorMode === 'dark' });

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
                        </div>
                    </ScrollPanel>
                </div>

            </div>
        );
    }
}

export default App;
