class LocalStorageUtility {
    public static logIn(user: UserTable): void {
        console.log(JSON.stringify(user));
        localStorage.setItem("role", user.Type);
        localStorage.setItem("user", JSON.stringify(user));
    }

    public static logOut(): void {
        localStorage.removeItem("role");
        localStorage.removeItem("user");
    }

    public static hasRole(role: string): boolean {
        let saved = localStorage.getItem("role");
        if (saved === null) return false;
        return LocalStorageUtility.mapRole(role) <= LocalStorageUtility.mapRole(saved);
    }

    public static getUsername(): string {
        let user = JSON.parse(localStorage.getItem("user")) as UserTable;
        if (user === null) return "dummy";
        return user.Username;
    }

    public static getUserId(): number {
        let user = JSON.parse(localStorage.getItem("user")) as UserTable;
        if (user === null) return 0;
        return user.Id;
    }

    private static mapRole(role: string): number {
        switch (role) {
            case "u": return 1;
            case "m": return 2;
            case "a": return 3;
        }
    }
}

export default LocalStorageUtility
