import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/login';
import { Form, Head } from '@inertiajs/react';
const databaseLabels = {
    dbsja: 'DB SJA',
    dbbbbs: 'DB BBBS',
    dbstg: 'DB STG',
    dbati: 'DB ATI',
    dbarm: 'DB ARM',
};
export default function Login({ status, databases = [], selectedDatabase, }) {
    const defaultDatabase = databases.includes(selectedDatabase)
        ? selectedDatabase
        : '';
    return (<AuthLayout title="Log in to your account" description="Enter your username and password below to log in">
            <Head title="Log in"/>

            <Form {...store.form()} resetOnSuccess={['password']} className="flex flex-col gap-6">
                {({ processing, errors }) => (<>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="database">Database</Label>
                                <select id="database" name="database" required defaultValue={defaultDatabase} className="border-input data-[placeholder]:text-muted-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base text-foreground shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-background">
                                    <option value="" disabled>
                                        Select database
                                    </option>
                                    {databases.map((db) => (<option key={db} value={db}>
                                            {databaseLabels[db] || db}
                                        </option>))}
                                </select>
                                <InputError message={errors.database}/>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" type="text" name="username" required autoFocus tabIndex={1} autoComplete="username" placeholder="Username"/>
                                <InputError message={errors.username}/>
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" name="password" required tabIndex={2} autoComplete="current-password" placeholder="Password"/>
                                <InputError message={errors.password}/>
                            </div>

                            {/* <div className="flex items-center space-x-3">
                                <Checkbox id="remember" name="remember" tabIndex={3}/>
                                <Label htmlFor="remember">Remember me</Label>
                            </div> */}

                            <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing} data-test="login-button">
                                {processing && <Spinner />}
                                Log in
                            </Button>
                        </div>

                    </>)}
            </Form>

            {status && (<div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>)}
        </AuthLayout>);
}
