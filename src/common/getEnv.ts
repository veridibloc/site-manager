export function getEnv(name: string): string {
    if(!process.env[name]){
        console.warn(`Missing environment variable ${name}`);
    }
    return process.env[name] as string;
}
