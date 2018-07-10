class LocalStorageUtility {
    public static logIn(role: string): void {
        localStorage.setItem("role", role);
    }

    public static logOut(): void {
        localStorage.removeItem("role");
    }

    public static hasRole(role: string): boolean {
        let saved = localStorage.getItem("role");
        if (saved === null) return false;
        return LocalStorageUtility.mapRole(role) <= LocalStorageUtility.mapRole(saved);
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
