import { SignOut } from '@/components/navigation/NavigationSignOut';

export default async function Home() {
    return (
        <main className="flex max-h-screen flex-col">
            <div className="flex flex-col items-center justify-center gap-12">
                <span>Main Page</span>
                <SignOut />
            </div>
        </main>
    );
}
