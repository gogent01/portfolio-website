import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { Project } from '@/types';

export const loadProject = React.cache(async function loadBlogPost(
  slug: string
): Promise<{ data: Project; content: string } | never> {
  const rawContent = await fs
    .readFile(path.join(process.cwd(), `/content/projects/${slug}.mdx`), 'utf8')
    .catch(() => {
      throw new Error('content_not_found');
    });

  const { data, content } = matter(rawContent) as unknown as {
    data: Project;
    content: string;
  };

  return { data, content };
});
