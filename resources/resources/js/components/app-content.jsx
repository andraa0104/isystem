import { Spinner } from '@/components/ui/spinner';
import { SidebarInset } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import * as React from 'react';

export function AppContent({
    variant = 'header',
    children,
    className,
    ...props
}) {
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        let loadingTimer = null;

        const removeStart = router.on('start', (event) => {
            if (event.detail.visit?.prefetch) {
                return;
            }
            loadingTimer = setTimeout(() => {
                setIsLoading(true);
            }, 200);
        });
        const removeFinish = router.on('finish', (event) => {
            if (event.detail.visit?.prefetch) {
                return;
            }
            if (loadingTimer) {
                clearTimeout(loadingTimer);
                loadingTimer = null;
            }
            setIsLoading(false);
        });

        return () => {
            if (loadingTimer) {
                clearTimeout(loadingTimer);
            }
            removeStart();
            removeFinish();
        };
    }, []);

    const loadingOverlay = isLoading ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 bg-background/60 text-muted-foreground backdrop-blur-sm">
            <Spinner className="size-6" />
            <span className="text-sm font-medium">Loading...</span>
        </div>
    ) : null;

    if (variant === 'sidebar') {
        return (
            <SidebarInset {...props} className={cn('relative', className)}>
                {children}
                {loadingOverlay}
            </SidebarInset>
        );
    }

    return (
        <main
            className={cn(
                'relative mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl',
                className
            )}
            {...props}
        >
            {children}
            {loadingOverlay}
        </main>
    );
}
