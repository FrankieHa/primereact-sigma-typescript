import React from 'react'
import classNames from 'classnames'
import { MenuItem } from 'primereact/components/menuitem/MenuItem'

interface AppSubmenuProps {
    className?: string
    items: Array<MenuItem>
    onMenuItemClick(e: {originalEvent: Event, item: MenuItem}): void
    root?: boolean
}

interface AppSubmenuState {
    activeIndex: React.Key | null
}

class AppSubmenu extends React.Component<AppSubmenuProps, AppSubmenuState> {
    constructor(props: AppSubmenuProps) {
        super(props)
        this.state = {
            activeIndex: null
        }
    }

    onMenuItemClick(event: any, item: MenuItem, index: React.Key) {
        //avoid processing disabled items
        if (item.disabled) {
            event.preventDefault()
            return true
        }

        //execute command
        if (item.command) {
            item.command({ originalEvent: event, item: item })
        }

        //prevent hash change
        if (item.items || !item.url) {
            event.preventDefault()
        }

        if (index === this.state.activeIndex)
            this.setState({ activeIndex: null })
        else
            this.setState({ activeIndex: index })

        if (this.props.onMenuItemClick) {
            this.props.onMenuItemClick({
                originalEvent: event,
                item: item
            })
        }
    }

    render() {
        let items = this.props.items && this.props.items.map((item, i) => {
            let active = this.state.activeIndex === i
            let styleClass = classNames({ 'active-menuitem': active })
            //            let styleClass = classNames(item.badgeStyleClass, {'active-menuitem': active})
            //            let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>
            let submenuIcon = item.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>

            return (
                <li className={styleClass} key={i}>
                    {item.items && this.props.root === true && <div className='arrow'></div>}
                    <a href={item.url} onClick={(e) => this.onMenuItemClick(e, item, i)} target={item.target}>
                        <i className={item.icon}></i>
                        <span>{item.label}</span>
                        {submenuIcon}
                    </a>
                    <AppSubmenu items={item.items as Array<MenuItem>} onMenuItemClick={this.props.onMenuItemClick} />
                </li>
            )
        })

        return items ? <ul className={this.props.className}>{items}</ul> : null
    }
}

interface AppMenuProps {
    model: Array<MenuItem>
    onMenuItemClick(e: {originalEvent: Event, item: MenuItem}): void
}

interface AppMenuState {
}

export class AppMenu extends React.Component<AppMenuProps, AppMenuState> {
    render() {
        return <div className="menu"><AppSubmenu items={this.props.model} className="layout-main-menu" onMenuItemClick={this.props.onMenuItemClick} root={true} /></div>
    }
}
``