class MenuItem {
    constructor(
        public id: number,
        public title: string,
        public path: string[],
        public icon: string,
        public hasSubItems: boolean,
        public subItems: MenuItem[],
        public resourceName?: string
    ) { }
}

export { MenuItem };