window.onload = function() {
    // CLIENT

    const HOST = 'server.com/';

    function populateCategories(category) {
        const activeMenuItemName = activeMenuItem.children[0].innerHTML;
        api.get(HOST + 'categories', {category, menuItem: activeMenuItemName}, function(categories) {
            let newCategories = '';
            for (const category of categories) {
                const categoryElement = `
                    <li class="menu__sub__categoreis__item">
                        <a href="#" class="menu__sub__categories__item__link">${category}</a>
                    </li>
                `;
                newCategories += categoryElement;
            }
            const categoriesElement = document.getElementsByClassName(`menu__sub__categories__items--${category}`)[0];
            categoriesElement.innerHTML = newCategories;
        });
    }

    function showSubmenu() {
        const submenu = document.getElementsByClassName("menu__sub")[0];
        submenu.style.display = "block";

        populateCategories('top');
        populateCategories('additional');
    }

    let activeMenuItem = null;

    function hideSubmenu() {
        if (activeMenuItem) {
            activeMenuItem.classList.remove("menu__main__item--active");
        }
        const submenu = document.getElementsByClassName("menu__sub")[0];
        submenu.style.display = "none";
    }

    function onMenuItemMouseEnter(item) {
        if (activeMenuItem) {
            activeMenuItem.classList.remove("menu__main__item--active");
        }
        activeMenuItem = item;
        item.classList.add("menu__main__item--active");
        showSubmenu();
    }

    const menuItems = document.getElementsByClassName("menu__main__item");
    for (const menuItem of menuItems) {
        menuItem.onmouseenter = () => onMenuItemMouseEnter(menuItem);
    }

    const menu = document.getElementsByClassName("menu")[0];
    menu.onmouseleave = hideSubmenu;

    // Server

    function getCategories(data) {
        if (data.category === 'top') {
            if (data.menuItem === 'Home') {
                return [
                    'Bedroom',
                    'Living room',
                    'Kitchen',
                    'Bathroom',
                ]
            }
            else if (data.menuItem === 'Motors') {
                return [
                    'Car',
                    'Motorcycle',
                    'Plane',
                    'Trucks',
                    'Wheels'
                ];
            }
            else if (data.menuItem === 'Fashion') {
                return [
                    'Women\'s tops',
                    'Men\'s tops',
                    'Jeans',
                    'Hats'
                ];
            }
            else if (data.menuItem === 'Electronics') {
                return [
                    'Computers',
                    'Laptops',
                    'Gaming',
                    'Headsets',
                    'Accessories'
                ]
            }
            else if (data.menuItem === 'Toys') {
                return [
                    'Adults',
                    'Children',
                    'Action figures',
                    'Dolls',
                    'Play-Doh'
                ]
            }
            // else
            return [
                'Server apple',
                'Server banana',
                'Server pear',
                'Server orange'
            ];
        }
        if (data.category === 'additional') {
            if (data.menuItem === 'Home') {
                return [
                    'Roof',
                    'Hallways',
                    'Closets',
                    'Laundry',
                    'Garage'
                ]
            }
            else if (data.menuItem === 'Motors') {
                return [
                    'Tires',
                    'Windshields',
                    'Ski racks',
                    'Doors',
                    'Windows'
                ];
            }
            else if (data.menuItem === 'Fashion') {
                return [
                    'On sale',
                    'Red stuff',
                    'Gucci',
                    'New Arrivals'
                ];
            }
            else if (data.menuItem === 'Electronics') {
                return [
                    'Playstation',
                    'XBox',
                    'Mac',
                    'Keyboards',
                    'Monitors'
                ]
            }
            else if (data.menuItem === 'Toys') {
                return [
                    'Trains',
                    'Construction',
                    'Electronic',
                    'Games',
                    'Cars and radio controlled'
                ]
            }
            // else
            return [
                'Server square',
                'Server circle',
                'Server oval',
                'Server diamond'
            ];
        }
        return [];
    }

    const endpoints = {
        "/categories": {
            "get": getCategories
        }
    }

    function getFunction(url, data, callback) {
        const domain = url.substring(0, url.indexOf("/"));
        const endpoint = url.substring(url.indexOf("/"), url.length);

        callback(endpoints[endpoint]["get"](data));
    }

    const api = {
        get: getFunction
    }
}