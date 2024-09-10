import LinkButton from '@/components/landing/LinkButton';

function CaseStudyLink({ href }: { href?: string }) {
  if (!href) return;

  return (
    <LinkButton type="primary" href={href}>
      Case study
    </LinkButton>
  );
}

export default CaseStudyLink;
