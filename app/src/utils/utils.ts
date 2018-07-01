export function prefixRoutes(name: string, routes) {
    return routes.map(entry => {
        entry.path = "/" + name + "/" + entry.path;
        return entry;
    });
}
