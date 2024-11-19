import React from "react";
import { useRouter } from "next/router";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import "../builder-registry";
import Header from "@/components/navigation/header";
import Footer from "@/components/navigation/footer";
import { GetStaticProps, GetStaticPaths } from 'next';

const apiKey = process.env.NEXT_PUBLIC_BUILDER_API_KEY;
if (apiKey) {
  builder.init(apiKey);
} else {
  console.error("Builder API key is not defined");
}

interface PageProps {
  page: any;
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const page = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + (Array.isArray(params?.page) ? params.page.join("/") : params?.page || ""),
      },
    })
    .toPromise();

  return {
    props: {
      page: page || null,
    },
    revalidate: 5,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await builder.getAll("page", {
    fields: "data.url",
    options: { noTargeting: true },
  });

  return {
    paths: pages
      .map((page) => String(page.data?.url))
      .filter((url) => url !== "/"),
    fallback: "blocking",
  };
};

const Page: React.FC<PageProps> = ({ page }) => {
  const router = useRouter();
  const isPreviewing = useIsPreviewing();

  if (!page && !isPreviewing) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{page?.data?.title}</title>
      </Head>
      <Header />
      <div className="container mx-auto px-4">
        <BuilderComponent model="page" content={page || undefined} />
      </div>
      <Footer />
    </>
  );
};

export default Page;
