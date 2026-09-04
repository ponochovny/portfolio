import { defineQuery } from "groq";

export const useProfile = async () => {
  const profileQuery = defineQuery(`*[_type == "profile"][0] {
    ...,
    "resumeUrl": resumeUrl.asset->url,
    stackGroups[] {
      title,
      items[]-> {
        title,
        "iconUrl": icon.asset->url
      }
    }
  }`);

  const { data, pending, error } = await useSanityQuery<ProfileQueryResult>(
    profileQuery,
    {},
    { key: "profile" },
  );

  return { data, pending, error };
};

export const useExperience = async () => {
  const experienceQuery = defineQuery(`*[_type == "experience"] {
    ...,
    stack[]-> {
      title,
      "iconUrl": icon.asset->url
    }
  }`);

  const { data, pending, error } = await useSanityQuery<ExperienceQueryResult>(
    experienceQuery,
    {},
    { key: "experience" },
  );

  return { data, pending, error };
};

export const useProjects = async () => {
  const projectsQuery = defineQuery(`*[_type == "project"] | order(year desc) {
      ...,
      "coverUrl": cover.asset->url,
      tech[]-> {
        title,
        "iconUrl": icon.asset->url
      },
      "slug": slug.current
    }`);

  const { data, pending, error } = await useSanityQuery<ProjectsQueryResult>(
    projectsQuery,
    {},
    { key: "projects" },
  );

  return { data, pending, error };
};

export const useProject = async (slug: string) => {
  const projectQuery =
    defineQuery(`*[_type == "project" && slug.current == $slug][0] {
    ...,
    "coverUrl": cover.asset->url,
    tech[]-> {
      title,
      "iconUrl": icon.asset->url
    },
      "slug": slug.current
  }`);

  const { data, pending, error } = await useSanityQuery<ProjectQueryResult>(
    projectQuery,
    { slug },
    { key: `project-${slug}` },
  );

  return { data, pending, error };
};
