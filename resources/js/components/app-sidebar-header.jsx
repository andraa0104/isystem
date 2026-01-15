import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePage } from '@inertiajs/react';
export function AppSidebarHeader({ breadcrumbs = [], }) {
    const page = usePage();
    const { auth, tenant } = page.props;
    const rawDatabaseLabel = tenant?.label || tenant?.database || '-';
    const databaseLabel = rawDatabaseLabel.toString().replace(/^db\s*/i, '');
    const lastOnline = auth?.user?.last_online || '-';
    return (<header className="flex h-16 shrink-0 items-center border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex w-full items-center gap-2">
                <SidebarTrigger className="-ml-1"/>
                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <Breadcrumbs breadcrumbs={breadcrumbs}/>
                </div>
                <span className="hidden whitespace-nowrap rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground md:inline">
                    {`DB: ${databaseLabel} • Last: ${lastOnline}`}
                </span>
            </div>
        </header>);
}
