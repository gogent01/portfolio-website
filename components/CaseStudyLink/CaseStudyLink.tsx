import * as React from 'react';
import LinkButton from '@/components/LinkButton';

function CaseStudyLink({ href }: { href?: string }) {
  if (!href) return;

  return (
    <LinkButton type="primary" href={href} target="_blank">
      Case study
    </LinkButton>
  );
}

export default CaseStudyLink;
