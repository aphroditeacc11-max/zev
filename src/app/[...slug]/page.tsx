import { CMSPage, cmsApi } from '@cms-builder/core';

const PROJECT = process.env.NEXT_PUBLIC_PROJECT_NAME || 'default';

export default async function Page({ params }: { params: { slug?: string[] } }) {
  const route = '/' + (params.slug?.join('/') || '');
  
  const [design, instances] = await Promise.all([
    cmsApi.getSiteContent(PROJECT).catch(() => null),
    cmsApi.getPageComponents(PROJECT, route).catch(() => []),
  ]);
  
  if (!design) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-xl text-center">
          <h1 className="text-2xl font-semibold">CMS data unavailable</h1>
          <p className="mt-3 text-gray-600">
            The project exists, but design data could not be loaded yet. Check API connectivity and project naming configuration.
          </p>
        </div>
      </main>
    );
  }
  
  return (
    <CMSPage 
      design={design}
      route={route}
      componentInstances={instances}
    />
  );
}
