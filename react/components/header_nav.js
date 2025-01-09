/**
 * The `HeaderNav` function is a React component that renders a navigation bar with links based on the
 * `navItems` prop.
 * @returns A functional component named HeaderNav is being returned. It takes two props, children and
 * navItems. Inside the component, a navigation bar is rendered with a list of links based on the
 * navItems array provided as a prop. Each link is displayed as a list item with an anchor tag
 * containing the link's name and href attribute.
 */
export default function HeaderNav({children, navItems}){
    return(
        <nav>
            <ul>
            {navItems.map(link => {
                return(
                    <li key={link.href}><a href={link.href}>{link.name}</a></li>
                )
            })}
            </ul>
        </nav>
    )
}
