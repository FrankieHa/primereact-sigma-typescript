import React, { useState } from 'react'
import classNames from 'classnames'
import { MenuItem } from 'primereact/components/menuitem/MenuItem'

interface AppSubmenuProps {
    className?: string
    items: Array<MenuItem>
    onMenuItemClick(e: { originalEvent: Event, item: MenuItem }): void
    root?: boolean
}
const AppSubmenu = (props: AppSubmenuProps) => {
    const [activeIndex, setActiveIndex] = useState<React.Key | null>(null);

    function onMenuItemClick(event: any, item: MenuItem, index: React.Key) {
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

        if (index === activeIndex)
            setActiveIndex(null)
        else
            setActiveIndex(index)

        if (props.onMenuItemClick) {
            props.onMenuItemClick({
                originalEvent: event,
                item: item
            })
        }
    }

    let items = props.items && props.items.map((item, i) => {
        let active = activeIndex === i
        let styleClass = classNames({ 'active-menuitem': active })
        //            let styleClass = classNames(item.badgeStyleClass, {'active-menuitem': active})
        //            let badge = item.badge && <span className="menuitem-badge">{item.badge}</span>
        let submenuIcon = item.items && <i className="pi pi-fw pi-angle-down menuitem-toggle-icon"></i>

        return (
            <li className={styleClass} key={i}>
                {item.items && props.root === true && <div className='arrow'></div>}
                <a href={item.url} onClick={(e) => onMenuItemClick(e, item, i)} target={item.target}>
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                    {submenuIcon}
                </a>
                <AppSubmenu items={item.items as Array<MenuItem>} onMenuItemClick={props.onMenuItemClick} />
            </li>
        )
    })

    return items ? <ul className={props.className}>{items}</ul> : null
}

interface AppMenuProps {
    model: Array<MenuItem>
    onMenuItemClick(e: { originalEvent: Event, item: MenuItem }): void
}
export const AppMenu = (props: AppMenuProps) => {
    return (
        <div className="menu"><AppSubmenu items={props.model} className="layout-main-menu"
            onMenuItemClick={props.onMenuItemClick} root={true} />
        </div>)
}