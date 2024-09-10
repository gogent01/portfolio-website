import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { loadProject } from '@/helpers';
import { COMPONENT_MAP } from '@/helpers/components';
import ProjectHero from '../../../components/landing/ProjectHero';
import GridContainer from '../../../components/landing/GridContainer';
import classNames from 'classnames';

export async function generateMetadata({
  params,
}: {
  params: { projectSlug: string };
}): Promise<{
  title: string;
  description: string;
}> {
  const project = await loadProject(params.projectSlug).catch(() => {});

  if (!project) return notFound();

  return {
    title: project.data.title,
    description: project.data.description,
  };
}

export default async function Project({
  params,
}: {
  params: { projectSlug: string };
}) {
  const project = await loadProject(params.projectSlug).catch(() => {});

  if (!project) return notFound();

  return (
    <article>
      <GridContainer className="py-16">
        <ProjectHero
          title={project.data.title}
          description={project.data.description}
          className={classNames('col-start-1 col-span-full')}
        />
        <div className={classNames('col-start-1 col-span-full')}>
          <MDXRemote source={project.content} components={COMPONENT_MAP} />
        </div>
      </GridContainer>
    </article>
  );
}
