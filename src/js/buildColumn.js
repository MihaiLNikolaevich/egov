export default function column(selectorCn = '.agent__cn', classNameUl = 'agent__gall', columnValue = 0) {
    const containers = document.querySelectorAll(selectorCn);
    if (!containers.length) return;

    const column = columnValue ? columnValue : window.innerWidth < 450
        ? 1 : window.innerWidth < 800
            ? 2 : window.innerWidth < 1100 ? 3 : 4;

    for (const container of containers) {

        const list = container.querySelectorAll(`.${classNameUl} > li`);
        let ul = newEl();

        const count = Math.ceil(list.length / column);
        let countIter = count;
        let columnIter = 1;

        for (let i = 0; i < list.length; i++) {
            if (countIter > i) {
                ul.append(list[i]);
                if (countIter - 1 === i || i === list.length - 1) {
                    container.append(ul);
                    columnIter++;
                    countIter = count * columnIter;
                    ul = newEl();
                }
            }
        }

        for (const ul of container.querySelectorAll(`.${classNameUl}`)) {
            if (!ul.children.length) ul.remove();
        }

    }

    function newEl(tag ='ul', classname = classNameUl) {
        const ul = document.createElement(tag);
        ul.className = classname;
        return ul;
    }
}
