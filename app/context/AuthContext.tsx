interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null};
  onRegister?: (email: string, password: string) => Promise<any>;
}