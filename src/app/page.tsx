import { cmsApi } from '@cms-builder/core';
import { BlockPreview } from '@/components/BlockPreview';

const PROJECT = process.env.NEXT_PUBLIC_PROJECT_NAME || process.env.PROJECT_NAME || 'zev';

export default async function Page() {
  const route = "/";
  const [design, all] = await Promise.all([
    cmsApi.getSiteContent(PROJECT).catch(() => null),
    cmsApi.getPageComponents(PROJECT, route).catch(() => []),
  ]);

  if (!design) return null;

  // Reconstruct tree: children with slot='free' go into parent's props._elements
  const parents = all.filter((c: any) => !c.parentId);
  const children = all.filter((c: any) => c.parentId && c.slot === 'free');
  
  const reconstructed = parents.map((p: any) => {
    const myChildren = children
      .filter((c: any) => c.parentId === p.instanceId)
      .sort((a: any, b: any) => a.order - b.order)
      .map((c: any) => ({
        id: c.instanceId,
        type: c.componentType.replace(/^free_/, ''),
        ...c.props
      }));
      
    return {
      ...p,
      props: {
        ...p.props,
        _elements: (p.props?._elements && p.props._elements.length > 0) ? p.props._elements : myChildren
      }
    };
  });

  const sorted = reconstructed.sort((a: any, b: any) => a.order - b.order);

  return (
    <main>
      {sorted.map((block: any) => (
        <BlockPreview key={block.instanceId} block={block} />
      ))}
    </main>
  );
}